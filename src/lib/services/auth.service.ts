import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { Auth } from '$lib/resources/auth';
import { authStore } from '$lib/state/auth.svelte';
import type { Login } from '$lib/types/auth.type';
import { AxiosError } from 'axios';

const MAX_REFRESH = 20;

class AuthService {
	private refreshAt = 0;
	private refreshToken: string | null = null;
	private refreshTimer: ReturnType<typeof setTimeout> | null = null;
	private refreshCount = 0;

	async login(payload: Login) {
		const [err, response] = await Auth.login(payload);

		if (err) {
			console.error('Login failed', err);
			return;
		}

		this.refreshAt = response.expires_in * 0.9;
		this.refreshToken = response.refresh_token;
		authStore.setAuth(response);
		this.scheduleRefresh();
	}

	async logout() {
		this.clearRefreshTimer();
		this.refreshCount = 0;
		this.refreshToken = null;

		const [err] = await Auth.logout();

		if (err) {
			console.error('Logout failed:', err);
		}

		authStore.setAuth(null);
		goto(resolve('/login'));
	}

	async refresh() {
		if (!this.refreshToken) {
			throw new AxiosError('Refresh token not available');
		}

		const [err, response] = await Auth.refresh(this.refreshToken);

		if (err) {
			authStore.setAuth(null);
			console.error('Refresh Failed', err);
			return;
		}

		this.refreshToken = response.refresh_token;
		authStore.setAuth(response);
	}

	private scheduleRefresh() {
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
		}, this.refreshAt * 1000);
	}

	private clearRefreshTimer() {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
			this.refreshTimer = null;
		}
	}
}

export const authService = new AuthService();
