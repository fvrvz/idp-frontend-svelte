import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import api from '$lib/api/api';
import type { LoginResponse } from '$lib/types/auth.type';
import { jwtDecode } from 'jwt-decode';

let authData = $state<LoginResponse | null>(
	browser && window.sessionStorage.getItem('AUTH')
		? JSON.parse(window.sessionStorage.getItem('AUTH')!)
		: null
);

const userProfile = { fullName: 'Full Name', email: 'user@email.com' };

const user = $derived(authData ? { ...jwtDecode(authData.access_token), ...userProfile } : null);

const userInitials = $derived(user?.sub?.substring(0, 2));

function setAuth(newAuth: LoginResponse | null) {
	authData = newAuth;
	if (browser) {
		if (newAuth) {
			window.sessionStorage.setItem('AUTH', JSON.stringify(newAuth));
		} else {
			window.sessionStorage.removeItem('AUTH');
		}
	}
}

async function logout() {
	try {
		await api.post('/auth/logout');
	} catch (e) {
		console.error('Logout failed:', e);
	} finally {
		setAuth(null);
		goto(resolve('/login'));
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
	logout
};
