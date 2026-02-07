import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { Auth } from '$lib/resources/auth';
import { authStore } from '$lib/state/auth.svelte';
import type { Authentication, Login } from '$lib/types/auth.type';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

const MAX_REFRESH = 20;

class AuthService {
	private refreshAt = 0;
	private refreshToken: string | null = null;
	private refreshTimer: ReturnType<typeof setTimeout> | null = null;
	private refreshCount = 0;
	private timestamp: Date | null = null;
	private isLoggingOut = false;

	constructor() {
		if (!browser) return;

		const raw = sessionStorage.getItem('AUTH');
		if (!raw) return;

		try {
			this.restoreSession(JSON.parse(raw));
		} catch (e) {
			console.error('Failed to restore auth session', e);
		}
	}

	async login(payload: Login) {
		const [err, response] = await Auth.login(payload);
		if (err) return;

		this.refreshCount = 0;
		this.refreshToken = response.refresh_token;
		this.timestamp = new Date();
		this.refreshAt = Math.floor(response.expires_in * 0.9);

		response.timestamp = this.timestamp.toISOString();
		response.refreshCount = this.refreshCount;

		authStore.setAuth(response);
		this.scheduleRefresh();
	}

	async logout(skip = false) {
		if (this.isLoggingOut) return;
		this.isLoggingOut = true;

		this.clearRefreshTimer();
		this.refreshCount = 0;
		this.refreshToken = null;
		this.timestamp = null;
		this.refreshAt = 0;

		if (!skip) {
			const [err] = await Auth.logout();
			authStore.setAuth(null);

			if (err) {
				console.error('Logout failed:', err);
			}
		}

		if (skip) authStore.setAuth(null);

		goto(resolve('/login'));
		this.isLoggingOut = false;
	}

	async refresh() {
		if (!this.refreshToken) {
			throw new AxiosError('Refresh token not available');
		}

		const [err, response] = await Auth.refresh(this.refreshToken);
		if (err) throw err;

		this.refreshToken = response.refresh_token;
		this.timestamp = new Date();

		response.timestamp = this.timestamp.toISOString();
		response.refreshCount = this.refreshCount;

		authStore.setAuth(response);
	}

	private scheduleRefresh(delaySeconds = this.refreshAt) {
		this.clearRefreshTimer();

		if (this.refreshCount >= MAX_REFRESH) {
			this.logout();
			return;
		}

		this.refreshTimer = setTimeout(async () => {
			try {
				await this.refresh();
				this.refreshCount++;
				this.scheduleRefresh();
			} catch {
				this.logout();
			}
		}, delaySeconds * 1000);
	}

	private clearRefreshTimer() {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
			this.refreshTimer = null;
		}
	}

	private restoreSession(auth: Authentication) {
		this.refreshToken = auth.refresh_token;
		this.refreshCount = auth.refreshCount ?? 0;
		this.timestamp = new Date(auth.timestamp!);
		this.refreshAt = Math.floor(auth.expires_in * 0.9);

		const elapsed = dayjs().diff(dayjs(this.timestamp), 'second');
		const remaining = Math.max(0, this.refreshAt - elapsed);

		this.scheduleRefresh(remaining);
	}
}

export const authService = new AuthService();
