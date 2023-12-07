<script lang="ts">
	import { goto } from "$app/navigation";
    import { listaCesta,usuarioS,pedido } from "$lib/stores/store";

    const listaCafes = $listaCesta.map((cafe: any) => {
        return {
            idCafe: cafe.idCafe,
            nombreCafe: cafe.nombreCafe,
            precio: cafe.precio,
            cantidad: cafe.cantidad,
        };
    });

    function confirmarCompra(){

        async function crearPedido(id:any) {

			let datoPedido={
				usuarioId: id,
                entregado: false
			};

			const URL =`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/pedidos/create`;

			try{
				const response = await fetch(URL,{
					method: "POST",
					headers: {
					"Content-Type": "application/json", 
					},
					body: JSON.stringify(datoPedido),
				});

				if (response.ok) {
					const data = await response.json();
                    let pedidoNew:any;
					pedidoNew = data;

                    pedido.update((n:any) =>(n=pedidoNew))

                    crearLineasPedido();
					
				} else {
					console.error("Error al crear el pedido:", response.status);
				}
			}catch(error){
				error="Error al crear el pedido"
			}
		}

        async function crearLineasPedido() {

            let numlinea = 0;

            const listaCafes = $listaCesta.map((cafe: any) => {
                numlinea=numlinea+1;
                return {
                    numeroLinea: numlinea,
                    idPedido: $pedido.id,
                    idCafe: cafe.idCafe,
                    nombreCafe: cafe.nombreCafe,
                    precio: cafe.precio,
                    cantidad: cafe.cantidad,
                };
            });

			const URL =`http://jcoffeeapi.northeurope.cloudapp.azure.com:8080/api/lineasPedido/create`;

			try{
				const response = await fetch(URL,{
					method: "POST",
					headers: {
					"Content-Type": "application/json", 
					},
					body: JSON.stringify(listaCafes),
				});

				if (response.ok) {
					const data = await response.json();
					let lista = data;

                    $listaCesta = [];
                    $pedido = [];

                    goto("/");
					
				} else {
					console.error("Error al crear las lineas de pedido:", response.status);
				}
			}catch(error){
				error="Error al crear las lineas de pedido"
			}
		}

        crearPedido($usuarioS.id)
    }

    let totalPrecio = listaCafes.reduce((total:any, cafe:any) => total + (cafe.precio + cafe.cantidad),0);

    let total="Total"
    let confirm ="Confirmar"

    function back(){
        goto("/")
    }

</script>


{#if $listaCesta.length!=0}
    <div class="lista">
        <div class="fila">
            <p class="numero">Número de Línea</p>
            <p class="nombre">Café</p>
            <p class="cantidad">Cantidad</p>
            <p class="precio">Precio</p>
        </div>
        {#each listaCafes as fila, n}
            <div class="fila">
                <p class="numero">{n+1}</p>
                <p class="nombre">{fila.nombreCafe}</p>
                <p class="cantidad">{fila.cantidad}</p>
                <p class="precio">{fila.precio * fila.cantidad}€</p>
            </div>
        {/each}

        <div class="total">
            <p class="text">{total}</p>
            <p class="total">{totalPrecio}€</p>
        </div>

        <div class="boton">
            <button on:click={confirmarCompra}>{confirm}</button>
        </div>
        
    </div>
    
{:else}

<div class="vacio">
    <p>Aun no has comprado nada vuelve a la tienda </p>
    <div class="boton">
        <button on:click={back}>{confirm}</button>
    </div>
</div>

{/if}

<style lang="scss">

    .fila{
        display: flex;
        width: 30cqw;
        border-bottom: 1px solid #dddada;

        p{
            width: 33%;
        }

        .numero{
            margin-left: 10px;
        }

        .nombre {
            margin-left: 10px;
        }
        .precio{
            text-align: end;
        }
        .cantidad{
            text-align: end;
        }
    }

    .total{
        border-top: 1px solid;

        .text {
            margin-bottom: 0;
            border: none;
        }

        .total{
            text-align: end;
            margin-top: 0;
            border: none;
        }
    }
    
    .boton{
        display: flex;
        justify-content: flex-end;

        button{
            background-color: #303335;
            border-radius: 12px;
            border: 0;
            box-sizing: border-box;
            color: #eee;
            cursor: pointer;
            font-size: 18px;
            height: 50px;
            text-align: center;
            width: 100%;
            transition: all 0.3s ease;
        }

        button:hover {
            background-color: #06b;
            transition: all 0.3s ease;
        }
    }


</style>