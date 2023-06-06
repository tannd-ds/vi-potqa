<template>
  <NuxtPage />
</template>

<script setup>
  import { useAnnotationInputStore } from './stores/annotationInput';
  const current_input = useAnnotationInputStore()
</script>
