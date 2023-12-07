<script lang="ts">
	import { goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";
	import { registrado, admin, usuarioS } from "$lib/stores/store";

	let sign =false;

    function login(){
       sign=false
    }

    function signup(){
		sign=true
    }

    // Textos
    let signT="Crear una cuenta"
    let logT="Logueate"

    let back="Volver"

    let name="Nombre"
    let email="Email"
    let pass="Contraseña"
    let forgot="¿Olvidaste tu contraseña?"

    let logM="LOGUEATE"
    let signM="REGISTRARSE"

    let signText1="¿Eres nuevo?"
    let signText2="Create una cuenta y compra un cafecito"

    let logText1="¿YA TIENES CUENTA?"
    let logText2="Logueate y pide un cafecito"    

	let title="Loguin"

	let errorL=""
	let errorS=""

	type tpyeLogin = {
		email: string,
		contraseña :string,
	}

	type tpyeRegistro = {
		nombre: string,
		email: string,
		contrasena: string
	}

	let datosLogin: tpyeLogin={
		email: "",
		contraseña: "",
	}

	let datosRegistro: tpyeRegistro={
		nombre: "",
		email: "",
		contrasena: "",
	}

	
	function postLogin(){
		let usuario:any;

		if(datosLogin.email.length==0 || datosLogin.contraseña.length==0){
			errorL="Los campos no pueden estar vacios"
			return;
		} 

		async function obtenerUsuario(email:any,pass:any) {
			const URL =`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/usuarios/login?email=${email}&pass=${pass}`;
			try{
				const response = await fetch(URL);

				if(response.ok){
					const data = await response.json();
					usuario = data;
					//console.log(usuario);
					if(usuario.rol =="admin"){
						admin.update((n:any) =>(n=1))
					}
					registrado.update((n:any) =>(n=1))

					usuarioS.update((n:any) => (n=usuario))
					goto("/")
				} else {
					console.error("Error al obtener los datos:", response.status);
					errorL="Fallo al conectar con la base de datos"
				}
			}catch(error){
				console.error(error);
				error="Email o contraseña incorrectos"
			}
		}

		obtenerUsuario(datosLogin.email, datosLogin.contraseña);
    }

    function postSignup(){
		

		if(datosRegistro.email.length==0 || datosRegistro.nombre.length==0 || datosRegistro.contrasena.length==0){
			errorS="Los campos no pueden estar vacios"
			return;
		} 

		async function crearUsuario(nombre:any, email:any, contrasena:any) {

			let usuario={
				nombre,
				email,
				contrasena,
				telefono: "",
				direccion: "",
				rol: "cliente"
			};
			/* console.log(usuario) */

			const URL =`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/usuarios/create`;

			try{
				const response = await fetch(URL,{
					method: "POST",
					headers: {
					"Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
					},
					body: JSON.stringify(usuario),
				});

				if (response.ok) {
					const data = await response.json();
					usuario = data;
					//console.log(usuario);
					if(usuario.rol =="admin"){
						admin.update((n:any) =>(n=1))
					}
					registrado.update((n:any) =>(n=1))

					usuarioS.update((n:any) => (n=usuario))
					goto("/")
				} else {
					// Si la respuesta no es exitosa, muestra un mensaje de error
					console.error("Error al crear la cliente:", response.status);
				}
			}catch(error){
				error="Error al crear al usuario"
			}
		}

		/* let setRegistro: tpyeRegistro={
			nombre: datosRegistro.nombre,
			email: datosRegistro.email,
			contraseña: datosRegistro.contraseña,
		}
        console.log(setRegistro) */
		crearUsuario(datosRegistro.nombre, datosRegistro.email, datosRegistro.contrasena)
    }

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Cafeteria J-Cofee" />
</svelte:head>

<div class="container" class:sign id="container">

	<!-- contenerdor de registro -->
	<div class="form-container sign-up-container">
		<form action="#">
			<a class ="h2" href="/"><h2>{back}</h2></a>
			<h1>{signT}</h1>
			{#if errorS}<p class="error">{errorS}</p>{/if}
			<input type="text" placeholder={name} bind:value={datosRegistro.nombre}/>
			<input type="email" placeholder={email} bind:value={datosRegistro.email}/>
			<input type="password" placeholder={pass} bind:value={datosRegistro.contrasena}/>
			<button on:click={postSignup}>{signM}</button>
		</form>
	</div>

	<!-- contenerdor de logueo -->
	<div class="form-container sign-in-container">
        
		<form action="#">
			<a class ="h2" href="/"><h2>{back}</h2></a>
			<h1>{logT}</h1>
			{#if errorL}<p class="error">{errorL}</p>{/if}
			<input type="email" placeholder={email} bind:value={datosLogin.email}/>
			<input type="password" placeholder={pass} bind:value={datosLogin.contraseña}/>
			<a href="#">{forgot}</a>
			<button on:click={postLogin}>{logM}</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>{logText1}</h1>
				<p>{logText2}</p>
				<button class="ghost" id="signIn" on:click={login}>{logM}</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>{signText1}</h1>
				<p>{signText2}</p>
				<button class="ghost" id="signUp" on:click={signup}>{signM}</button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">

	* {
		box-sizing: border-box;
	}

	h1 {
		font-weight: bold;
		margin: 0;
	}


	p {
		font-size: 14px;
		font-weight: 100;
		line-height: 20px;
		letter-spacing: 0.5px;
		margin: 20px 0 30px;
	}

	.error{
			color:red ;
			font-weight: 500;
			margin-bottom: 5px;
		}

	a {
		color: #333;
		font-size: 14px;
		text-decoration: none;
		margin: 15px 0;
	}

	button {
		border-radius: 20px;
		border: 1px solid #FF4B2B;
		font-size: 12px;
		font-weight: bold;
		padding: 12px 45px;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: transform 80ms ease-in;
		cursor: pointer;
	}

	button:active {
		transform: scale(0.95);
	}

	button:focus {
		outline: none;
	}

	button.ghost {
		background-color: rgb(0 0 0 / 30%);
		border-color: #FFFFFF;
	}

	form {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		padding: 0 50px;
		height: 100%;
		text-align: center;
	}

	input {
		background-color: #eee;
		border: none;
		padding: 12px 15px;
		margin: 8px 0;
		width: 100%;
	}

	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
				0 10px 10px rgba(0,0,0,0.22);
		position: relative;
		overflow: hidden;
		width: 768px;
		max-width: 100%;
		min-height: 480px;

		
	}

	.form-container {
		position: absolute;
		top: 0;
		height: 100%;
		transition: all 0.6s ease-in-out;
	}

	.sign-in-container {
		left: 0;
		width: 50%;
		z-index: 2;

		button{
			border: 1px solid #442bff;
			background-color: #442bffd4;
			color: #000000;
		}
	}

	.container.sign .sign-in-container {
		transform: translateX(100%);
	}

	.sign-up-container {
		left: 0;
		width: 50%;
		opacity: 0;
		z-index: 1;

		button{
			border: 1px solid #757575;
			background-color: #41ffcf;
			color: #000000;
		}
	}


	.container.sign .sign-up-container {
		transform: translateX(100%);
		opacity: 1;
		z-index: 5;
		animation: show 0.6s;
	}

	@keyframes show {
		0%, 49.99% {
			opacity: 0;
			z-index: 1;
		}
		
		50%, 100% {
			opacity: 1;
			z-index: 5;
		}
	}

	.overlay-container {
		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		overflow: hidden;
		transition: transform 0.6s ease-in-out;
		z-index: 100;
	}

	.container.sign .overlay-container{
		transform: translateX(-100%);
	}

	.overlay {
		background: #41ffcf;
		background: -webkit-linear-gradient(to right, #442bff, #41ffcf);
		background: linear-gradient(to right, #442bff, #41ffcf);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;
		color: #FFFFFF;
		position: relative;
		left: -100%;
		height: 100%;
		width: 200%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.container.sign .overlay {
		transform: translateX(50%);
	}

	.overlay-panel {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0 40px;
		text-align: center;
		top: 0;
		height: 100%;
		width: 50%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.overlay-left {
		transform: translateX(-20%);
	}

	.container.sign .overlay-left {
		transform: translateX(0);
	}

	.overlay-right {
		right: 0;
		transform: translateX(0);
	}

	.container.sign .overlay-right {
		transform: translateX(20%);
	}

</style>