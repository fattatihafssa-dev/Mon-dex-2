
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonWithDetails(offset = 0, limit = 20) {

    // 1. Fetch Pokémon list
    const response = await fetch(
        `${BASE_URL}?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
        throw new Error(`Pokémon list error: ${response.status}`);
    }

    const data = await response.json();

    // 2. Fetch Pokémon details
    const promises = data.results.map(async (pokemon) => {

        const response = await fetch(pokemon.url);

        if (!response.ok) {
            throw new Error(`Pokémon details error: ${response.status}`);
        }

        return response.json();
    });

    const pokemonDetails = await Promise.all(promises);

    // 3. Convert API data into our card format
    return pokemonDetails.map(pokemon => {

        const getStat = (name) => {
            const stat = pokemon.stats.find(
                item => item.stat.name === name
            );

            return stat ? stat.base_stat : 0;
        };

        const image =
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default ||
            "";

        return {
            id: `#${String(pokemon.id).padStart(3, "0")}`,
            name: pokemon.name,
            type: pokemon.types[0]?.type.name || "unknown",
            level: "API",
            image: image,

            stats: {
                hp: getStat("hp"),
                attack: getStat("attack"),
                defence: getStat("defense")
            }
        };
    });
}
