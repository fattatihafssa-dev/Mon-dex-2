
const BASE_URL = "https://pokeapi.co/api/v2";

// Check API response
function checkResponse(response) {
    if (!response.ok) {
        throw new Error(
            response.status === 404
                ? "Pokémon not found."
                : "Unable to load Pokémon."
        );
    }

    return response.json();
}

// Convert API types into French
const typeNames = {
    fire: "Feu",
    water: "Eau",
    grass: "Plante",
    electric: "Électrik",
    ice: "Glace",
    dark: "Ténèbres",
    bug: "Insecte",
    normal: "Normal",
    poison: "Poison",
    ground: "Sol",
    flying: "Vol",
    psychic: "Psy",
    rock: "Roche",
    ghost: "Spectre",
    dragon: "Dragon",
    steel: "Acier",
    fairy: "F"
}