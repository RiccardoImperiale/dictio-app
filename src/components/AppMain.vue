<script>
import axios from 'axios';

// import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            // store,
            isPlaying: false,
            searchText: '',
            wordResult: [],
            wordExist: false,
            errorMessage: false,
        }
    },
    methods: {
        search(inputWord) {
            if (inputWord !== '') {
                axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
                    .then(res => {
                        this.wordResult = res.data[0];
                        this.searchText = '';
                        this.wordExist = true;
                        this.errorMessage = false;
                        this.emitData();
                    })
                    .catch(err => {
                        console.error('Error fetching word:', err.name);
                        this.wordExist = false;
                        this.errorMessage = true;
                        this.emitData();
                    });
            }
        },
        cleanError() {
            this.searchText == '' && (this.errorMessage = false);
        },
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
        },
        emitData() {
            this.$emit('wordData', { wordResult: this.wordResult, wordExist: this.wordExist });
        }
    }
}
</script>

<template>
    <main>
        <div class="container">
            <div class="input_container">
                <input @keyup="cleanError" @keyup.enter="search(searchText)" v-model="searchText"
                    :class="errorMessage ? 'border_error' : 'border_default'" class="input" type="text"
                    placeholder="Search for any word...">
                <i @click="search(searchText)" class="fa-solid fa-magnifying-glass"></i>
            </div>
            <span class="error_message" v-show="errorMessage">Word not found...</span>
        </div>
        <!-- results -->
        <div v-if="wordExist" class="container p-inline">
            <div class="word">
                <div>
                    <h1>{{ wordResult.word }}</h1>
                    <h2>{{ wordResult.phonetic }}</h2>
                </div>
                <div @click="playAudio" class="audio_btn"
                    v-if="wordResult.phonetics.length > 0 && wordResult.phonetics[0].audio !== ''">
                    <i v-if="!isPlaying" class="fa-solid fa-play"></i>
                    <i v-else class="fa-solid fa-volume-high"></i>
                    <audio ref="audio" :src="wordResult.phonetics[0].audio || wordResult.phonetics[1].audio"
                        @ended="isPlaying = false"></audio>
                </div>
            </div>
            <div class="divider">
                <h3>{{ wordResult.meanings[0].partOfSpeech }}</h3>
                <div class="line"></div>
            </div>
            <div class="meaning">
                <h3>Meaning</h3>
                <ul>
                    <li v-for="definition in wordResult.meanings[0].definitions">
                        <span>{{ definition.definition }}</span>
                    </li>
                </ul>
            </div>
            <div v-show="wordResult.meanings[0].synonyms.length > 0" class="synonyms">
                <h3>Synonyms</h3>
                <div class="list">
                    <h3 @click="search(synonym)" v-for="synonym in wordResult.meanings[0].synonyms">{{
                    synonym }}</h3>
                </div>
            </div>

            <template v-if="wordResult.meanings.length > 1">
                <div class="divider">
                    <h3>{{ wordResult.meanings[1].partOfSpeech }}</h3>
                    <div class="line"></div>
                </div>
                <div class="meaning">
                    <h3>Meaning</h3>
                    <ul>
                        <li v-for="definition in wordResult.meanings[1].definitions">
                            <span>
                                {{ definition.definition }}
                            </span>
                            <h4 v-show="definition.example" class="example">
                                "{{ definition.example }}"
                            </h4>
                        </li>
                    </ul>
                </div>
                <div v-show="wordResult.meanings[1].synonyms.length > 0" class="synonyms">
                    <h3>Synonyms</h3>
                    <div class="list">
                        <h3 @click="search(synonym)" v-for="synonym in wordResult.meanings[1].synonyms">{{
                    synonym }}</h3>
                    </div>
                </div>
            </template>
        </div>
    </main>
</template>

<style></style>
