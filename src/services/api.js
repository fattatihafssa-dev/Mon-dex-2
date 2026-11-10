import { addTransitionType } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

//get the first 20 pokemon
export async function getPokemonList() {
    const url = `${BASE_URL}/pokemon?limit=20&offset=0`;
      

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch Pokemon");

        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ("failed to fetch Pokemon details")
        }
            const data = await response.json();
            return data ;
        } catch (error) {
        console.error(error);
        throw error ;
    }
} 
//get the details of one pokemon //

export async function getPokemonWithDetails() {
    const data = await getPokemonList();

    const promises = data.results.map(pokemon => {
        return getPokemonDetails(pokemon.url);
    });

    const pokemonDetails = await Promise.all(promises);

    const formatPokemon = pokemonDetails.map(pokemon => {
        return formatPokemon(pokemon);
    });

    return pokemonDetails;
}


function formatPokemon(pokemon) {
    const typeName = {
         fire: "Feu",
        water: "Eau",
        grass: "Plante",
        electric: "Électrik",
        ice: "Glace",
        dark: "Ténèbres"
    };
      return {
        id: `${String(pokemon.id)}.padStart(3,"0")},`
        name : pokemon.name,
        type: typeName[pokemon.type[0].type.name] || pokemon.type[0].type.name,
        level:"Base",

        status : {
            hp: pokemon.status[0].nase_stat,
            attack : pokemon.stats[1].base_stat,
            defence: pokemon.stats[2].base_stat
        },

        image : pokemon.spirites.other["official-artwork"].front_default
         || pokemon.spirites.front_default,

         description:""
      };
    }
}

    