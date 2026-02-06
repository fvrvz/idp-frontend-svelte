import { authStore } from '$lib/state/auth.svelte';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
});

api.interceptors.request.use(
	(config) => {
		if (authStore.accessToken) {
			config.headers.Authorization = `Bearer ${authStore.accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error as Error)
);

export default api;
