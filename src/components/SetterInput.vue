<template>
  <form @submit="handleSubmit" class="nav-form">
    <input type="text" placeholder="Input Workbook Key" />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'setter-input',
  computed: {
    ...mapGetters(['getKey']) 
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      var key = e.target.querySelector('input').value
      this.setKey(key)
    },
    setKey (key = '') {
      key = key || process.env.VUE_APP_UTS_KEY
      this.$store.commit('setKey', { key })
    }
  },
  created () {
    this.setKey() 
  }
}
</script>

<style>
.nav-form > input {
  background-color: #333;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff !important;
}

.nav-form input:focus {
  outline: 0;
  transform: scale(1.1);
}
</style>
