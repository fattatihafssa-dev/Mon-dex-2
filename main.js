
import { getPokemonWithDetails } from "./services/api.js";
import { displayCreatures } from "./ui.js";

// =====================================
// APPLICATION DATA
// =====================================

let allPokemon = [];
let customCreatures = [];
let team = [];

let offset = 0;
const LIMIT = 20;
let isLoading = false;
let selectedType = "Tous";

// =====================================
// HTML ELEMENTS
// =====================================

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const filters = document.getElementById("filters");
const creatureCount = document.getElementById("creature-count");

const status = document.getElementById("api-status");
const loadMoreButton = document.getElementById("load-more");

const teamList = document.getElementById("team-list");
const teamCount = document.getElementById("team-count-display");
const teamCountNav = document.getElementById("team-count");

const creatureForm = document.getElementById("creature-form");

// =====================================
// TYPE TRANSLATIONS
// =====================================

const typeTranslations = {
    Feu: "fire",
    Eau: "water",
    Plante: "grass",
    Électrik: "electric",
    Glace: "ice",
    Ténèbres: "dark"
};

// =====================================
// ALL CREATURES
// =====================================

function getAllCreatures() {
    return [...allPokemon, ...customCreatures];
}

// =====================================
// SEARCH AND FILTER
// =====================================

function displayFilteredCreatures() {

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const filtered = getAllCreatures().filter(creature => {

        const matchesName = creature.name
            .toLowerCase()
            .includes(searchText);

        const apiType = typeTranslations[selectedType];

        const matchesType =
            selectedType === "Tous" ||
            creature.type === apiType ||
            creature.type === selectedType;

        return matchesName && matchesType;
    });

    displayCreatures(filtered);
}

// Search Pokémon
if (searchInput) {
    searchInput.addEventListener("input", displayFilteredCreatures);
}

// Filter Pokémon by type
if (filters) {

    filters.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) return;

        selectedType = button.textContent.trim();

        filters.querySelectorAll("button").forEach(btn => {
            btn.classList.remove(
                "border-ink",
                "bg-ink",
                "text-white"
            );
        });

        button.classList.add(
            "border-ink",
            "bg-ink",
            "text-white"
        );

        displayFilteredCreatures();
    });
}

// =====================================
// LOAD POKÉMON FROM API
// =====================================

async function loadPokemon() {

    if (isLoading || !grid) return;

    isLoading = true;

    if (loadMoreButton) {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "Chargement...";
    }

    if (status) {
        status.textContent = "Chargement des Pokémon...";
    }

    try {

        const pokemon = await getPokemonWithDetails(offset, LIMIT);

        if (pokemon.length === 0) {

            if (status) {
                status.textContent = "Aucun autre Pokémon disponible.";
            }

            if (loadMoreButton) {
                loadMoreButton.textContent = "Terminé";
            }

            return;
        }

        // Save API Pokémon
        allPokemon.push(...pokemon);

        // Update pagination
        offset += pokemon.length;

        // Display cards
        const searchIsActive =
            searchInput && searchInput.value.trim() !== "";

        if (selectedType === "Tous" && !searchIsActive) {

            displayCreatures(pokemon, offset > LIMIT);

        } else {

            displayFilteredCreatures();
        }

        // Update counter
        if (creatureCount) {
            creatureCount.textContent = getAllCreatures().length;
        }

        if (status) {
            status.textContent = "";
        }

        if (loadMoreButton) {
            loadMoreButton.textContent = "Afficher plus";
        }

    } catch (error) {

        console.error("API ERROR:", error);

        if (status) {
            status.textContent =
                "Erreur de chargement. Cliquez sur Réessayer.";
        }

        if (loadMoreButton) {
            loadMoreButton.textContent = "Réessayer";
        }

    } finally {

        isLoading = false;

        if (loadMoreButton &&
            loadMoreButton.textContent !== "Terminé") {

            loadMoreButton.disabled = false;
        }
    }
}

// Load more button
if (loadMoreButton) {
    loadMoreButton.addEventListener("click", loadPokemon);
}

// =====================================
// TEAM FUNCTIONS
// =====================================

function displayTeam() {

    if (!teamList) return;

    const slots = teamList.querySelectorAll(".team-slot");

    slots.forEach((slot, index) => {

        const pokemon = team[index];

        if (pokemon) {

            slot.innerHTML = `
                <div class="flex w-full flex-col items-center gap-1">

                    <img
                        src="${pokemon.image}"
                        alt="${pokemon.name}"
                        class="h-8 w-8 object-contain"
                    >

                    <p class="text-xs font-bold capitalize">
                        ${pokemon.name}
                    </p>

                    <button
                        type="button"
                        class="remove-from-team rounded bg-red-600 px-2 py-1 text-xs text-white"
                        data-id="${pokemon.id}"
                    >
                        Retirer
                    </button>

                </div>
            `;

        } else {

            slot.innerHTML = `
                <p class="text-xs text-muted">
                    + Ajoutez une créature
                </p>
            `;
        }
    });

    if (teamCount) {
        teamCount.textContent = `${team.length} / 6`;
    }

    if (teamCountNav) {
        teamCountNav.textContent = team.length;
    }
}

// Add Pokémon to team
function addToTeam(pokemon) {

    if (team.some(member => member.id === pokemon.id)) {
        alert("Ce Pokémon est déjà dans votre équipe.");
        return;
    }

    if (team.length >= 6) {
        alert("Votre équipe est complète : 6 Pokémon maximum.");
        return;
    }

    team.push(pokemon);

    displayTeam();

    alert(pokemon.name + " a été ajouté à votre équipe !");
}

