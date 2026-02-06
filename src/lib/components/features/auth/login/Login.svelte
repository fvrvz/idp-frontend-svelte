<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Auth } from '$lib/resources/auth';
	import { loginSchema } from '$lib/schemas/auth';
	import { authStore } from '$lib/state/auth.svelte';
	import { A, Button, Input, Label } from 'flowbite-svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters';

	const superform = superForm(
		defaults({ userId: '', password: '' }, zod4(loginSchema)),
		{
			validators: zod4Client(loginSchema),
			SPA: true,
			onUpdate: async ({ form }) => {
				if (!form.valid || !$tainted) return;

				const [err, response] = await Auth.login(form.data);

				if (err) {
					throw new Error('Something went wrong', err);
				}

				authStore.setAuth(response);
			},
			onUpdated: () => {
				goto(resolve('/'));
			},
		}
	);

	const { form, tainted, enhance, formId } = superform;
</script>

<form
	use:enhance
	class="m-auto max-w-lg space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6"
	id={$formId}
>
	<h1 class="mb-5 text-4xl dark:text-white">Login</h1>
	<div class="space-y-2">
		<Label for="username">Username</Label>
		<Input
			type="text"
			bind:value={$form.userId}
			id="username"
			placeholder="Enter username or email"
			required
		/>
	</div>
	<div class="space-y-2">
		<Label for="password">Password</Label>
		<Input
			type="password"
			bind:value={$form.password}
			id="password"
			placeholder="Enter password"
			required
		/>
	</div>

	<div class="flex items-center justify-between gap-2 max-sm:flex-col">
		<A class="text-sm sm:text-base" href="/register">Create an account</A>
		<Button type="submit" form={$formId} class="w-full cursor-pointer sm:w-auto">
			Login
		</Button>
	</div>
</form>
