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
                        console.log(this.wordResult);
                        this.wordExist = true;
                        this.errorMessage = false;
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
        </div>
    </main>
</template>

<style></style>
