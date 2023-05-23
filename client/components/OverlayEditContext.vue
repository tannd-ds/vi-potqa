<template>
    <Overlay>
        <InputWithLabel
          :type="`input`"
          :id="`edit-context-name`"
          :label_name="`Name`"
          :placeholder="`Input Question`"
          v-model="current_input.edit_context['name']"
        >
            Hello
        </InputWithLabel>
        <InputWithLabel 
          :type="`textarea`"
          :id="`edit-context-content`"
          :label_name="`Paragraph Content`"
          :placeholder="`Input Paragraph Content`"
          v-model:model-value="current_input.edit_context['content']"
        />
        <button class="btn" @click="current_input.save_edit_context">Save Change</button>
    </Overlay>
</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput'
const current_input = useAnnotationInputStore()

</script>