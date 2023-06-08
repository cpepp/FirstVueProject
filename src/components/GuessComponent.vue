<script setup>
import { ref, onMounted } from 'vue';
import { getRandomPokemon, getSpecificPokemonInfo, findLocale } from '../services/PokeApiService';
import PokemonPage from './PokemonPage.vue';

const userGuess = ref('');
const randomPokemonName = ref('');
const guessMsg = ref('');
const randomPokemonInfo = ref();
const randomPokemonImage = ref();
const specificPokemonInfo = ref();
const currentScore = ref(0);
const highestScore = ref(0);
const failStreak = ref(0);
const showInfo = ref(false);
const learnMore = ref(false);

function reset() {
  userGuess.value = '';
  showInfo.value = false;
  guessMsg.value = '';
  failStreak.value = 0;
  learnMore.value = false;
}

function getRandomPokemonService() {
  reset();

  getRandomPokemon().then(response => {
    randomPokemonInfo.value = response;
    randomPokemonImage.value = response.sprites.other['official-artwork'].front_default;
    getSpecificPokemonInfo(response.id).then(res => {
      specificPokemonInfo.value = res;
      randomPokemonName.value = findLocale(res.names);
    })
  })
}

function submitUserGuess() {
  if (userGuess.value.toLowerCase() === randomPokemonName.value.toLowerCase()) {
    getRandomPokemonService();
    currentScore.value++;
    if (currentScore.value > highestScore.value) {
      highestScore.value = currentScore.value;
      localStorage.setItem('highestScore', highestScore.value)
    }
    reset();

  } else {
    guessMsg.value = "Streak ended";
    currentScore.value = 0;
    failStreak.value++; //If the user doesn't guess in 3 tries, move on.
    if (failStreak.value > 2) {
      guessMsg.value = "The Pokemon was " + randomPokemonName.value + "!";
      failStreak.value = 0;
      showInfo.value = true;
    }
  }
}

onMounted(() => {
  highestScore.value = localStorage.getItem('highestScore');

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

  <div id="failInfo">
    <button v-if="showInfo" @click="learnMore = !learnMore">
      Learn more about {{ randomPokemonName }}
    </button>
    <button v-if="showInfo" @click="getRandomPokemonService()">
      Try Again?
    </button>
    <div v-if="learnMore">
      <PokemonPage :randomPokemonInfo="randomPokemonInfo" :specificPokemonInfo="specificPokemonInfo" />
    </div>
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