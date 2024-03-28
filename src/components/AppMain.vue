<script>

import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store,
            isPlaying: false
        }
    },
    methods: {
        playAudio() {
            this.isPlaying = true;
            const audio = this.$refs.audio;
            // Check if audio is paused, if so, play it
            if (audio.paused) {
                audio.play();

            } else {
                // If audio is already playing, pause and reset to the beginning
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }
    }
}
</script>

<template>
    <main>
        <div class="container">
            <input @keyup="store.cleanError" @keyup.enter="store.search(store.searchText)" v-model="store.searchText"
                :class="store.errorMessage ? 'border_error' : 'border_default'" class="input" type="text"
                placeholder="Search for any word...">
            <span class="error_message" v-show="store.errorMessage">Word not found...</span>
        </div>
        <!-- results -->
        <div v-if="store.wordExist" class="container p-inline">
            <div class="word">
                <div>
                    <h1>{{ store.wordResult.word }}</h1>
                    <h2>{{ store.wordResult.phonetic }}</h2>
                </div>
                <div @click="playAudio" class="audio_btn" v-if="store.wordResult.phonetics.length > 0">
                    <i v-if="!isPlaying" class="fa-solid fa-play"></i>
                    <i v-else class="fa-solid fa-volume-high"></i>
                    <audio ref="audio" :src="store.wordResult.phonetics[0].audio || store.wordResult.phonetics[1].audio"
                        @ended="isPlaying = false"></audio>
                </div>
            </div>
            <div class="divider">
                <h3>{{ store.wordResult.meanings[0].partOfSpeech }}</h3>
                <div class="line"></div>
            </div>
            <div class="meaning">
                <h3>Meaning</h3>
                <ul>
                    <li v-for="definition in store.wordResult.meanings[0].definitions">
                        <span>{{ definition.definition }}</span>
                    </li>
                </ul>
            </div>
            <div v-show="store.wordResult.meanings[0].synonyms.length > 0" class="synonyms">
                <h3>Synonyms</h3>
                <h3 v-for="synonym in store.wordResult.meanings[0].synonyms">{{ synonym }}</h3>
            </div>

            <template v-if="store.wordResult.meanings.length > 1">
                <div class="divider">
                    <h3>{{ store.wordResult.meanings[1].partOfSpeech }}</h3>
                    <div class="line"></div>
                </div>
                <div class="meaning">
                    <h3>Meaning</h3>
                    <ul>
                        <li v-for="definition in store.wordResult.meanings[1].definitions">
                            <span>
                                {{ definition.definition }}
                            </span>
                            <h4 v-show="definition.example" class="example">
                                "{{ definition.example }}"
                            </h4>
                        </li>
                    </ul>
                </div>
                <div v-show="store.wordResult.meanings[1].synonyms.length > 0" class="synonyms">
                    <h3>Synonyms</h3>
                    <h3 v-for="synonym in store.wordResult.meanings[1].synonyms">{{ synonym }}</h3>
                </div>
            </template>
        </div>
    </main>
</template>

<style></style>
