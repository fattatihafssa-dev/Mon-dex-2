const creatures = [
  {
    id: "#001",
    name: "Guzzlord",
    type: "Feu",
    level: "Base",
    stats: { hp: 45, attack: 42, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/guzzlord.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#002",
    name: "Tidalix",
    type: "Eau",
    level: "Base",
    stats: { hp: 85, attack: 77, defence: 49 },
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#003",
    name: "Salazzle",
    type: "Plante",
    level: "Base",
    stats: { hp: 90, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/salazzle.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#004",
    name: "Weavile",
    type: "Électrik",
    level: "Base",
    stats: { hp: 77, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/weavile.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#005",
    name: "Salandit",
    type: "Glace",
    level: "Base",
    stats: { hp: 66, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/salandit.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#006",
    name: "Zekrom",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 120, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/zekrom.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#007",
    name: "Darkrai",
    type: "Feu",
    level: "Base",
    stats: { hp: 140, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/darkrai.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#008",
    name: "Xurkitree",
    type: "Eau",
    level: "Base",
    stats: { hp: 134, attack: 77, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/xurkitree.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#009",
    name: "Snorlax",
    type: "Plante",
    level: "Base",
    stats: { hp: 57, attack: 77, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/snorlax.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#010",
    name: "Houndour",
    type: "Électrik",
    level: "Base",
    stats: { hp: 45, attack: 389, defence: 88 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/houndour.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#011",
    name: "Sneasel",
    type: "Glace",
    level: "Base",
    stats: { hp: 90, attack: 59, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/sneasel.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#012",
    name: "Giratina",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 100, attack: 59, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/giratina-altered.avif",
    description: "Une courte description de la créature."
  }
];

const grid = document.querySelector("#grid");
const searchInput = document.getElementById("search");
const filters = document.getElementById("filters");
const creatureForm = document.getElementById("creature-form");

const team = [];
const teamList = document.getElementById("team-list");
const teamCount = document.getElementById("team-count-display");
const teamCountNav = document.getElementById("team-count");

let selectedType = "Tous";

// Display the Pokémon cards
function displayCreatures(list = creatures) {
  if (!grid) {
    console.error("Cannot find the grid. Check the id in index.html.");
    return;
  }

  grid.innerHTML = list.map(function(creature) {
    const total =
      Number(creature.stats.hp) +
      Number(creature.stats.attack) +
      Number(creature.stats.defence);

    return `
      <article data-id="${creature.id}" class="flex min-w-0 flex-col gap-4 rounded-card bg-white p-4 pb-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        <div class="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-brand-light">
          <img
            src="${creature.image}"
            alt="${creature.name}"
            class="h-24 w-24 object-contain"
          >

          <span class="absolute left-3 top-2 font-mono text-sm text-muted">
            ${creature.id}
          </span>
        </div>

        <div class="flex items-center justify-between gap-2">
          <h3 class="font-display text-xl font-semibold">
            ${creature.name}
          </h3>

          <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">
            ${creature.type}
          </span>
        </div>

        <p class="text-sm text-muted">
          ${creature.level} · Total ${total}
        </p>

        <button type="button" class="btn-outline add-to-team">
          Ajouter à l'équipe
        </button>

       

      </article>
    `;
  }).join("");
}

// Search and filter Pokémon together
function displayFilteredCreatures() {
  const searchText = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const filteredCreatures = creatures.filter(function(creature) {
    const matchesName = creature.name.toLowerCase().includes(searchText);

    const matchesType =
      selectedType === "Tous" || creature.type === selectedType;

    return matchesName && matchesType;
  });

  displayCreatures(filteredCreatures);
}

// Filter buttons
if (filters) {
  filters.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button || !filters.contains(button)) {
      return;
    }

    selectedType = button.textContent.trim();
    displayFilteredCreatures();
  });
}

// Live search
if (searchInput) {
  searchInput.addEventListener("input", function() {
    displayFilteredCreatures();
  });
}

// Display the team

function displayTeam() {
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

          <p class="text-xs font-bold">${pokemon.name}</p>

          <button
            type="button"
            class="remove-from-team rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
            data-id="${pokemon.id}"
          >
            Retirer
          </button>
        </div>
      `;
    } else {
      slot.innerHTML = `
        <p class="text-xs text-muted">+ Ajoutez une créature</p>
      `;
    }
  });

 
} 
teamCount.textContent = `${team.length} / 6`;
teamCountNav.textContent = team.length;

// Card clicks: add, delete, or show details

// Remove a Pokémon from the team using event delegation
if (teamList) {
  teamList.addEventListener("click", function(event) {
    const removeButton = event.target.closest(".remove-from-team");

    if (!removeButton) return;

    const id = removeButton.dataset.id;

    const index = team.findIndex(function(pokemon) {
      return pokemon.id === id;
    });

    if (index !== -1) {
      team.splice(index, 1);
      displayTeam();
    }
  });
}

if (grid) {
  grid.addEventListener("click", function(event) {
    const addButton = event.target.closest(".add-to-team");
    const deleteButton = event.target.closest(".delete-btn");

    // Ajouter un Pokémon à l'équipe
    
if (addButton) {
  const card = addButton.closest("[data-id]");
  if (!card) return;

  const pokemon = creatures.find(
    creature => creature.id === card.dataset.id
  );

  if (!pokemon) {
    alert("Pokémon introuvable.");
    return;
  }

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
  return;
}


    // Afficher les détails au clic sur une carte
    const card = event.target.closest("article[data-id]");
    if (!card || event.target.closest("button")) return;

    const pokemon = creatures.find(
      creature => creature.id === card.dataset.id
    );

    if (!pokemon) return;

    const detailNumber = document.getElementById("detail-number");
const detailName = document.getElementById("detail-name");
const detailType = document.getElementById("detail-type");
const detailImage = document.getElementById("detail-image");

// Stat numbers
const detailHp = document.getElementById("detail-hp");
const detailAttack = document.getElementById("detail-attack");
const detailDefence = document.getElementById("detail-defence");

// Colored stat bars
const detailHpBar = document.getElementById("detail-hp-bar");
const detailAttackBar = document.getElementById("detail-attack-bar");
const detailDefenceBar = document.getElementById("detail-defence-bar");

// Update stat numbers

if (detailNumber) {
  detailNumber.textContent = pokemon.id + " · Détail";
}

if (detailName) {
  detailName.textContent = pokemon.name;
}

if (detailType) {
  detailType.textContent = pokemon.type;
}

if (detailHp) detailHp.textContent = pokemon.stats.hp;
if (detailAttack) detailAttack.textContent = pokemon.stats.attack;
if (detailDefence) detailDefence.textContent = pokemon.stats.defence;

// Update colored bars
if (detailHpBar) {
  detailHpBar.style.width = `${pokemon.stats.hp}%`;
}

if (detailAttackBar) {
  detailAttackBar.style.width = `${pokemon.stats.attack}%`;
}

if (detailDefenceBar) {
  detailDefenceBar.style.width = `${pokemon.stats.defence}%`;
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
  });
}

// Add a new Pokémon using the form
if (creatureForm) {
  creatureForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(creatureForm);

    const name = formData.get("name").trim();
    const type = formData.get("type");
    const level = formData.get("level").trim();
    const stat1 = formData.get("stat1").trim();
    const stat2 = formData.get("stat2").trim();
    const stat3 = formData.get("stat3").trim();
    const image = formData.get("image").trim();
    const description = formData.get("description").trim();
    const idInput = formData.get("id").trim();

    if (
      !idInput ||
      !name ||
      !type ||
      !level ||
      !stat1 ||
      !stat2 ||
      !stat3 ||
      !image ||
      !description
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Validate the creature number
    if (!/^#\d{3}$/.test(idInput)) {
      alert("Le numéro doit respecter le format #001.");
      return;
    }

    // Check for a duplicate ID
    if (creatures.some(function(creature) {
      return creature.id === idInput;
    })) {
      alert("Ce numéro existe déjà.");
      return;
    }

    // Validate the statistics
    const validStats = [stat1, stat2, stat3].every(function(stat) {
      return /^\d{1,3}$/.test(stat) && Number(stat) <= 999;
    });

    if (!validStats) {
      alert("Les statistiques doivent être des nombres entre 0 et 999.");
      return;
    }

    // Validate the image URL
    try {
      const imageURL = new URL(image);

      if (imageURL.protocol !== "http:" && imageURL.protocol !== "https:") {
        alert("Veuillez entrer un lien d'image valide.");
        return;
      }
    } catch {
      alert("Veuillez entrer un lien d'image valide.");
      return;
    }

    // Validate the description length
    if (description.length < 10 || description.length > 200) {
      alert("La description doit contenir entre 10 et 200 caractères.");
      return;
    }

    // Create the new Pokémon
    const newCreature = {
      id: idInput,
      name: name,
      type: type,
      level: level,
      stats: {
        hp: Number(stat1),
        attack: Number(stat2),
        defence: Number(stat3)
      },
      image: image,
      description: description
    };

    creatures.push(newCreature);

    selectedType = "Tous";

    if(searchInput){
      searchInput.value = "";
    }

    displayFilteredCreatures();
    creatureForm.reset();

    alert("Créature ajoutée avec succès !");
  });
}

// Initial display
displayCreatures();
displayTeam();

