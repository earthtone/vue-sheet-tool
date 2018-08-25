<template>
  <div :class="['menu-button', { 'change': change  }]" @click="click">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>   
  </div>
</template>

<script>
export default {
  name: 'w3-animated-menu-bar',
  props: {
    handler: Function 
  },
  data () {
    return {
      change: false 
    } 
  },
  methods: {
    click (ev) {
      this.change = !this.change

      if (!this.handler) return 
      this.handler(ev) 
    } 
  }
}
</script>

<style scoped>
.container {
    display: inline-block;
    cursor: pointer;
}

.bar {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
}

/* Rotate first bar */
.change .bar:nth-child(1) {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px) ;
    transform: rotate(-45deg) translate(-9px, 6px) ;
}

/* Fade out the second bar */
.change .bar:nth-child(2) {
    opacity: 0;
}

/* Rotate last bar */
.change .bar:nth-child(3) {
    -webkit-transform: rotate(45deg) translate(-8px, -8px) ;
    transform: rotate(45deg) translate(-8px, -8px) ;
}
</style>
