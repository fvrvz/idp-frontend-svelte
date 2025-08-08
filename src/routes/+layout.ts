import { browser } from '$app/environment';
import { authStore } from '$lib/state/auth.svelte.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

const PUBLIC_ROUTES = ['/login', '/register'];

export const load: LayoutLoad = async ({ url }) => {
	const path = url.pathname;

	const isPublic = PUBLIC_ROUTES.includes(path);

	if (!isPublic && !authStore.accessToken && browser) {
		throw redirect(302, '/login');
	}

	return {};
};
