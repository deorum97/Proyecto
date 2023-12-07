<script lang="ts">
	import { goto } from "$app/navigation";


    import Input from "$lib/components/input/inputText.svelte";
    import InputNumber from "$lib/components/input/inputNumber.svelte";
    import { usuarioS } from "$lib/stores/store";

    let usuario:any;
    usuario={
        nombre: $usuarioS.nombre,
        email: $usuarioS.email,
        contrasena: $usuarioS.contrasena,
        telefono: $usuarioS.telefono ,
        direccion: $usuarioS.direccion,
        rol: $usuarioS.rol,
    }

    let title =`Perfil de ${usuario.nombre}`

    let idNombre = "NombreUsuario"
    let nombre = "Nombre"

    let idTelefono = "TelefonoUsuario"
    let telefono = "Telefono"

    let idEmail = "EmailUsurio"
    let email = "Email"

    let idDireccion = "DireccionUsuario"
    let direccion = "Direccion"

    let actualizar = "Actualizar"

    function actualizarUsuario() {

        async function actualizar(id:any) {
            let URL=`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/usuarios/${id}`;

            try{
                const response = await fetch(URL,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
                        },
                        body: JSON.stringify(usuario),
                })

                if (response.ok) {
					const data = await response.json();
					usuario = data;

					usuarioS.update((n:any) => (n=usuario))
                    goto("/perfil")
				} else {
					// Si la respuesta no es exitosa, muestra un mensaje de error
					console.error("Error al actualizar:", response.status);
				}
            }catch (error){
                console.error("Error al actualizar");
            }
        }
        
        actualizar($usuarioS.id)
    }

</script>

    <div class="form">
        <div class="title">{title}</div>

        <Input clase="ic1" id={idNombre} label={nombre} bind:value={usuario.nombre} />

        <Input id={idEmail} label={email} bind:value={usuario.email} />
        
        <InputNumber id={idTelefono} label={telefono} bind:value={usuario.telefono} />
        
        <Input id={idDireccion} label={direccion} bind:value={usuario.direccion} />
        
        <button class="submit" on:click={actualizarUsuario}>{actualizar}</button>
    </div>

<style lang="scss">

    .form {
        /* background-color: #15172b;
        border-radius: 20px; */
        box-sizing: border-box;
        padding: 20px;
    }

    .title {
        font-size: 36px;
        font-weight: 600;
        margin-top: 30px;
    }

    .submit {
        background-color: #303335;
        border-radius: 12px;
        border: 0;
        box-sizing: border-box;
        color: #eee;
        cursor: pointer;

        font-size: 18px;
        height: 50px;
        margin-top: 38px;
        text-align: center;
        width: 100%;
        transition: all 0.3s ease;
    }

    .submit:hover {
        background-color: #06b;
        transition: all 0.3s ease;
    }

</style>