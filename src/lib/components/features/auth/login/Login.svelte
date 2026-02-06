<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Auth } from '$lib/resources/auth';
	import { loginSchema } from '$lib/schemas/auth';
	import { authStore } from '$lib/state/auth.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
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

<div class="m-auto max-w-4xl">
	<h1 class="mb-10 text-4xl font-extrabold text-gray-900 dark:text-white">
		Login
	</h1>
	<form use:enhance class="flex flex-col flex-wrap bg-gray-50" id={$formId}>
		<section class=" flex items-stretch max-sm:flex-col">
			<article
				class="flex flex-1/2 items-center justify-center bg-blue-900"
			></article>

			<div
				class="flex flex-1/2 flex-col items-center justify-around gap-5 p-5 pl-0"
			>
				<div class="shrink grow">
					<Label for="username">Username</Label>
					<Input
						type="text"
						bind:value={$form.userId}
						id="username"
						placeholder="Enter username or email"
						required
					/>
				</div>
				<div class="shrink grow">
					<Label for="password">Password</Label>
					<Input
						type="password"
						bind:value={$form.password}
						id="password"
						placeholder="Enter password"
						required
					/>
				</div>

				<div class="flex w-full items-center justify-center gap-4">
					<Button type="submit" form={$formId}>Login</Button>
				</div>
			</div>
		</section>
	</form>
</div>
