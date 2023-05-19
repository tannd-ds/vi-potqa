<template>
    <Overlay>
        <InputWithLabel
          :type="`input`"
          :id="`edit-context-name`"
          :label_name="`Name`"
          :placeholder="`Input Question`"
        >
            Hello
        </InputWithLabel>
        <InputWithLabel 
          :type="`textarea`"
          :id="`edit-context-content`"
          :label_name="`Paragraph Content`"
          :placeholder="`Input Paragraph Content`"
          :v-model:model-value="current_input.contexts"
        />
    </Overlay>
</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput';

const props = defineProps({
    context_index: Number,
})

const current_input = useAnnotationInputStore()

</script>

<style scoped>

</style>