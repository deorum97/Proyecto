<script lang="ts">
    import ListaCarrito from "./(components)/ListaCarrito.svelte";
</script>

<div class="main">
    <ListaCarrito />
</div>

<style lang="scss">
    .main{
        display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		grid-row-gap: 3cqw;
		padding: 3cqw 1cqw;
		background-color: white;
    }
</style>