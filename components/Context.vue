<template>
    <div class="glass-bg">
        <div class="context-name-bar">
            <h4 class="disable-select">{{ context_name }}</h4>
            <div class="context-name-bar-btn">
                <button 
                  class="icon-btn"
                  @click="current_input.show_edit_context(context_index)" 
                  title="Edit Paragraph"
                >
                  <Icon name="material-symbols:edit" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]" size="1.5em"/>
                </button>
                <button 
                  class="icon-btn" 
                  @click="current_input.remove_context(context_index)" 
                  title="Remove Paragraph"
                >
                  <Icon name="material-symbols:close-rounded" :color="COLOR_MODE_ICON_COLOR[$colorMode.value]" size="1.5em"/>
                </button>
            </div>
        </div>
        <slot>Text</slot>
    </div>
</template>

<script setup>
    import { useAnnotationInputStore } from '~/stores/annotationInput'
    const current_input = useAnnotationInputStore()
    defineProps({
        context_name: String, 
        context_index: Number,
    })

const COLOR_MODE_ICON_COLOR = {
    'dark': "hsl(var(--white-base-hsl-triplet))",
    'light': "hsl(var(--black-base-hsl-triplet), 0.3)",
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
}
.dark-mode .context-name-bar h4 {
  color: hsl(var(--white-base-hsl-triplet))
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
