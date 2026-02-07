import type { userSchema } from '$lib/schemas/user.schema';
import type z from 'zod';
import type { BaseModel } from './common..type';

export type User = z.infer<typeof userSchema> &
	BaseModel & { fullName?: string };

export type UserRequest = Omit<User, keyof BaseModel | 'fullName'>;

export type UserUpdateRequest = Partial<
	Omit<UserRequest, 'password' | 'username'>
>;
