<script lang="ts">

    import Input from "$lib/components/input/inputText.svelte";
    import Select from "$lib/components/input/select.svelte";

    import { goto } from "$app/navigation";

    let title ="Hora de crear un cafe"
    let subtitle ="Rellena el formulario"

    let idNombre = "NombreCafe"
    let nombre = "Nombre del cafe"

    let idDescripcion = "DescripcionCafe"
    let descripcion = "Descripcion del cafe"

    let idPrecio = "PrecioCafe"
    let precio = "Valor del cafe"

    let idFamilia = "FamiliaCafe"
    let familia = "Grupo del cafe"

    let idImagen = "IDImagen"
    let imagen = "URL del cafe"

    let crear = "Terminar cafe"

    type typeNuevoCafe ={
        nombre: string;
        precio: string;
        descripion: string;
        familia: string;
        imagen: string;
    }

    let datosCafe: typeNuevoCafe = {
        nombre: "",
        precio: "",
        descripion: "",
        familia: "",
        imagen: "",
    }

    function nuevoCafe() {
        let lastCafe: typeNuevoCafe = {
            nombre: datosCafe.nombre,
            precio: datosCafe.precio,
            descripion: datosCafe.descripion,
            familia: datosCafe.familia,
            imagen: datosCafe.imagen,
        }

        async function crear() {
            let URL=`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/cafes/create`;

            try{
                const response = await fetch(URL,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
                        },
                        body: JSON.stringify(lastCafe),
                })

                if (response.ok) {
					const data = await response.json();
					lastCafe = data;

                    goto("/")
				} else {
					// Si la respuesta no es exitosa, muestra un mensaje de error
					console.error("Error al crear cafe:", response.status);
				}
            }catch (error){
                console.error("Error al crear cafe");
            }
        }
        
        crear()

        /* console.log(lastCafe) */
    }

    let familias = [
        {valor:1, nombre:"Cafe frio"},
        {valor:2, nombre:"Expresso"},
        {valor:3, nombre:"Capuchino"},
        {valor:4, nombre:"Basico"},
    ]
</script>

    <div class="form">
        <div class="title">{title}</div>
        <div class="subtitle">{subtitle}</div>


        <Input clase="ic1" id={idNombre} label={nombre} bind:value={datosCafe.nombre} />

        <Input id={idPrecio} label={precio} bind:value={datosCafe.precio} />
        
        <Input id={idDescripcion} label={descripcion} bind:value={datosCafe.descripion} />
        
        <Select bind:values={datosCafe.familia}/>
        
        <Input id={idImagen} label={imagen} bind:value={datosCafe.imagen} />
        
        <button class="submit" on:click={nuevoCafe}>{crear}</button>
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

    .subtitle {
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
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