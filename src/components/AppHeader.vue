<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isDropdown: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdown = !this.isDropdown
    }
  },
}
</script>

<template>
  <header>
    <div class="container">
      <img width="40px" src="/img/logo.png" alt="">
      <div class="band"></div>
      <div class="font_select">
        <div class="font">Serif</div>
        <i @click="toggleDropdown" :class="isDropdown ? 'rotate0' : 'rotate90'" class="fa-solid fa-chevron-down"></i>
        <div :class="isDropdown ? 'slide_down' : 'slide_up'" class="font_dropdown">
          <h4>Sansserif</h4>
          <h4>Sans</h4>
          <h4>Sans</h4>
        </div>
      </div>

      <div class="darkmode_toggle">
        <div class="toggle"></div>
        <img src="/img/moon.png" alt="">
      </div>
    </div>
  </header>
</template>

<style></style>
