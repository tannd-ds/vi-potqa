<template>
  <div class="bg">
    <img class="bg-gradient grad-1" src="../assets/images/Ellipse green-blue.png" />
    <img class="bg-gradient grad-2" src="../assets/images/Ellipse pink.png" />

    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bg {
  width: 100%;
  background-color: black;
  position: absolute;
  z-index: -2;
}
.bg-gradient {
  position: absolute;
  z-index: -1;
  pointer-events: none;
}

.bg-gradient.grad-1 {
  width: 100%;
  height: auto;
  top: -120vh;
  left: -40vw;
}

.bg-gradient.grad-2 {
  width: 90%;
  bottom: -80vh;
  right: -45vw;
}
</style>