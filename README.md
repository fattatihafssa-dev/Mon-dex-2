# Mon Dex — Pokémon

Sprint 2 — Brief 1

## Installation

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus).

```bash
npm install
npm run dev
```

La commande `npm run dev` surveille les fichiers et régénère `dist/output.css` à chaque modification.

Ouvrez ensuite `index.html` dans votre navigateur ou utilisez l'extension Live Server de Visual Studio Code.

Avant de mettre le projet en ligne sur GitHub Pages, exécutez :

```bash
npm run build
```

Puis ajoutez et committez `dist/output.css`, car GitHub Pages ne lance pas Tailwind CSS automatiquement.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page Mon Dex Pokémon |
| `tailwind.config.js` | Personnalisation du thème Pokémon |
| `src/input.css` | Directives Tailwind et classes de composants |
| `dist/output.css` | CSS généré par Tailwind |
| `data.js` | Tableau `creatures` contenant au moins 12 créatures |
| `script.js` | Fonctionnalités interactives en JavaScript |
| `design/` | Maquette de la version finale |

