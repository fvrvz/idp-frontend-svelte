<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import Sidebar from '$lib/components/common/sidebar/Sidebar.svelte';
	import '../../app.css';

	let { children } = $props();

	let isSidebarOpen = $state<boolean>(false);
</script>

<main class="mx-auto max-w-7xl">
	<Header toggleSidebar={(isOpen) => (isSidebarOpen = isOpen)} />
	<Sidebar isOpen={isSidebarOpen} />
	{@render children()}
</main>
