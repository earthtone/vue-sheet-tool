<template>
  <div id="app">
    <NavigationMenu />
    <main v-if="currentSheet">
    <h1>{{ currentSheet }}</h1> 
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationMenu from './components/NavigationMenu.vue'

export default {
  name: 'app',
  components: {
     NavigationMenu 
  },
  computed: {
    ...mapState(['currentSheet']),
  }
}
</script>

<style>
html {
  font: 18px / 1.2;
  box-sizing: border-box;
}

html *, 
html *:before, 
html *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-columns: 250px 1fr;
}
</style>
