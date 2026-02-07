<script lang="ts">
	import Table from '$lib/components/common/table/Table.svelte';
	import { Users } from '$lib/resources/users';
	import { authStore } from '$lib/state/auth.svelte';
	import type { User } from '$lib/types/auth.type';
	import type { TableHeader } from '$lib/types/table.type';
	import dayjs from 'dayjs';
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

	const headers: TableHeader<User>[] = [
		{ key: 'fullName', label: 'Name' },
		// { key: 'username', label: 'UserID' },
		{ key: 'email', label: 'Email' },
		{ key: 'DOB', label: 'Date of Birth' },
		{ key: 'createdAt', label: 'Created At' },
	];
</script>

<h1 class="text-4xl mb-4">Welcom {authStore.user?.fullName}</h1>

<Table canSelect data={users} {loading} {headers} trackBy="username" />
