<template>
    <transition-group tag="ul" name="list">
        <li 
            v-for="(p, p_index) in current_input.contexts" 
            :key="p.name"
        >
            <Context
                :context_name="p.name"
                :context_index="p_index"
            >
                <span class="s-confirmed" v-for="(s, s_index) in p.content">
                  <span class="word s-index">
                    <label :for="`${p_index}-${s_index}`" class="disable-select">[{{ s_index }}]</label>
                  </span>
                  <span class="word" v-for="w in sentence_to_word(s)">
                    <input 
                    type="checkbox" 
                    name="optional" 
                    :id="`${p_index}-${s_index}`" 
                    :value="`${p_index}-${s_index}`"
                    v-model="current_input.checked_ids"
                    required hidden
                    >
                    <label :for="`${p_index}-${s_index}`" class="disable-select">{{ w }}</label>
                  </span>
                </span>
            </Context>
        </li>
    </transition-group>
</template>

<script setup>

import { useAnnotationInputStore } from '~/stores/annotationInput';
const current_input = useAnnotationInputStore()

function sentence_to_word(sentence) {
    return sentence.split(" ")
}

</script>

<style scoped>

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
  width: 45%; /* Prevent Context Item from changing width during leaving */
}

.list-enter-from, 
.list-leave-to {
  opacity: 0;
}

.list-enter-from {
  transform: translateX(-50px);
}

ul li {
  list-style-type: none;
}


</style>