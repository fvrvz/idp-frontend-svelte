<script lang="ts">
	import type { AvatarProps } from '$lib/types/avatar.type';
	import { User } from 'lucide-svelte';

	const { initials, image }: AvatarProps = $props();
</script>

<div
	class="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 select-none dark:bg-gray-600"
>
	{#if image}
		<img
			id="avatarButton"
			data-dropdown-toggle="userDropdown"
			data-dropdown-placement="bottom-start"
			class="h-10 w-10 cursor-pointer rounded-full"
			src={image}
			alt="User dropdown"
		/>
	{:else if initials}
		<span class="font-medium text-gray-600 uppercase dark:text-gray-300"
			>{initials.length > 2 ? initials?.substring(0, 2) : initials}</span
		>
	{:else}
		<div
			class="relative size-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
		>
			<User class="absolute -left-1 size-12 text-gray-400" />
		</div>
	{/if}
</div>
