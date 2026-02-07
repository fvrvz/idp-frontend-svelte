import api from '$lib/api/api';
import { promiseWrapper } from '$lib/api/promise-wrapper';
import { type Authentication, type Login } from '$lib/types/auth.type';

export class Auth {
	static login(body: Login) {
		return promiseWrapper<Authentication>(
			api.post('/auth/login', body, { withCredentials: false })
		);
	}

	static logout() {
		return promiseWrapper<void>(api.get('/auth/logout'));
	}

	static refresh(token: string) {
		return promiseWrapper<Authentication>(
			api.post('/auth/refresh', { refresh_token: token } satisfies Pick<
				Authentication,
				'refresh_token'
			>)
		);
	}
}
