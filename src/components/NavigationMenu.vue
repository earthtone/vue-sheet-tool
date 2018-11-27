<template>
  <nav class="navigation-menu">
    <SetterInput />
    <SheetList />
    <HeaderList />
  </nav>
</template>

<script>
import SetterInput from '@/components/SetterInput.vue'
import SheetList from '@/components/SheetList'
import HeaderList from '@/components/HeaderList'

export default {
  name: 'navigation-menu', 
  components: {
    SetterInput,
    SheetList,
    HeaderList
  }
}
</script>

<style>
nav {
  min-height: 100vh;
  background-color: #333;
}

img {
  max-width: 150px; 
}
</style>
