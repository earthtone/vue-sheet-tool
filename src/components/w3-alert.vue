<template>
  <transition name="fade">
    <div v-show="getAlertState" class="alert">
      <span 
        class="alert-closebtn" 
        @click="hideAlert">&times;</span>
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'w3-alert',
  props: {
    message: String,
  }, 
  computed: {
    ...mapGetters(['getAlertState']) 
  },
  methods: {
    ...mapActions(['hideAlert'])
  }
}
</script>

<style scoped>
:root {
  --danger: #f44336;
  --success: #4CAF50;
  --info: #2196F3;
  --warning: #ff9800;
}

.alert {
  padding: 1rem;
  background-color: var(--danger);
  color: white;
  margin-bottom: 1rem;
}

.alert-closebtn {
  margin-left: 1rem;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
