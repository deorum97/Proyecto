<script lang="ts">

    import Input from "$lib/components/input/inputText.svelte";
    import Select from "$lib/components/input/select.svelte";
    import InputNumber from "$lib/components/input/inputNumber.svelte";

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

    let datosCafe={
        nombre: "",
        precio: "",
        descripcion: "",
        familiaId: "",
        urlimagen: "",
    }

    function nuevoCafe() {
        let lastCafe= {
            nombre: datosCafe.nombre,
            precio: datosCafe.precio,
            descripcion: datosCafe.descripcion,
            familiaId: datosCafe.familiaId,
            urlimagen: datosCafe.urlimagen,
            activo: true,
        }

        console.log(lastCafe)

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
					let NewCafe = data;

                    console.log(NewCafe)

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

</script>

    <div class="form">
        <div class="title">{title}</div>
        <div class="subtitle">{subtitle}</div>


        <Input clase="ic1" id={idNombre} label={nombre} bind:value={datosCafe.nombre} />

        <InputNumber id={idPrecio} label={precio} bind:value={datosCafe.precio} />
        
        <Input id={idDescripcion} label={descripcion} bind:value={datosCafe.descripcion} />
        
        <Select bind:values={datosCafe.familiaId}/>
        
        <Input id={idImagen} label={imagen} bind:value={datosCafe.urlimagen} />
        
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