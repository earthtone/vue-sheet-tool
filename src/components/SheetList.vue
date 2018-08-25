<template>
  <select v-model="worksheets">
    <option value="" >Select Worksheet</option>
    <option 
      v-for="sheet in worksheets" 
      :key="sheet.id" 
      :value="sheet.id"
      :selected="sheet.id == currentId"
      >
      {{sheet.name}}
    </option>
  </select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sheet-list',
  computed: {
    ...mapGetters(['getSheetNames', 'getCurrentSheet']),
    worksheets: {
      get () {
        return this.getSheetNames 
      },
      set (value) {
        if (!value) return
        this.$store.dispatch('setSheet', value)
      }
    },
    currentId () {
      return this.$store.currentSheetId 
    }
  }
}
</script>

<style scope>
ul {
  list-style: none;
  color: #fff;
  margin: 0.5;
}

li {
  text-align: left;
}

a:hover {
  text-decoration: underline;
}
</style>
