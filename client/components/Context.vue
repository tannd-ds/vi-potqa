<template>
    <div class="glass-bg">
        <div class="context-name-bar">
            <h4 class="disable-select">{{ p_name }}</h4>
            <div class="context-name-bar-btn">
                <button 
                  class="icon-btn"
                  @click="general_store.is_show_overlay=true" 
                  title="Edit Paragraph"
                >
                  <Icon name="fa6-solid:pen" color="white" size="1em"/>
                </button>
                <button 
                  class="icon-btn" 
                  @click="current_input.remove_context(p_index)" 
                  title="Remove Paragraph"
                >
                  <Icon name="fa6-solid:xmark" color="white" size="1.4em"/>
                </button>
            </div>
        </div>
        <slot>Text</slot>
    </div>
</template>

<script setup>
    import { useAnnotationInputStore } from '~/stores/annotationInput'
    import { useGeneralStore } from '~/stores/generalStore'
    const current_input = useAnnotationInputStore()
    const general_store = useGeneralStore()
    defineProps({
        p_name: String, 
        p_index: Number,
    })

    function edit_context() {
      current_input.edit_p_index = p_index
      general_store.is_show_overlay = true
    }

</script>

<style scoped>
.context-name-bar {
  margin-bottom: 1em;
  display: flex;
  justify-content:space-between;
  align-items: flex-start;
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

.glass-bg {
  margin-bottom: 1em;
}

</style>
