<script setup>
import { defineProps, onMounted, ref } from 'vue'
import MovesComponent from './MovesComponent.vue';
import { findLocale, findTypeName } from '../services/PokeApiService';

const props = defineProps({
    randomPokemonInfo: Object,
    specificPokemonInfo: Object
})

const type = ref('')

onMounted(() => {
    findTypeName(props.randomPokemonInfo.types[0].type.name).then((tName) => { type.value = tName });
    if (props.randomPokemonInfo.types.length == 2) {
        findTypeName(props.randomPokemonInfo.types[1].type.name).then((tName) => { type.value += '/' + tName });
    }
})

</script>

<template>
    <div id="pokemonInfo">
        <span>
            <table>
            <tr>
                <td>
                    Name:
                </td>
                <td>
                    {{ findLocale(specificPokemonInfo.names) }}
                </td>
            </tr>
            <tr>
                <td>
                    Dex Number:
                </td>
                <td>
                    {{ randomPokemonInfo.id }}
                </td>
            </tr>
            <tr>
                <td> Type: </td>
                <td> {{ type }}</td>
            </tr>
        </table>
        </span>
        <MovesComponent :movesList="randomPokemonInfo.moves" />
    </div>
    
</template>

<style>
table,
tr,
td {
    border: 1px;
}

tr:nth-child(even) {
    background-color: rgba(235, 235, 235, 0.64);
    color: #282828;
}

#pokemonInfo {
    justify-content: center;
    align-items:baseline;
    display: flex;
}
</style>