
const BASE_URL = "http://localhost:3000";

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



const BASE_URL = "http://localhost:3000";

// Main request function
export async function request(method, route, body = null) {

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${route}`, options);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return await response.json();
}


// Get all creatures with search and filters
export async function getCreatures(params = {}) {

    const query = new URLSearchParams(params).toString();

    const route = query
        ? `/creatures?${query}`
        : "/creatures";

    return request("GET", route);
}



export async function getCreature(id) {
    return request("GET", `/creatures/${id}`);
}



export async function createCreature(data) {
    return request("POST", "/creatures", data);
}


export async function updateCreature(id, data) {
    return request("PUT", `/creatures/${id}`, data);
}



export async function deleteCreature(id) {
    return request("DELETE", `/creatures/${id}`);
}


     


