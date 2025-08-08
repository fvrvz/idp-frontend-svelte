<script lang="ts">
	import { themeStore } from '$lib/state/theme.svelte';
	import { THEME } from '$lib/types/theme.type';
	import Switch from '../switch/Switch.svelte';

	const theme = themeStore();

	let checked = $derived(theme.currentTheme === THEME.DARK);

	function toggleTheme() {
		theme.currentTheme = checked ? THEME.DARK : THEME.LIGHT;
	}
</script>

<Switch bind:isChecked={checked} onChange={toggleTheme} />
