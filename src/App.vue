<template>
  <div id="app" :class="{'show-nav': getNavState}">
    <transition name="slide">
      <NavigationMenu v-show="getNavState" />
    </transition>
    <main class="app-container">
      <app-loader v-if="getLoadingState">
        <h5 class="loading-text">{{ getLoadingText }}</h5>
      </app-loader>
      <app-alert :message="'No rows found'" />
      <app-menu-button class="menu-btn" :handler="toggleMenu"/>
      <FilterableTable :current="getCurrentSheet"/>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterableTable from '@/components/FilterableTable.vue'
import NavigationMenu from '@/components/NavigationMenu.vue'
import AppAlert from '@/components/w3-alert.vue'
import AppMenuButton from '@/components/w3-animated-menu-button.vue'
import AppLoader from '@/components/w3-loader.vue'

export default {
  name: 'app',
  components: {
    FilterableTable,
    NavigationMenu ,
    AppAlert,
    AppMenuButton,
    AppLoader
  },
  computed: {
    ...mapGetters([
      'getCurrentSheet', 
      'getAlertState', 
      'getNavState', 
      'getLoadingState',
      'getLoadingText'
    ]),
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('toggleMenu') 
    } 
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
}

#app.show-nav {
  grid-template-columns: 250px 1fr;
}

.slide-enter-active, .slide-leave-active {
  transition: transform .5s;
}
.slide-enter{
  transform: translateX(-250px);
}

.slide-leave-to {
  transform: translateX(-1500px);
}

.menu-btn {
  margin: 1rem;
}

.loading-text {
  margin: 0.5rem auto;
  padding: 0.5rem;
  color: #000;
}
</style>
