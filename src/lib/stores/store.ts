import { writable } from "svelte/store";

//estado para saber si se ha logueado
export let registrado: any = writable(0);

//estdo de admin si es administrador que salga addCofee dejar en true para preuebas
export let admin: any = writable(0);

export let usuarioS: any= writable();

export let listaCesta:any = writable([]);

export let pedido:any = writable();