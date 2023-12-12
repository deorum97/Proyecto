<script lang="ts">
    import cart from "$lib/images/svg/cart-shopping.svg"

    import { listaCesta, registrado } from "$lib/stores/store";

    export let cafe:any;

    function aumetarCantidad(id: any){
        listaCesta.update((cafes:any) => {
            return cafes.map((cafe:any) => {
                if (cafe.idCafe === id) {
                    return { ...cafe, cantidad: cafe.cantidad + 1 };
                }
                return cafe;
            });
        });
    }

    function añadirALista() {
        let newProd={
            idCafe: cafe.id, 
            nombreCafe: cafe.nombre, 
            precio: cafe.precio,
            cantidad: 1
        };
            
        const objetoEncontrado = $listaCesta.find((cafe:any) => cafe.idCafe === newProd.idCafe);

        if(objetoEncontrado){
            
            aumetarCantidad(objetoEncontrado.idCafe);

        }else{
            listaCesta.update(
                (listcesta: any) => (listcesta = [...listcesta, newProd])
            );
        }

    }
    
</script>

<div class="card">
    <div class="wrapper">
        <img class="imagen" src={cafe.urlimagen} alt="iamgen de cafe">
        <div class="texto">
            <h1> {cafe.nombre}</h1>
            <p>{cafe.descripcion}</p>
        </div>
        
    </div>
    <div class="buy-wrapper"> 
        
        {#if $registrado!=0}
            <div>
                <p>{cafe.precio} €</p>
            </div>
            <div class="carrito">
                <button on:click={añadirALista}><img class="image" alt="comprar" src={cart}/></button>
            </div>
        {:else}
            <div class="precio">
                <p>{cafe.precio} €</p>
            </div>
        {/if}
        
        
    </div>
</div>

<style lang="scss">

    .card {
        background-color: var(--card-color);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.125);  
        padding: 38px;  
        filter: drop-shadow(0 30px 10px rgba(0,0,0,0.125));
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        text-align: center;
        width: 23%;
    }

    .wrapper {
        width: 100%;
        height: 100%;
    }

    h1{
        color: #474747fa;
        font-size: 1.4cqw;
    }

    p {
        color: #474747fa;
        text-align: center;
        font-size: 0.8rem;
        line-height: 150%;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 600;
    }

    .buy-wrapper{
        margin-top: 18px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;
    }

    .imagen{
        width: 100%
    }

    .image{
        width: 2cqw;
    }

    .precio{
        margin:auto
    }

    .carrito{
        display: flex;

        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }
</style>