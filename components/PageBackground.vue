<template>
  <div class="bg">
    <!-- <img class="bg-gradient grad-1" src="../assets/images/Ellipse green-blue.png" /> -->
    <!-- <img class="bg-gradient grad-2" src="../assets/images/Ellipse pink.png" /> -->

    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bg {
  width: 100%;
  position: absolute;
  background-color: hsl(var(--white-base-hsl-triplet));
  z-index: -2;
}
.dark-mode .bg {
  background-color: hsl(var(--black-base-hsl-triplet));
}
.bg-gradient {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  animation: fade-in 5s;
}

.bg-gradient.grad-1 {
  width: 100%;
  height: auto;
  top: -70vw;
  left: -40vw;
}

.bg-gradient.grad-2 {
  width: 90%;
  bottom: -80vh;
  right: -45vw;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>