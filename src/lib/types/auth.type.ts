import type { loginSchema, registerSchema } from '$lib/schemas/auth';
import type z from 'zod';
import type { BaseModel } from './common..type';

export interface Authentication {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

export type Login = z.infer<typeof loginSchema>;

export type User = z.infer<typeof registerSchema> & BaseModel;
