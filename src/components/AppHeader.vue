<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isDropdown: false,
      currentFont: 'serif',
      fonts: ['serif', 'Arial', 'Courier'],
      isDarkMode: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdown = !this.isDropdown
    },
    changeFont(font) {
      this.currentFont = font;
      document.getElementById('app').style.fontFamily = this.currentFont;
      document.getElementsByClassName('input').style.fontFamily = this.currentFont;
    },
    capitalizeFont(fontUpperCase) {
      return fontUpperCase.charAt(0).toUpperCase() + fontUpperCase.slice(1)
    },
    toggleDarkMode() {
      if (this.isDarkMode) {
        this.isDarkMode = false;
        document.querySelector('.toggle_circle').style.left = '3px';
        document.querySelector('.toggle_circle').style.right = 'unset';
      } else {
        this.isDarkMode = true;
        document.querySelector('.toggle_circle').style.left = 'unset';
        document.querySelector('.toggle_circle').style.right = '3px';
      }
    }
  },
  created() {
    document.getElementById('app').style.fontFamily = this.currentFont;
  },
}
</script>

<template>
  <header>
    <div class="container p-inline">
      <img width="40px" src="/img/logo.png" alt="">
      <div class="band"></div>
      <div @click="toggleDropdown" class="font_select">
        <div class="font">{{ capitalizeFont(currentFont) }}</div>
        <i :class="isDropdown ? 'rotate0' : 'rotate90'" class="fa-solid fa-chevron-down"></i>
        <div :class="isDropdown ? 'slide_down' : 'slide_up'" class="font_dropdown">
          <h4 @click="changeFont(font)" v-for="font in fonts" :key="font"
            :class="[font == 'serif' && 'font-serif', font == 'Arial' && 'font-arial', font == 'Courier' && 'font-courier']">
            {{ capitalizeFont(font) }}</h4>
        </div>
      </div>
      <div @click="toggleDarkMode" class="darkmode_toggle">
        <div class="toggle">
          <div class="toggle_circle"></div>
        </div>
        <img src="/img/moon.png" alt="">
      </div>
    </div>
  </header>
</template>

<style scoped>
#app {
  font-family: Courier;

}

.container {
  display: flex;
  align-items: center;
}
</style>
