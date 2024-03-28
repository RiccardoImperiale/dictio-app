<script>
import axios from 'axios';

export default {
    name: 'AppMain',
    data() {
        return {
            searchText: '',
            wordResult: [],
            wordExist: false,
            errorMessage: false
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
                        console.log(this.wordResult);
                    })
                    .catch(err => {
                        console.error('Error fetching word:', err.name);
                        this.wordExist = false;
                        this.errorMessage = true;
                    });
            }
        },
        cleanError() {
            this.searchText == '' && (this.errorMessage = false);
        }
    }
}
</script>

<template>
    <main>
        <div class="container">
            <input @keyup="cleanError" @keyup.enter="search(searchText)" v-model="searchText"
                :class="errorMessage ? 'border_error' : 'border_default'" class="input" type="text"
                placeholder="Search for any word...">
            <span class="error_message" v-show="errorMessage">Word not found...</span>
        </div>
        <div v-if="wordExist" class="container p-inline">
            <div class="word">
                <div>
                    <h1>{{ wordResult.word }}</h1>
                    <h2>{{ wordResult.phonetic }}</h2>
                </div>
                <div class="audio_btn">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>

            <div class="divider">
                <!-- noun -->
                <h3>{{ wordResult.meanings[0].partOfSpeech }}</h3>
                <div class="line"></div>
            </div>

            <div class="meaning">
                <h3>Meaning</h3>
                <ul>
                    <li v-for="definition in wordResult.meanings[0].definitions">
                        <span>
                            {{ definition.definition }}
                        </span>
                    </li>
                </ul>
            </div>

            <div class="synonyms">
                <h3>Synonyms</h3>
                <h3 v-for="synonym in wordResult.meanings[0].synonyms">{{ synonym }}</h3>
            </div>


            <!-- <div class="divider">
                <h3>{{ wordResult.meanings[0].partOfSpeech }}</h3>
                <div class="line"></div>
            </div>

            <div class="meaning">
                <h3>Meaning</h3>
                <ul>
                    <li v-for="definition in wordResult.meanings[0].definitions">
                        <span>
                            {{ definition.definition }}
                        </span>
                    </li>
                </ul>
            </div> -->


        </div>
    </main>
</template>

<style></style>
