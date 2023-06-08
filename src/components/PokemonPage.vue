<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { findLocale, findTypeName } from '../services/PokeApiService';

const props = defineProps({
    randomPokemonInfo: Object,
    specificPokemonInfo: Object
})

const type = ref('')

onMounted(() => {
    findTypeName(props.randomPokemonInfo.types[0].type.name).then((tName) => { type.value = tName });
    if (props.randomPokemonInfo.types.length == 2) {
        findTypeName(props.randomPokemonInfo.types[1].type.name).then((tName) => {type.value += '/'+tName});
    }
})

</script>

<template>
    <div>
        Name: {{ findLocale(specificPokemonInfo.names) }}
    </div>
    <div>
        Dex Number: {{ randomPokemonInfo.id }}
    </div>
    <div>
        Type: {{ type }}
    </div>
</template>

<style></style>