// Add Pokémon using card buttons
if (grid) {

    grid.addEventListener("click", event => {

        const addButton = event.target.closest(".add-to-team");

        if (addButton) {

            const card = addButton.closest("[data-id]");

            if (!card) return;

            const pokemon = getAllCreatures().find(
                creature => creature.id === card.dataset.id
            );

            if (pokemon) {
                addToTeam(pokemon);
            }

            return;
        }

        // Display Pokémon details
        const card = event.target.closest("article[data-id]");

        if (!card || event.target.closest("button")) return;

        const pokemon = getAllCreatures().find(
            creature => creature.id === card.dataset.id
        );

        if (pokemon) {
            displayDetails(pokemon);
        }
    });
}

// Remove Pokémon from team
if (teamList) {

    teamList.addEventListener("click", event => {

        const removeButton = event.target.closest(".remove-from-team");

        if (!removeButton) return;

        const id = removeButton.dataset.id;

        team = team.filter(pokemon => pokemon.id !== id);

        displayTeam();
    });
}

// =====================================
// DETAIL PANEL
// =====================================

function displayDetails(pokemon) {

    const detailNumber = document.getElementById("detail-number");
    const detailName = document.getElementById("detail-name");
    const detailType = document.getElementById("detail-type");
    const detailImage = document.getElementById("detail-image");

    const detailHp = document.getElementById("detail-hp");
    const detailAttack = document.getElementById("detail-attack");
    const detailDefence = document.getElementById("detail-defence");

    const detailHpBar = document.getElementById("detail-hp-bar");
    const detailAttackBar = document.getElementById("detail-attack-bar");
    const detailDefenceBar = document.getElementById("detail-defence-bar");

    if (detailNumber) {
        detailNumber.textContent = pokemon.id + " · Détail";
    }

    if (detailName) {
        detailName.textContent = pokemon.name;
    }

    if (detailType) {
        detailType.textContent =
            typeTranslations[pokemon.type]
                ? pokemon.type
                : pokemon.type;
    }

    if (detailHp) detailHp.textContent = pokemon.stats.hp;
    if (detailAttack) detailAttack.textContent = pokemon.stats.attack;
    if (detailDefence) detailDefence.textContent = pokemon.stats.defence;

    if (detailHpBar) {
        detailHpBar.style.width =
            `${Math.min(pokemon.stats.hp, 100)}%`;
    }

    if (detailAttackBar) {
        detailAttackBar.style.width =
            `${Math.min(pokemon.stats.attack, 100)}%`;
    }

    if (detailDefenceBar) {
        detailDefenceBar.style.width =
            `${Math.min(pokemon.stats.defence, 100)}%`;
    }

    if (detailImage) {

        detailImage.innerHTML = `
            <img
                src="${pokemon.image}"
                alt="${pokemon.name}"
                class="h-40 w-40 object-contain"
            >
        `;
    }
}

// =====================================
// CREATE NEW CREATURE
// =====================================

if (creatureForm) {

    creatureForm.addEventListener("submit", event => {

        event.preventDefault();

        const formData = new FormData(creatureForm);

        const id = formData.get("id").trim();
        const name = formData.get("name").trim();
        const type = formData.get("type");
        const level = formData.get("level").trim();

        const stat1 = formData.get("stat1").trim();
        const stat2 = formData.get("stat2").trim();
        const stat3 = formData.get("stat3").trim();

        const image = formData.get("image").trim();
        const description = formData.get("description").trim();

        // Required fields
        if (
            !id || !name || !type || !level ||
            !stat1 || !stat2 || !stat3 ||
            !image || !description
        ) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // Validate ID
        if (!/^#\d{3}$/.test(id)) {
            alert("Le numéro doit respecter le format #001.");
            return;
        }

        if (getAllCreatures().some(creature => creature.id === id)) {
            alert("Ce numéro existe déjà.");
            return;
        }

        // Validate statistics
        const validStats = [stat1, stat2, stat3].every(stat =>
            /^\d{1,3}$/.test(stat) && Number(stat) <= 999
        );

        if (!validStats) {
            alert("Les statistiques doivent être entre 0 et 999.");
            return;
        }

        // Validate image URL
        try {

            const imageURL = new URL(image);

            if (
                imageURL.protocol !== "http:" &&
                imageURL.protocol !== "https:"
            ) {
                throw new Error("Invalid image URL");
            }

        } catch {
            alert("Veuillez entrer un lien d'image valide.");
            return;
        }

        // Validate description
        if (description.length < 10 || description.length > 200) {
            alert("La description doit contenir entre 10 et 200 caractères.");
            return;
        }

        // Create new creature
        const newCreature = {
            id,
            name,
            type,
            level,

            stats: {
                hp: Number(stat1),
                attack: Number(stat2),
                defence: Number(stat3)
            },

            image,
            description
        };

        customCreatures.push(newCreature);

        // Reset search and filters
        selectedType = "Tous";

        if (searchInput) {
            searchInput.value = "";
        }

        if (filters) {

            filters.querySelectorAll("button").forEach(button => {
                button.classList.remove(
                    "border-ink",
                    "bg-ink",
                    "text-white"
                );
            });

            const allButton = [...filters.querySelectorAll("button")]
                .find(button => button.textContent.trim() === "Tous");

            if (allButton) {
                allButton.classList.add(
                    "border-ink",
                    "bg-ink",
                    "text-white"
                );
            }
        }

        if (creatureCount) {
            creatureCount.textContent = getAllCreatures().length;
        }

        displayFilteredCreatures();

        creatureForm.reset();

        alert("Créature ajoutée avec succès !");
    });
}

// =====================================
// INITIALIZE APPLICATION
// =====================================

displayTeam();
loadPokemon();
