<script lang="ts">
    import type { LayoutData } from './$types';
    
    import Header from '$lib/components/Header.svelte';
    export let data: LayoutData;
</script>

<Header />
<main>
	<slot />
</main>


<style>
	main {
		background-color: var(--background-color);
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 13cqw;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>
