import api from '$lib/api/api';
import { promiseWrapper } from '$lib/api/promise-wrapper';
import type { User } from '$lib/types/auth.type';

export class Users {
	static register(body: User) {
		return promiseWrapper(
			api.post('/users/register', body, { withCredentials: false })
		);
	}
}
