<script lang="ts">
	import Header from '$lib/components/common/header/Header.svelte';
	import '../../app.css';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<main class="mx-auto max-w-7xl">
	<Header />
	{@render children?.()}
</main>
