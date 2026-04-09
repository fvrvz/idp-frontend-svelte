<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import Sidebar from '$lib/components/common/sidebar/Sidebar.svelte';

	let { children } = $props();
</script>

<div
	class="mx-auto grid h-dvh max-w-450 grid-cols-[auto_1fr] grid-rows-[4rem_1fr] overflow-hidden dark:bg-gray-800 dark:text-gray-100"
>
	<Sidebar />
	<Header class="col-start-2" />
	<main
		class="col-start-2 overflow-auto bg-gray-50 pt-4 pr-4 pl-6 dark:bg-gray-900"
	>
		{@render children()}
	</main>
</div>
