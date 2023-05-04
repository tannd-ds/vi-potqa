<script setup>

  import { ref, reactive, computed, watch } from 'vue'

  const ps = reactive([
    {
      id: 0,
      name: 'Hello World',
      content: [
        {id: 0, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 1, content: ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 2, content: ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'},
        {id: 3, content: ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      ]
    }
  ])
  const p_name = ref("")
  const p_content = ref("")
  const question_content = ref("")
  const answer_content = ref("")
  const checked_ids = ref([])

  function para_to_sentences(para) {
    let p_temp = []
    let sentences = para.split(/(?<=[.!?])\s+/)
    for (let i=0; i < sentences.length; i++) {
      p_temp.push({
        id: p_temp.length,
        content: sentences[i],
      })
    }
    return p_temp
  }

  function add() {
    if (hasValidInput()) {
        const p_temp = {
          id: ps.length,
          name: p_name.value,
          content: para_to_sentences(p_content.value)
        }
        if (!ps.includes(p_temp)) {
          ps.push(p_temp)
          p_name.value = p_content.value = ''
        }
    }
  }

  function hasValidInput() {
    return p_name.value.trim() && p_content.value.trim()
  }

  function ids_to_names(p_name, s_id) {
    let my_list = []
    my_list.push([])
    my_list[0].push(p_name)
    my_list[0].push(s_id)
    return my_list
  }

  function remove_para(p_id) {
    ps = ps.slice(0, p_id).concat(ps.slice(p_id+1))
  }

</script>

<template>

  <div class="wrapper">
    <div class="left-panel">
      <div class="p-name">
        <label for="name-input">Paragraph Name</label>
        <input class="input-box" id="name-input" v-model="p_name" placeholder="Paragraph Name" spellcheck="false" autocomplete="off" aria-autocomplete="none">
      </div>
      <div class="p-name">
        <label for="content-input">Paragraph Content</label>
        <textarea id="content-input" v-model="p_content" placeholder="Insert your paragraph here" rows="15" spellcheck="false" autocomplete="off" aria-autocomplete="none"></textarea>
      </div>
      <button class="btn add-btn" @click="add">Add</button>
      <div class="p-name">
        <label for="question-input">Question</label>
        <input class="input-box" id="question-input" v-model="question_content" placeholder="Question" spellcheck="false" autocomplete="off" aria-autocomplete="none"> 
      </div>
      <div class="p-name">
        <label for="answer-input">Answer</label>
        <input class="input-box" id="answer-input" v-model="answer_content" placeholder="Answer" spellcheck="false" autocomplete="off" aria-autocomplete="none"> 
      </div>
      <button class="btn confirm-btn">Confirm</button>
    </div>

    <div class="right-panel scrollable">
      <div class="p-list">
        <div class="p-confirmed" v-for="p in ps" :key="p.name">
          <div class="p-name-bar">
            <h4> {{ p.name }} </h4>
            <div class="p-name-bar-btn">
              <button class="edit-btn" @click="" title="Edit Paragraph"><img src="./assets/pen-solid.svg"></button>
              <button class="remove-btn" @click="remove_para(p.id)" title="Remove Paragraph"><img src="./assets/xmark-solid.svg"></button>
            </div>
          </div>
          <div class="s-confirmed" v-for="s in p.content">
            <input 
              type="checkbox" 
              name="optional" 
              :id="String(p.id) + '-' + String(s.id)" 
              :value="String(p.id) + '-' + String(s.id)" 
              v-model="checked_ids"
              required hidden
            >
            <label :for="String(p.id) + '-' + String(s.id)" class="">{{ s.content }}</label>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>

<style scoped>
</style>
