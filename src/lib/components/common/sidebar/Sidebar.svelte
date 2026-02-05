<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	let isOpen = $state(false);
</script>

<aside
	class="absolute z-1 h-[90dvh] rounded-br-3xl bg-gray-800 text-gray-50 transition-all max-sm:shadow-lg sm:relative dark:bg-gray-400 dark:text-gray-800 {isOpen
		? 'w-full sm:w-72'
		: 'w-0 sm:w-[4rem]'}"
>
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="absolute top-5 left-full -translate-x-1/2 cursor-pointer rounded-full bg-white p-1 shadow-md transition-all hover:bg-gray-50 sm:top-10 dark:bg-blue-300"
	>
		<ChevronRight class="size-4 text-gray-800 {isOpen && 'rotate-180'}" />
	</button>
	<nav>
		<h1
			class="mt-2 text-center font-bold transition-all select-none {isOpen
				? 'text-3xl'
				: 'text-xl'}"
		>
			IDP
		</h1>
	</nav>
</aside>
