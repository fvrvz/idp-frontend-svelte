<script lang="ts">
	import { page } from '$app/state';
	import { authStore } from '$lib/state/auth.svelte';
	import ThemeSwitch from '../theme-switch/ThemeSwitch.svelte';
	import UserControls from '../user-controls/UserControls.svelte';

	let destination = $derived(
		page.url.pathname.includes('/login')
			? { title: 'Create an account', link: '/register' }
			: { title: 'Signin', link: '/login' }
	);
</script>

<header class="flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-50">
	<section class="flex items-center gap-3">
		<span class="icon-[mdi-light--menu] text-2xl"></span>
		<h1 class="text-3xl font-bold select-none">IDP</h1>
	</section>

	<section class="flex items-center gap-3">
		{#if authStore.accessToken}
			<UserControls />
		{:else}
			<a href={destination.link}>{destination.title}</a>
		{/if}
		<ThemeSwitch />
	</section>
</header>
