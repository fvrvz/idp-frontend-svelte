import z from 'zod/v4';

export const loginSchema = z.object({
	userId: z.string(),
	password: z.string(),
});
