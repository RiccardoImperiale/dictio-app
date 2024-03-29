<script>
// import { store } from '../store.js';

export default {
    name: 'AppFooter',
    props: {
        wordResult: Object,
        wordExist: Boolean
    }
}
</script>

<template>
    <footer>
        <div v-if="wordExist" class="container p-inline">
            <div class="divider">
                <div class="line"></div>
            </div>
            <div class="source">
                <h4>Source</h4>
                <h4 v-for="source in wordResult.sourceUrls"><a target="_blank" :href="source">{{ source }}</a>
                </h4>
            </div>
        </div>
    </footer>
</template>

<style></style>
