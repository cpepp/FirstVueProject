<script setup>
import { ref, onMounted } from 'vue';
import { getRandomPokemon } from '../services/PokeApiService';

const userGuess = ref('');
const randomPokemon = ref('');
const guessMsg = ref('');
const randomPokemonInfo = ref();
const randomPokemonImage = ref();
const currentScore = ref(0);
const highestScore = ref(0);

function getRandomPokemonService() {
  getRandomPokemon().then(response => {
    console.log(response)
    randomPokemonInfo.value = response;
    randomPokemon.value = response.name;
    randomPokemonImage.value = response.sprites.other['official-artwork'].front_default;
  })
}

function submitUserGuess() {
  if (userGuess.value.toLowerCase() === randomPokemon.value.toLowerCase()) {
    getRandomPokemonService();
    currentScore.value++;
    if(currentScore.value > highestScore.value){
      highestScore.value = currentScore.value;
    }
    userGuess.value = '';
    
  } else {
    guessMsg.value = "Streak ended";
    currentScore.value = 0;
  }
}

onMounted(() => {
  getRandomPokemonService();
})

</script>

<template>
  <div id="guessInfo">
    <img v-if="randomPokemonInfo" v-bind:src="randomPokemonImage" />
    <form @submit.prevent="submitUserGuess">
      <input id="userGuessInput" v-model="userGuess">
    </form>
    <p>Current streak: {{ currentScore }}</p>
    <p>Your longest streak is: {{ highestScore }}</p>
    <p>{{ guessMsg }}</p>
  </div>
</template>

<style scoped>

  #guessInfo {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 1.2rem;
  }

  #userGuessInput {
    width: 100%;
    border: 10px lightseagreen;
    border-radius: 3px;
    width: 225px;
    font-size: 18pt;
  }

</style>