
const grid = document.getElementById("grid");

// Detail elements
const detailNumber = document.getElementById("detail-number");
const detailName = document.getElementById("detail-name");
const detailImage = document.getElementById("detail-image");
const detailType = document.getElementById("detail-type");

const detailHp = document.getElementById("detail-hp");
const detailAttack = document.getElementById("detail-attack");
const detailDefence = document.getElementById("detail-defence");

const detailHpBar = document.getElementById("detail-hp-bar");
const detailAttackBar = document.getElementById("detail-attack-bar");
const detailDefenceBar = document.getElementById("detail-defence-bar");

const detailHeight = document.getElementById("detail-height");


export function displayPokemon(pokemonList) {

    if (!grid) return;

    if (pokemonList.length === 0) {
        grid.innerHTML = "<p>Aucun Pokémon trouvé.</p>";
        return;
    }

    grid.innerHTML = pokemonList.map(function(pokemon) {

        return `
            <article
                data-id="${pokemon.id}"
                tabindex="0"
                role="button"
                aria-label="Voir les détails de ${pokemon.name}"
                class="cursor-pointer rounded-xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >

                <div class="flex justify-between items-center">
                    <span class="text-sm text-muted">${pokemon.id}</span>
                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm">
                        ${pokemon.type}
                    </span>
                </div>

                <img
                    src="${pokemon.image || ""}"
                    alt="${pokemon.name}"
                    class="mx-auto h-40 w-full object-contain"
                >

                <h2 class="text-center text-xl font-bold capitalize">
                    ${pokemon.name}
                </h2>

                <div class="mt-3 flex justify-around text-sm">
                    <span>HP: ${pokemon.stats.hp}</span>
                    <span>ATK: ${pokemon.stats.attack}</span>
                    <span>DEF: ${pokemon.stats.defence}</span>
                </div>

            </article>
        `;

    }).join("");
}



export function displayPokemonDetails(pokemon) {

    if (!detailName || !detailImage) return;

    const image =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

    detailNumber.textContent =
        `#${String(pokemon.id).padStart(3, "0")}`;

    detailName.textContent = pokemon.name;

    detailImage.innerHTML = `
        <img
            src="${image || ""}"
            alt="${pokemon.name}"
            class="h-full w-full object-contain"
        >
    `;

    detailType.textContent = pokemon.types
        .map(function(type) {
            return type.type.name;
        })
        .join(" / ");

    const hp = pokemon.stats[0].base_stat;
    const attack = pokemon.stats[1].base_stat;
    const defence = pokemon.stats[2].base_stat;

    detailHp.textContent = hp;
    detailAttack.textContent = attack;
    detailDefence.textContent = defence;


    detailHpBar.style.width = `${Math.min(hp / 255 * 100, 100)}%`;
    detailAttackBar.style.width = `${Math.min(attack / 255 * 100, 100)}%`;
    detailDefenceBar.style.width = `${Math.min(defence / 255 * 100, 100)}%`;


    if (detailHeight) {
        detailHeight.textContent = `${pokemon.height / 10} m`;
    }
}
