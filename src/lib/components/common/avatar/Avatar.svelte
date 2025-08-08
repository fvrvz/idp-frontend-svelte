<script lang="ts">
	import type { AvatarProps } from '$lib/types/avatar.type';

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
		<div class="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
			<svg
				class="absolute -left-1 h-12 w-12 text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
					clip-rule="evenodd"
				></path></svg
			>
		</div>
	{/if}
</div>
