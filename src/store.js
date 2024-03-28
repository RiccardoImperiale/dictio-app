import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    searchText: '',
    wordResult: [],
    wordExist: false,
    errorMessage: false,

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
})