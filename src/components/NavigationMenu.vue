<template>
  <nav>
    <img alt="Vue logo" src="@/assets/logo.png">
    <SetterInput />
    <SheetList />
  </nav>
</template>

<script>
import SetterInput from './SetterInput.vue'
import SheetList from './SheetList'

export default {
  name: 'navigation-menu', 
  components: {
    SetterInput,
    SheetList
  }
}
</script>

<style scope>
nav {
  min-height: 100vh;
  background-color: #333;
}

img {
  max-width: 150px; 
}
</style>
