import axios from 'axios'

const url = "https://pokeapi.co/api/v2"
const maxDexNumber = 151; //Maximum PokeDex number to go to

export async function getRandomPokemon() {
    const randomDexNumber = Math.floor(Math.random() * maxDexNumber) + 1;

    const response = await axios.get(url + "/pokemon/" + randomDexNumber);
    return response.data;
}

