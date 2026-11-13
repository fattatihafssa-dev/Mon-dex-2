
const grid = document.getElementById("grid");

// Translate Pokémon types into French
function translateType(type) {

    const types = {
        normal: "Normal",
        fire: "Feu",
        water: "Eau",
        electric: "Électrik",
        grass: "Plante",
        ice: "Glace",
        fighting: "Combat",
        poison: "Poison",
        ground: "Sol",
        flying: "Vol",
        psychic: "Psy",
        bug: "Insecte",
        rock: "Roche",
        ghost: "Spectre",
        dragon: "Dragon",
        dark: "Ténèbres",
        steel: "Acier",
        fairy: "Fée"
    };

    return types[type] || type;
}

// Display Pokémon cards
export function displayCreatures(list, append = false) {

    if (!grid) return;

    if (!append) {
        grid.innerHTML = "";
    }

    if (list.length === 0 && !append) {
        grid.innerHTML = `
            <p class="col-span-full text-center text-muted">
                Aucun Pokémon trouvé.
            </p>
        `;
        return;
    }

    const cards = list.map(creature => {

        const total =
            creature.stats.hp +
            creature.stats.attack +
            creature.stats.defence;

        return `
            <article
                data-id="${creature.id}"
                class="creature-card flex min-w-0 cursor-pointer flex-col gap-4 rounded-card bg-white p-4 pb-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

                <div class="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-brand-light">

                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">
                        ${creature.id}
                    </span>

                    <img
                        src="${creature.image}"
                        alt="${creature.name}"
                        class="h-24 w-24 object-contain"
                        loading="lazy"
                    >

                </div>

                <div class="flex flex-col gap-2">

                    <h3 class="font-display text-xl font-semibold capitalize">
                        ${creature.name}
                    </h3>

                    <span class="w-fit rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink capitalize">
                        ${translateType(creature.type)}
                    </span>

                    <p class="text-sm text-muted">
                        Total ${total}
                    </p>

                </div>

                <button
                    type="button"
                    class="add-to-team btn-outline"
                    data-id="${creature.id}"
                >
                    Ajouter à l'équipe
                </button>

            </article>
        `;
    }).join("");

    if (append) {
        grid.insertAdjacentHTML("beforeend", cards);
    } else {
        grid.innerHTML = cards;
    }
}
