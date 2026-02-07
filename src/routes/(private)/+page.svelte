<script lang="ts">
	import { Users } from '$lib/resources/users';
	import { authStore } from '$lib/state/auth.svelte';
	import type { User } from '$lib/types/auth.type';
	import dayjs from 'dayjs';
	import { Spinner, Table, type TableItemType } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let loading = $state(true);
	let users = $state<User[]>([]);

	onMount(async () => {
		const [err, data] = await Users.get();
		if (!err) {
			users = data.map((d) => ({
				...d,
				DOB: dayjs(d.DOB).format('DD-MM-YYYY'),
				createdAt: dayjs(d.createdAt).format('DD-MM-YYYY'),
			}));
		}
		loading = false;
	});
</script>

<h1 class="text-4xl mb-4">Welcom {authStore.user?.fullName}</h1>

{#if loading}
	<Spinner class="text-center" />
{:else if users.length}
	<Table items={users as unknown as TableItemType[]} striped hoverable />
{/if}
