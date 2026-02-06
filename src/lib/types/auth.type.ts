import type { loginSchema } from '$lib/schemas/auth';
import type z from 'zod';

export interface Authentication {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

export type Login = z.infer<typeof loginSchema>;
