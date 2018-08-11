<template>
  <ul>
    <li v-for="(sheet, index) in getSheetNames" :key="index">
      <a @click="(e) => setSheet(sheet)">{{ sheet.name }}</a>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'sheet-list',
  computed: {
    ...mapGetters(['getSheetNames']) 
  },
  methods: {
    ...mapMutations(['setSheet'])
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
