import { getPokemonWithDetails } from "./services/api.js";
import { displayPokemon } from "./ui.js";

let pokemonList = [];

async function init() {
    try {
        // 1. Fetch Pokémon from the API
        pokemonList = await getPokemonWithDetails();

        // 2. Display Pokémon cards in the HTML
        displayPokemon(pokemonList);

    } catch (error) {
        console.error("Error loading Pokémon:", error);
    }
}

// 3. Start the application
init();

