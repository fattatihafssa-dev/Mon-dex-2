import { getPokemonWithDetails } from "./services/api.js";
 let pokemonList = [];

 async function init() {
   try {
        pokemonList = awit getPokemonWithDetails();

        console.log(pokemonList);

   } catch(error)  {
      console.log("Error loading Pokémon:",error);
   }
}

init();