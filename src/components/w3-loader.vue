<template>
  <div class="w3-loader">
    <div class="loader"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'w3-loader' 
  }
</script>

<style scoped>
:root {
  --primary: #3498db;
  --bg: #f3f3f3;
}
.w3-loader {
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, .8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 16px solid var(--bg);
  border-top: 16px solid var(--primary);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
