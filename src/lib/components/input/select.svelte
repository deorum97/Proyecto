<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let values: any;

    const dispatch = createEventDispatcher();

    let familias = [
        {valor:1, nombre:"Cafe frio"},
        {valor:2, nombre:"Expresso"},
        {valor:3, nombre:"Capuchino"},
        {valor:4, nombre:"Basico"},
    ]

    function handleChange(event: any) {
    const selectedValue = event.target.value;

    dispatch("selected", selectedValue);
  }
</script>

<div class="input-container ic2">

    <select
    bind:value={values}
    on:change={handleChange}>
    
        {#each familias as f}
            <option value={f.valor}>{f.nombre}</option>
        {/each}

    </select>

</div>

<style lang="scss">

    .input-container {
        height: 50px;
        position: relative;
        width: 100%;
    }

    .ic2 {
        margin-top: 30px;
    }
    select {
  /* Reset */
  appearance: none;
  border: 2px solid black;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 100%;
  height: 100%;
  padding: 4px 20px 0;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, #303335 3em, transparent 3em);
  color: black;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* <option> colors */
  option {
    color: inherit;
    background-color: var(--option-bg);
  }
}
</style>