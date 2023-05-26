<template>
    <button class="btn red" 
      v-if="current_input.contexts.length > 0"
      @click="current_input.reset_contexts"
    >
      Remove All
    </button>
    <transition-group tag="ul" name="list">
        <li 
            v-for="(p, p_index) in current_input.contexts" 
            :key="p.name"
        >
            <Context
                :context_name="p.name"
                :context_index="p_index"
            >
                <span class="sentence" v-for="(s, s_index) in p.content">
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

.sentence {
  width: 100%;
  padding: 0.15em 0em 0.15em 0em;
  color: var(--white);
}

.sentence:hover {
  color: hsl(168, 100%, 90%);
}

.sentence:has(input:checked) {
  color: var(--accent-color);
  box-shadow: 0px 0em rgba(0, 0, 0, 1);
  transform: translate(0em, 0.3em);
}

.sentence label {
  padding: 0.15em 0.3em 0em 0.15em;
  cursor: pointer;
  transition: all 0.1s ease;
}

.s-index {
  color: #FCE22A;
}

.word {
  display: inline-block;
  cursor: pointer;
}

.btn {
  width: 10em;
}
.red {
  background-color: var(--accent-color-reverse);
}

</style>