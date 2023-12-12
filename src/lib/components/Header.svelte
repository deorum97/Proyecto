<script lanf="ts">
	import taza from "$lib/images/svg/mug-hot.svg"
	import lupa from "$lib/images/svg/magnifying-glass.svg"
	import usuario from "$lib/images/svg/user.svg"
	import basquet from "$lib/images/svg/basket-shopping.svg"

	import { registrado, admin, usuarioS, listaCesta } from "$lib/stores/store";

	/* console.log($listaCesta.length)

	console.log($registrado) */
	
	let nombre ="J-Cofee"

	let log = "Loguearse"
	let sign = "Registrarse"

	let inicio ="Inicio"
	let cafe1 = "Cafe Frío"
	let cafe2 = "Expresso"
	let cafe3 = "Batidos"
	let cafe4 = "Básicos"

	let add = "Añadir cafe"
</script>

<header>
	<div class="container-hero">
		<div class="hero">

			<div class="container-logo">
				<i class="taza">
					<img src={taza} alt="imagen de taza caliente"/>
				</i>
				<h1 class="logo"><a href="/">{nombre}</a></h1>
			</div>

			{#if $registrado==0}
				<div class="container-user">
					<a href="/login">
					<i class="image side">
						<img src={usuario} alt="imagen de usuario"/>
					</i>
					<div class="content-shopping-cart">
						<span class="text">{log}</span>
						<span class="number">{sign}</span>
					</div>
					</a>
				</div>
			{:else}
				<div class="container-user">
					<a href="/perfil">
					<i class="image side">
						<img src={usuario} alt="imagen de usuario"/>
					</i>
					</a>
					<a href="/carrito">
						<i class="image">
							<img src={basquet}/>
						</i>
						<div class="content-shopping-cart">
							<span class="text">carrito</span>
							<span>({$listaCesta.length})</span>
						</div>
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div class="container-navbar">
		<nav class="navbar container">
			<ul class="menu">
				<li><a href="/">{inicio}</a></li>
				<li><a href="/cafeFrio">{cafe1}</a></li>
				<li><a href="/expresso">{cafe2}</a></li>
				<li><a href="/batidos">{cafe3}</a></li>
				<li><a href="/basics">{cafe4}</a></li>
			</ul>

			{#if $admin!=0}
				<div class="menu">
					<a href="/addCofee">{add}</a>
				</div>
			{/if}

			<!-- buscador de cafes descomentar si se integra -->
			<!-- <form class="search-form">
				<input type="search" placeholder="Buscar..." />
				<button class="btn-search">
					<i class="lupa">
						<img src={lupa} alt="imagen de lupa"/>
					</i>
				</button>
			</form> -->
		</nav>
	</div>
</header>

<style lang="scss">
	.container-hero {
		background-color: var(--background-color);
		padding: 0 13cqw;
	}

	.hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;		
	}

	.container-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		justify-content: center;

		i {
			font-size: 3rem;
		}

		a {
			text-decoration: none;
			color: #000;
			font-size: 3rem;
			text-transform: uppercase;
			letter-spacing: -1px;
		}

		.logo {
			font-style: italic;
			font-weight: 600;
		}

		.taza {
			width: 4cqw;
		}
	}

	.container-user {
		display: flex;
		gap: 1rem;
		cursor: pointer;

		a {
			display: flex;
			text-decoration: none;
			color: black
		}

		.image {
			font-size: 3rem;
			width: 2cqw;
		}

		.side{
			padding-right: 1rem;
			border-right: 1px solid #e2e2e2;
		}

		
	}

	.content-shopping-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 1rem;
	}

	.container-navbar {
		background-color: var(--primary-color);
		padding: 0 13cqw;

		.navbar {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.menu {
		display: flex;
		gap: 2rem;
		padding: 0;
		text-align: center;

		li {
			list-style: none;
		}

		a {
			text-decoration: none;
			font-size: 1.3rem;
			color: var(--dark-color);
			font-weight: 600;
			text-transform: uppercase;
			position: relative;
		}

		a::after {
			content: '';
			width: 1.5rem;
			height: 1px;
			background-color: #fff;
			position: absolute;
			bottom: -3px;
			left: 50%;
			transform: translate(-50%, 50%);
			opacity: 0;
			transition: all 0.3s ease;
		}

		a:hover::after {
			opacity: 1;
		}

		a:hover {
			color: #fff;
		}
	}

	//estilos de buscador
	/* .search-form {
		position: relative;
		display: flex;
		align-items: center;
		border: 2px solid #fff;
		border-radius: 2rem;
		background-color: #fff;
		height: 2.5cqw;
		overflow: hidden;

		.lupa {
			width: 1.2cqw;
		}

		input {
			outline: none;
			font-family: inherit;
			border: none;
			width: 15cqw;
			font-size: 1.1cqw;
			padding: 0 2rem;
			color: #777;
			cursor: pointer;
		}

		input::-webkit-search-cancel-button {
			appearance: none;
		}

		.btn-search {
			border: none;
			background-color: var(--primary-color);
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding: 1rem;

			i {
				font-size: 0rem;
				color: #fff;
			}
		}
	} */
	
</style>
