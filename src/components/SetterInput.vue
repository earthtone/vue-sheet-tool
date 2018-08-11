<template>
  <form @submit="handleSubmit">
    <input type="text" placeholder="Input Sheet Key" />
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
      // DBZ FIGHTS: 1s7SS4Mi7x6MgQLUuFQ4NWH-PpUK4fmEteb9mEQjBnjk

      e.preventDefault()
      var inputValue = e.target.querySelector('input').value || '1s7SS4Mi7x6MgQLUuFQ4NWH-PpUK4fmEteb9mEQjBnjk'
      this.$store.commit('setKey', { key: inputValue })
    }
  }
}
</script>

<style scope>
input {
  background-color: #333;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff !important;
}
</style>
