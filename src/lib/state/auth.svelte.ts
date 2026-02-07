import { browser } from '$app/environment';
import type { Authentication } from '$lib/types/auth.type';
import { jwtDecode } from 'jwt-decode';

let authData = $state<Authentication | null>(
	browser && window.sessionStorage.getItem('AUTH')
		? JSON.parse(window.sessionStorage.getItem('AUTH')!)
		: null
);

const user = $derived(
	authData ? { ...jwtDecode(authData.access_token), ...authData } : null
);

const userInitials = $derived(
	`${user?.profile?.firstName?.[0] ?? ''}${user?.profile?.lastName?.[0] ?? ''}`
);

function setAuth(newAuth: Authentication | null) {
	if (authData) authData = { ...authData, ...newAuth };
	else authData = null;

	if (browser) {
		if (newAuth) {
			window.sessionStorage.setItem('AUTH', JSON.stringify(newAuth));
		} else {
			window.sessionStorage.removeItem('AUTH');
		}
	}
}

export const authStore = {
	get user() {
		return user?.profile;
	},
	get accessToken() {
		return authData?.access_token;
	},
	get userInitials() {
		return userInitials;
	},
	setAuth,
};
