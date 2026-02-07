import { browser } from '$app/environment';
import type { Authentication } from '$lib/types/auth.type';
import { jwtDecode } from 'jwt-decode';

let authData = $state<Authentication | null>(
	browser && window.sessionStorage.getItem('AUTH')
		? JSON.parse(window.sessionStorage.getItem('AUTH')!)
		: null
);

const userProfile = {
	firstName: 'Default',
	lastName: 'User',
	fullName: 'Default User',
	email: 'user@email.com',
};

const user = $derived(
	authData ? { ...jwtDecode(authData.access_token), ...userProfile } : null
);

const userInitials = $derived(`${user?.firstName?.[0]}${user?.lastName?.[0]}`);

function setAuth(newAuth: Authentication | null) {
	authData = newAuth;
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
		return user;
	},
	get accessToken() {
		return authData?.access_token;
	},
	get userInitials() {
		return userInitials;
	},
	setAuth,
};
