<template>
  <div class="app-header-list">
    <app-toggle 
      class="toggle"
      v-for="header in getAllHeaders" 
      :key="header.index"
      :checked="header.selected"
      :changeHandler="() => bugger(header.index)">
    {{header.name}}
     </app-toggle>
  </div>
</template>

<script>
import AppToggle from '@/components/w3-toggle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app-header-list',
  components: {
    AppToggle 
  },
  computed: {
    ...mapGetters(['getAllHeaders']) 
  },
  methods: {
    bugger (index) {
      this.$store.dispatch('updateHeaders', index)
    } 
  }
}
</script>

<style scoped>
.app-header-list {
  margin: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.toggle {
  color: #fff; 
}  
</style>
