<script lang="ts">
	import "$lib/styles/style.scss";
	import Card from "$lib/components/Card.svelte"
	import FalloCafes from "$lib/components/FalloCafes.svelte";
	
	import { onMount } from "svelte";

	let title ="J-Cofee";

	let cafes: any =[];

	/* cafes =[
		{nombre: "Capuchino expreso", precio: "7.20 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "Late", precio: "6 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "Americano", precio: "3 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "DECAF", precio: "250 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "DECAF", precio: "250 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "DECAF", precio: "250 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "DECAF", precio: "250 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
		{nombre: "DECAF", precio: "250 €", imagen: cafe, descripcion:"lorem ipsum grandium lorem"},
	] */
	
	let falloCafes ="No hay cafes, vete hacia el strbucks"

	//let cafes: any =[];
	
	async function obtenerCafes() {
		try{
			const response = await fetch("http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/cafes/all");

			if(response.ok){
				const data = await response.json();
				cafes = data;
				/* console.log(cafes); */
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

	{#each cafes as c}

		<Card cafe={c}/>
		
	{/each}
	
	</div>
{/if}

<style lang="scss">
	:global(:root) {
		--top-nav-height: 4rem;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
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
