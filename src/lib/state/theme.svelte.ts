import { browser } from '$app/environment';
import { type ThemeValue, THEME } from '$lib/types/theme.type';

export function themeStore() {
	let theme: ThemeValue = $state(
		browser && window.localStorage.getItem('THEME')
			? (window.localStorage.getItem('THEME') as ThemeValue)
			: THEME.LIGHT
	);

	$effect(() => {
		if (browser) {
			window.localStorage.setItem('THEME', theme);
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	const toggleTheme = () => {
		theme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
	};

	return {
		get currentTheme() {
			return theme;
		},
		set currentTheme(newTheme: ThemeValue) {
			theme = newTheme;
		},
		toggleTheme,
	};
}
