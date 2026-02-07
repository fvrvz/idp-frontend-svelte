import api from '$lib/api/api';
import { promiseWrapper, type Result } from '$lib/api/promise-wrapper';
import type { ListModel } from '$lib/types/common..type';
import type {
	User,
	UserRequest,
	UserUpdateRequest,
} from '$lib/types/user.type';

export class Users {
	static register(body: UserRequest) {
		return promiseWrapper(
			api.post('/users/register', body, { withCredentials: false })
		);
	}

	static async getList(): Promise<Result<User[]>> {
		const [err, res] = await promiseWrapper<ListModel<User>>(api.get('/users'));
		if (err) return [err, null];
		return [null, res.data];
	}

	static async get(username: string) {
		return promiseWrapper<User>(api.get(`/users/${username}`));
	}

	static async delete(username: string) {
		return promiseWrapper<void>(api.delete(`/users/${username}`));
	}

	static async update(username: string, body: UserUpdateRequest) {
		return promiseWrapper<User>(api.patch(`/users/${username}`, body));
	}
}
