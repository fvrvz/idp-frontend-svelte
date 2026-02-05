<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { type Pathname } from '$app/types';
	import { authStore } from '$lib/state/auth.svelte';
	import type { ClassValue } from 'svelte/elements';
	import ThemeSwitch from '../theme-switch/ThemeSwitch.svelte';
	import UserControls from '../user-controls/UserControls.svelte';

	interface Props {
		class: ClassValue;
	}

	interface Destination {
		title: string;
		link: Pathname;
	}

	let { class: className }: Props = $props();

	let destination = $derived<Destination>(
		page.url.pathname.includes('/login')
			? { title: 'Create an account', link: '/register' }
			: { title: 'Signin', link: '/login' }
	);
</script>

<header class="flex items-center justify-between px-4 py-2 {className}">
	<section class="ml-auto flex items-center gap-3">
		{#if authStore.accessToken}
			<UserControls />
		{:else}
			<a
				href={resolve(destination.link)}
				class="rounded-lg px-4 pt-1.5 pb-2 text-gray-800 transition-all hover:bg-amber-300 dark:text-white dark:hover:text-gray-800"
			>
				{destination.title}
			</a>
		{/if}
		<ThemeSwitch />
	</section>
</header>
