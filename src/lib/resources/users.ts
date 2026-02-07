import api from '$lib/api/api';
import { promiseWrapper, type Result } from '$lib/api/promise-wrapper';
import type { User } from '$lib/types/auth.type';
import type { ListModel } from '$lib/types/common..type';

export class Users {
	static register(body: User) {
		return promiseWrapper(
			api.post('/users/register', body, { withCredentials: false })
		);
	}

	static async get(): Promise<Result<User[]>> {
		const [err, res] = await promiseWrapper<ListModel<User>>(api.get('/users'));
		if (err) return [err, null];
		return [null, res.data];
	}
}
