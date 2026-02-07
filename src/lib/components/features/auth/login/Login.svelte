<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { loginSchema } from '$lib/schemas/auth.schema';
	import { authService } from '$lib/services/auth.service';
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
				await authService.login(form.data);
			},
			onUpdated: () => {
				goto(resolve('/'));
			},
		}
	);

	const { form, tainted, enhance, formId, submitting } = superform;
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
			bind:value={$form.userId}
			type="text"
			required
			id="username"
			placeholder="Enter username or email"
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
		<A class="text-sm sm:text-base" href={resolve('/register')}
			>Create an account</A
		>
		<Button
			type="submit"
			form={$formId}
			class="w-full cursor-pointer sm:w-auto"
			loading={$submitting}
		>
			Login
		</Button>
	</div>
</form>
