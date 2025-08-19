<script lang="ts">
	interface Props {
		isOpen: boolean;
	}
	let { isOpen = false }: Props = $props();
</script>

<aside class={'h-[90dvh] bg-amber-50 ' + isOpen ? 'w-1/5' : ''}></aside>
