
// CONNECTING DATA FROM API JS FILE TO THE HTML GRID

const grid = document.getElementById("grid");

export function displayPokemon(pokemonList) {

    const cards = pokemonList.map(pokemon => {
        return `
            <div>
                <h3>${pokemon.name}</h3>
            </div>
        `;
    });

    const html = cards.join("");

    grid.innerHTML = html;
}
