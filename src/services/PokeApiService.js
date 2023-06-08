import axios from 'axios'

const url = 'https://pokeapi.co/api/v2'
const maxDexNumber = 493 //Maximum PokeDex number to go to
const locale = 'en'

//Find Locale name in array
export function findLocale(names) {
  for (var n in names) {
    if (names[n].language.name.localeCompare(locale) == 0) {
      return names[n].name
    }
  }
}

export async function getRandomPokemon() {
  const randomDexNumber = Math.floor(Math.random() * maxDexNumber) + 1

  const response = await axios.get(url + '/pokemon/' + randomDexNumber)
  return response.data
}

export async function getSpecificPokemonInfo(id) {
  const response = await axios.get(url + '/pokemon-species/' + id)
  return response.data
}

export async function getGeneration(id) {
  const response = await axios.get(url + '/generation/' + id)
  return response.data
}

export async function getEvolutionChain(id) {
  const response = await axios.get(url + '/evolution-chain/' + id)
  return response.data
}

export async function getType(id) {
  const response = await axios.get(url + '/type/' + id)
  return response.data
}

export async function findTypeName(name) {
  return getType(name).then((res) => {
     return findLocale(res.names)
  })
}