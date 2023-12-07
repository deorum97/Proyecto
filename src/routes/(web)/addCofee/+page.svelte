<script lang="ts">
    import FormularioAñadir from "./(components)/FormularioAñadir.svelte";

    let title ="Añadir cafe"
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Cafeteria J-Cofee" />
</svelte:head>

<div class="parent">
    <FormularioAñadir />
</div>

<style lang="scss">
    .parent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		grid-row-gap: 3cqw;
		padding: 3cqw 1cqw;
		background-color: white;
	}
</style>