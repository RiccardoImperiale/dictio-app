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
      this.isDropdown = !this.isDropdown;
    },
    changeFont(font) {
      this.currentFont = font;
      document.getElementById('app').style.fontFamily = this.currentFont;
      document.querySelector('.input').style.fontFamily = this.currentFont;
    },
    capitalizeFont(fontUpperCase) {
      return fontUpperCase.charAt(0).toUpperCase() + fontUpperCase.slice(1);
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
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
        <div :class="isDarkMode && 'right'" class="toggle">
          <div :class="isDarkMode ? 'right' : 'left'" class="toggle_circle"></div>
        </div>
        <img v-if="isDarkMode" src="/img/moon.png" alt="">
        <img v-else src="/img/sun.png" alt="">
      </div>
    </div>
  </header>
</template>

<style scoped>
#app {
  font-family: serif;
}

.container {
  display: flex;
  align-items: center;
}
</style>
