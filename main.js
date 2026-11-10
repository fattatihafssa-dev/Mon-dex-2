import {getPokemonList } from "./services/api.js";
 async function init() {
    const data = await getPokemonList();

    console.log(data.results);

 }

 init();

 

