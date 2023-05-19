<template>
    <div class="container">
        <label 
            class="disable-select" 
            :for="id"
        >
            <slot name="label-name">{{label_name}}</slot>
        </label>
        <component
            :is="type" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :id="id" 
            :placeholder="placeholder" 
            :rows="type == `textarea` ? 10 : 1"
            class="glass-bg"
            spellcheck="false" 
            autocomplete="off" 
            aria-autocomplete="none"
        ></component>
    </div>
</template>

<script setup>
    defineProps({
        modelValue: String,
        type: String,
        id: String,
        placeholder: String,
        label_name: String,

    })
    defineEmits(['update:modelValue'])
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column; 
    gap: 0.5em;
}

.container input {
    height: 2vh;
}

.container input:focus, textarea:focus {
    outline: none;
}


</style>