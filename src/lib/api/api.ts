import { authStore } from '$lib/state/auth.svelte';
import axios from 'axios';

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
			const cleanUrl = config.url.startsWith('/') ? config.url : `/${config.url}`;
			config.url = `${API_PREFIX}${cleanUrl}`;
		}

		return config;
	},
	(error) => Promise.reject(error as Error)
);

export default api;
