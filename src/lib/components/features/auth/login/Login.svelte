<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/common/button/Button.svelte';
	import Input from '$lib/components/common/input/Input.svelte';
	import { Auth } from '$lib/resources/auth';
	import { loginSchema } from '$lib/schemas/auth';
	import { authStore } from '$lib/state/auth.svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters';

	let isLoading = $state(false);

	const superform = superForm(defaults(zod4(loginSchema)), {
		validators: zod4Client(loginSchema),
		SPA: true,
		resetForm: false,
		onUpdate: async ({ form }) => {
			if (!form.valid || !$tainted) return;

			isLoading = true;

			const [err, response] = await Auth.login(form.data);

			if (err) {
				isLoading = false;
				throw new Error('Something went wrong', err);
			}

			authStore.setAuth(response);
			goto(resolve('/'));
			isLoading = false;
		},
	});

	const { form, tainted, enhance } = superform;
</script>

<div class="m-auto max-w-4xl">
	<h1 class="mb-10 text-4xl font-extrabold text-gray-900 dark:text-white">
		Login
	</h1>
	<form use:enhance class="flex flex-col flex-wrap bg-gray-50">
		<section class=" flex items-stretch">
			<article
				class="flex flex-1/2 items-center justify-center bg-blue-900"
			></article>

			<div
				class="flex flex-1/2 flex-col items-center justify-around gap-5 p-5 pl-0"
			>
				<Input
					label="Username"
					type="text"
					name="username"
					id="username"
					bind:value={$form.userId}
					required
					class="shrink grow"
				/>
				<Input
					label="Password"
					type="password"
					name="password"
					id="password"
					bind:value={$form.password}
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
