<script lang="ts">    
    import Header from '$lib/components/Header.svelte';
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
