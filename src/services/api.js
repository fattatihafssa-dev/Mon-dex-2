import { getPokemonWithDetails } from "./services/api.js";
import {displayPokemon} from "../ui.js";

let pokemonList = [];
let offset = 0 ;

const loadMoreButton = document.getElementById("load-more");
 const typeSelect = document.getElementById("type")
 const searchInput = document.getElementById("search");

async function init () {
    try {
        pokemonList = await getPokemonWithDetails();

        console.log(pokemonList);

        displayPokemon(pokemonList);

    }  catch (error) {
        console.error("Error loading Pokémon:", error);

    }
}  
//starting the app////
init ();

if(loadMoreButton) {


loadMoreButton.addEventListenner("click", async function(){
    try {
        offset += 20 ; 
        const newPokemon = await getPokemonWithDetails(offset);

        // this combin the excited pokemon in the web with the added pokemon////

        pokemonList = [...pokemonList,...newPokemon];

        displayPokemon(pokemonList);

    } catch (error) {
        console.error("Error loading more pokémon:",error);
        offset -= 20 ; 
    }
});
}


function filterPokemon() {

    const searchText = searchInput 
    ? searchInput.value.trim().toLowerCase()
    :"";   

    const type = typeSelect
    ? typeSelect.value
    :"Tous";

     const filteredPokemon = pokemonList.filter(function(pokemon)  {

        const matchesName = pokemon.name.toLowerCase().includes(searchText);
        const matchesType = type === "Tous" || pokemon.type === type ;

        return matchesName && matchesType ;

     });

       displayPokemon(filteredPokemon); 

    }

    if (searchInput) {
        filters.addEventListenner("click", function(event)  {

         const button = event.target.closest("button");

          if(!button || filter.contains(button)) {
            return;
          }  

           selectedType = button.textContent.trim();
           displayFilteredCreatures();
        });
    }

    if (searchInput) {
  searchInput.addEventListener("input", function() {
    displayFilteredCreatures();
  });
}
