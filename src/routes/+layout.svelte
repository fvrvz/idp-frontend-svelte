<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import Sidebar from '$lib/components/common/sidebar/Sidebar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div
	class="mx-auto grid max-w-450 grid-cols-[auto_1fr] grid-rows-[4rem_calc(100dvh-4rem)] dark:bg-gray-700 dark:text-amber-50"
>
	<Sidebar />
	<Header class="col-start-2" />
	<main class="col-start-2 bg-indigo-50 pt-4 pr-4 pl-6 dark:bg-indigo-950">
		{@render children()}
	</main>
</div>
