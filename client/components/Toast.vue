<template>
    <Transition name="slide-fade">
        <div class="toast-wrapper" v-if="show">
          <div  class="content-wrapper">
            <Icon :name="toast_icon_src[type]" size="3em"/>
            <div class="text-container">
              <h3>
                <slot name="title">
                  Sucess
                </slot>
              </h3>
            
              <p>
                <slot name="content">
                  Run successfully failed.
                </slot>
              </p>
            </div>
          </div>
          <div class="progress-bar active"></div>
        </div>
    </Transition>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  type: String,
})

const toast_color = {
  'error': '#CC3636',
  'success': '#03C988',
  'warning': '#F7C04A',
}

const progress_color = {
  'warning': 'hsl(134, 62%, 92%, 0.7)',
  'error': 'hsl(134, 62%, 92%, 0.7)',
  'success': 'hsl(134, 62%, 92%, 0.7)',
}

const toast_icon_src = ref({
  'error': "material-symbols:error-outline-rounded",
  'success': "material-symbols:check-circle-outline-rounded",
  'warning': "material-symbols:check-circle-outline-rounded",
})

</script>


<style scoped>

.slide-fade-enter-active {
  transform: translateX(0%);
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-wrapper {
  position: absolute;
  top: 2em;
  right: 2em;
  background-color: v-bind(toast_color[type]);
  border-radius: 0.5em;
  overflow: hidden;
  z-index: 999;
  cursor: pointer;
}

.content-wrapper {
  padding: 1em 1.5em;
  display: flex;
  gap: 1em;
}

img {
  width: 2em;
}
.text-container {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.text-container h3 {
  font-weight: 700;
}

.text-container p {
  font-weight: 400;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
}

.progress-bar::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: v-bind(progress_color[type]);
}

.progress-bar.active:before {
  animation: progress 3s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}

</style>