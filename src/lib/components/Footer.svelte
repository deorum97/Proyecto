<script lang="ts">
    let text ="Pagina en progreso Cafeteria"
    let nombre ="J-Cofee"
    let about = "Sobre Nosotros"
</script>

<footer>
    <a href="/about">{about}</a>
    <p>{text} <i><b>{nombre}</b></i></p>

</footer>


<style lang="scss">
    footer {
        background-color: var(--primary-color);
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
        margin-top: auto;

        @media (min-width: 480px) {
            footer {
                padding: 12px 0;
            }
        }
    }

    a{
        text-decoration: none;
        font-style: italic;
        color: black;
        font-weight: 700;
    }
</style>