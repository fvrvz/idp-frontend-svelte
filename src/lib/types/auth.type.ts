import type { loginSchema } from '$lib/schemas/auth.schema';
import type z from 'zod';
import type { User } from './user.type';

export interface Authentication extends Persist {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	profile: User;
}

export interface Persist {
	timestamp?: string;
	refreshCount?: number;
}

export type Login = z.infer<typeof loginSchema>;
