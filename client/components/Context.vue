<template>
        <!-- @input="$emit('update:modelValue', $event.target.value)" -->
    <div class="glass-bg">
        <div class="context-name-bar">
            <h4 class="disable-select">{{ p_name }}</h4>
            <div class="context-name-bar-btn">
                <button @click="edit_para(p)" title="Edit Paragraph"><img src="@/assets/images/pen-solid.svg"></button>
                <button class="remove-btn" @click="current_input.remove_context(p_index)" title="Remove Paragraph"><img src="@/assets/images/xmark-solid.svg"></button>
            </div>
        </div>
        <slot>Text</slot>
    </div>
</template>

<script setup>
    import { useAnnotationInputStore } from '~/stores/annotationInput'; 
    const current_input = useAnnotationInputStore()
    defineProps({
        p_name: String, 
        p_index: Number,
    })
</script>

<style scoped>
.context-name-bar {
  display: flex;
  justify-content:space-between;
  align-items: center;
}

.context-name-bar h4 {
  font-weight: 700;
  font-size: 1.2em;
  color: var(--primary-accent-color)
}

.context-name-bar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.context-name-bar-btn button {
  width: 2rem;
  border: none;
  background-color: transparent;
  align-items: center;
}

.context-name-bar-btn button img {
  width: 50%;
  opacity: 20%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.context-name-bar-btn button img:hover {
  opacity: 100%;
  transition: all 0.3s ease;
}
</style>
