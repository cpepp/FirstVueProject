<script setup>
import { defineProps, onMounted, ref } from 'vue'

defineProps({
    movesList: Object
})

const selectedVersion = ref('')

onMounted(() => {
 //Will probably need to create a new array on mount and pass that instead for the movesList

})

function getMovesList(version) {
    //will only get moves for that version
}

function onVersionChange() {
 // when the version changes re-render and pass new moveslist
}
</script>

<template>
    <div>
        <h3> Learnset </h3>
        <div id="versionSelect">
            <p>Game Version</p>
            <select v-model="selectedVersion">
                <option selected> Red/Blue </option>
            </select>
        </div>
        <ul v-if="movesList.length">
            <!-- Rendering content from array using v-for directive -->
            <li v-for="move of movesList" :key="move.name"> {{ move.move.name }} </li>
        </ul>
    </div>
</template>

<style>
#versionSelect {
    display: flex;
}
</style>