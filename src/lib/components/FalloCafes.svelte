<script lang="ts">

    export let falloCafes: string;
    let imagenfallo:any = "https://m.media-amazon.com/images/I/61KW9KkK5IL._AC_UF894,1000_QL80_.jpg";
    //let falloCafes ="No hay cafes, vete hacia el strbucks"

</script>

<div class="falloCafes">
    <img class="imagen" src={imagenfallo} alt="cafecito">
    <p>{falloCafes}</p>
</div>

<style lang="scss">

    .imagen{
        width: 15cqw;
    }

    .falloCafes {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		flex-direction: column;
		align-content: space-around;
		align-items: center;
	}
</style>