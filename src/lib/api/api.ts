import { authService } from '$lib/services/auth.service';
import { authStore } from '$lib/state/auth.svelte';
import axios, { AxiosError } from 'axios';

const API_PREFIX = '/api/v1';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		if (authStore.accessToken) {
			config.headers.Authorization = `Bearer ${authStore.accessToken}`;
		}

		if (config.url) {
			const cleanUrl = config.url.startsWith('/')
				? config.url
				: `/${config.url}`;
			config.url = `${API_PREFIX}${cleanUrl}`;
		}

		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const status = error.response?.status;
		if (status === 401) {
			await authService.logout();
			return Promise.reject(error);
		}
	}
);

export default api;
