<script lang="ts">
	import "$lib/styles/style.scss";

    import Formulario from "./(components)/formulario.svelte";

	let title ="J-Cofee";

	
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Cafeteria J-Cofee" />
</svelte:head>

<div class="parent">
    <Formulario />
</div>

<style lang="scss">
	:global(:root) {
		--top-nav-height: 4rem;
	}
	
	.parent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		grid-row-gap: 3cqw;
		padding: 3cqw 1cqw;
		background-color: white;
	}
</style>
