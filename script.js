// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

const creatures = [
  {
    id: "#001",
    name: "Embrikt",
    type: "Feu",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://static.vecteezy.com/system/resources/thumbnails/052/581/087/small/cute-pikachu-pokemon-free-vector.jpg",
    description: "Une courte description de la créature."
  },
  {
    id: "#002",
    name: "Tidalix",
    type: "Eau",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#003",
    name: "Exem",
    type: "Plante",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#004",
    name: "Exemple 4",
    type: "Électrik",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#005",
    name: "Exemple 5",
    type: "Glace",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#006",
    name: "Exemple 6",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#007",
    name: "Exemple 7",
    type: "Feu",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#008",
    name: "Exemple 8",
    type: "Eau",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#009",
    name: "Exemple 9",
    type: "Plante",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#010",
    name: "Exemple 10",
    type: "Électrik",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#011",
    name: "Exemple 11",
    type: "Glace",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#012",
    name: "Exemple 12",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://example.com/001.png",
    description: "Une courte description de la créature."
  }
];
 const grid = document.querySelector("#grid");

function displayCreatures() {
    
  if (!grid) {
    console.error("Cannot find the grid. Check the id in index.html.");
    return;
  }

  grid.innerHTML = creatures.map(creature => {
    const total = creature.stats.hp
      + creature.stats.attack
      + creature.stats.defence;

    return `
      <article class="flex min-w-0 flex-col gap-4 rounded-card bg-white p-4 pb-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        <div class="relative flex h-45 items-center justify-center rounded-xl bg-brand-light">
          <img
            src="${creature.image}"
            alt="${creature.name}"
         
         class="relative flex h-36 items-center justify-center rounded-xl bg-white bg-brand-light"
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

        <button type="button" class="btn-outline">
          Ajouter à l'équipe
        </button>

      </article>
    `;
  }).join("");
}

displayCreatures();
