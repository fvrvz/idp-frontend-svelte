import { resolve } from '$app/paths';
import { authStore } from '$lib/state/auth.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
	if (!authStore.accessToken) {
		throw redirect(302, resolve('/login'));
	}
};
