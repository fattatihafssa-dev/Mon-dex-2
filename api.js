const BASE_URL = "https://pokeapi.co/api/v2";


export async function getPokemonList() {
    const url = `${BASE_URL}/pokemon?limit=20&offset=0.`;
    const response = await fetch(url); 

//CONVERT THE RESPONSE INTO JS DATA /////
const data = await response.json(); 
return data;
}
//handle api errors ///the api may not response or return an error/////
if(!response.ok) {
    throw new Error("Failed to fetch Pokémon");

}
export async function getPokemonList(){
    try {
        const response = await fetch(url);
        const data =   await response.json();
        return data ;
    } catch (error){
        console.error(error);
        throw error;
    }
}