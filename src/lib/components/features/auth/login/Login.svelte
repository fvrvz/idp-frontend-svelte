<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/common/button/Button.svelte';
	import Input from '$lib/components/common/input/Input.svelte';
	import { authStore } from '$lib/state/auth.svelte';
	import type { LoginResponse } from '$lib/types/auth.type';

	const formData = $state({
		userId: '',
		password: ''
	});

	let error: string = '';
	let success: boolean = false;
	let isLoading = $state(false);

	async function submit(evt: SubmitEvent) {
		evt.preventDefault();

		if (hasUnsavedChanges) {
			return;
		}

		error = '';
		success = false;
		isLoading = true;

		try {
			const response = await fetch('http://localhost:8080/api/v1/auth/login', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (!response.ok) throw new Error(await response.text());

			const json: LoginResponse = await response.json();

			authStore.setAuth(json);

			goto(resolve('/'));
		} catch (e) {
			error = (e as Error).message;
		} finally {
			isLoading = false;
		}
	}

	const hasUnsavedChanges = $derived(Object.values(formData).some((e) => !e));
</script>

<div class="m-auto max-w-4xl">
	<h1 class="mb-10 text-4xl font-extrabold text-gray-900">Login</h1>
	<form onsubmit={submit} class="flex flex-col flex-wrap bg-gray-50">
		<section class=" flex items-stretch">
			<article class="flex flex-1/2 items-center justify-center bg-blue-900"></article>

			<div class="flex flex-1/2 flex-col items-center justify-around gap-5 p-5 pl-0">
				<Input
					label="Username"
					type="text"
					name="username"
					id="username"
					bind:value={formData.userId}
					required
					class="shrink grow"
				/>
				<Input
					label="Password"
					type="password"
					name="password"
					id="password"
					bind:value={formData.password}
					required
					class="shrink grow"
				/>
				<div class="flex w-full items-center justify-center gap-4">
					<Button type="submit">Login</Button>
				</div>
			</div>
		</section>
	</form>
</div>
