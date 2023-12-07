<script lang="ts">
	import "$lib/styles/style.scss";
	import Card from "$lib/components/Card.svelte"
	import FalloCafes from "$lib/components/FalloCafes.svelte";
	
	import { onMount } from "svelte";

	let title ="J-Cofee";

	let cafes: any =[];

	let falloCafes ="No hay cafes, vete hacia el strbucks"
	
	async function obtenerCafes() {
		let id= 5;
		let URL =`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/cafes/familia/${id}`
		try{
			const response = await fetch(URL);

			if(response.ok){
				const data = await response.json();
				cafes = data;
				console.log(cafes);
			} else {
				console.error("Error al obtener los cafes:", response.status);
			}
		}catch(error){
			console.error(error);
		}
	}

	onMount(obtenerCafes);
	
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Cafeteria J-Cofee" />
</svelte:head>


{#if cafes == false}
	<FalloCafes {falloCafes}/>
{:else}
	<div class="parent">

	{#each cafes as c, num}

		<Card cafe={c}/>
		
	{/each}
	
	</div>
{/if}

<style lang="scss">
	:global(:root) {
		--top-nav-height: 4rem;
	}

	.parent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		grid-row-gap: 3cqw;
		padding: 3cqw 1cqw;
		background-color: white;
	}
</style>
