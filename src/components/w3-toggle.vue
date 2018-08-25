<template>
  <form class="toggle-container" @change="change">
    <label class="switch"> 
      <input type="checkbox" :checked="checked"/>
      <span class="slider" :class="{round: isRound}"></span>
    </label>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'w3-toggle',
  props: {
    isRound: {
      type: Boolean,
      default: true
    }, 
    checked: {
      type: Boolean,
      default: false 
    },
    changeHandler: Function
  },
  methods: {
    change (ev) {
      if (!this.changeHandler) return
      this.changeHandler(ev)
    } 
  }
}
</script>

<style scoped>
:root {
  --primary: #3498db;
  --bg: #ccc;
}

.toggle-container {
  display: flex;
  justify-items: center;
}

.toggle-container > * {
  margin: 0 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1rem;
}

.switch input {
  display:none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 0.9rem;
  width: 0.9rem;
  left: 0.1rem;
  bottom: 0.1rem;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} 
</style>
