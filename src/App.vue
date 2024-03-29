<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  data() {
    return {
      wordResult: [],
      wordExist: false
    }
  },
  methods: {
    wordData(data) {
      this.wordResult = data.wordResult;
      this.wordExist = data.wordExist;
    }
  }
}
</script>

<template>
  <AppHeader />
  <AppMain @wordData="wordData" />
  <AppFooter :wordResult="wordResult" :wordExist="wordExist" />
</template>

<style></style>
