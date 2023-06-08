<script setup>
import PokemonGuessHeader from './components/PokemonGuessHeader.vue';
import GuessComponent from './components/GuessComponent.vue'

</script>

<template>
  <header>
    <div class="wrapper">
      <PokemonGuessHeader />
    </div>
    <div class="wrapper">
      <GuessComponent />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

header .wrapper {
  display: flex;
  align-items: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
