<template>
      <transition-group tag="ul" name="list">
        <li class="btn-container">
          <div class="btn-title disable-select">Remove All Contexts below</div>
          <button class="btn icon-btn red" 
            v-if="current_input.contexts.length > 0"
            @click="current_input.reset_contexts"
          >
            <Icon name="mi:delete" size="1.5em"/>
          </button>
        </li>
        <li 
            v-for="(p, p_index) in current_input.contexts" 
            :key="p.name"
            class="context"
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

ul {
  list-style: none;
  margin: 0 1em;
  padding: 0;
}

.context {
  list-style-type: none;
}

.sentence {
  width: 100%;
  padding: 0.15em 0em 0.15em 0em;
}
.dark-mode .sentence {
  color: hsl(var(--white-base-hsl-triplet));
  
}

.sentence:hover {
  color: hsl(var(--black-base-hsl-triplet), 0.5);
}
.dark-mode .sentence:hover {
  color: hsl(168, 100%, 90%);
}

.sentence:has(input:checked) {
  color: hsl(var(--accent-reverse-hsl-triplet));
  box-shadow: 0px 0em rgba(0, 0, 0, 1);
  transform: translate(0em, 0.3em);
}
.dark-mode .sentence:has(input:checked) {
  color: hsl(var(--accent-base-hsl-triplet));
}

.sentence label {
  padding: 0.15em 0.3em 0em 0.15em;
  cursor: pointer;
  transition: all 0.1s ease;
}

.s-index {
  color: hsl(var(--accent-reverse-hsl-triplet));
}
.dark-mode .s-index {
  color: #FCE22A;
}

.word {
  display: inline-block;
  cursor: pointer;
}

.btn-container {
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
}

.btn-title {
  color: hsl(var(--accent-reverse-hsl-triplet));
  opacity: 0;
  transition: all 0.25s ease;
}

.btn-container:has(.red:hover) .btn-title {
  opacity: 1;
}

.red {
  width: 3em;
  color: hsl(var(--black-base-hsl-triplet));
  background-color: hsl(var(--accent-reverse-hsl-triplet));
  opacity: 1;
}

</style>