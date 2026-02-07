<script lang="ts">
	import Table from '$lib/components/common/table/Table.svelte';
	import { Users } from '$lib/resources/users';
	import { authStore } from '$lib/state/auth.svelte';
	import type { TableHeader } from '$lib/types/table.type';
	import type { User } from '$lib/types/user.type';
	import dayjs from 'dayjs';
	import { Button, TableBodyCell } from 'flowbite-svelte';
	import { PenLine, Trash } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let loading = $state(true);
	let users = $state<User[]>([]);

	onMount(async () => {
		const [err, data] = await Users.getList();
		if (!err) {
			users = data;
		}
		loading = false;
	});

	const headers: TableHeader<User>[] = [
		{ key: 'fullName', label: 'Name' },
		{ key: 'username', label: 'UserID' },
		{ key: 'email', label: 'Email' },
		{ key: 'DOB', label: 'Date of Birth' },
		{ key: 'id', class: 'w-fit' },
	];
</script>

<h1 class="text-4xl mb-4">Welcome {authStore.user?.fullName}</h1>

<Table canSelect data={users} {loading} {headers} trackBy="id">
	{#snippet children({ row })}
		<TableBodyCell>{row.fullName}</TableBodyCell>
		<TableBodyCell>{row.username}</TableBodyCell>
		<TableBodyCell>{row.email}</TableBodyCell>
		<TableBodyCell>{dayjs(row.DOB).format('DD-MM-YYYY')}</TableBodyCell>
		<TableBodyCell class="w-fit space-x-2">
			<Button pill size="sm" outline class="cursor-pointer">
				<PenLine class="size-4" />
			</Button>
			<Button pill size="sm" outline class="cursor-pointer" color="red">
				<Trash class="size-4" />
			</Button>
		</TableBodyCell>
	{/snippet}
</Table>
