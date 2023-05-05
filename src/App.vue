<script setup>

  import { ref, reactive, computed, watch } from 'vue'

  const ps = ref([
    {
      id: 0,
      name: 'Hello World',
      content: [
        {id: 0, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 1, content: ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 2, content: ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'},
        {id: 3, content: ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      ]
    },
    {
      id: 1,
      name: 'Hello World',
      content: [
        {id: 0, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 1, content: ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 2, content: ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'},
        {id: 3, content: ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      ]
    },
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
          id: ps.value.length,
          name: p_name.value,
          content: para_to_sentences(p_content.value)
        }
        ps.value.push(p_temp)
        p_name.value = p_content.value = ''
    }
  }

  function hasValidInput() {
    return p_name.value.trim() && p_content.value.trim()
  }

  function ids_to_names(ids) {
    ids = checked_ids.value
    let result = []
    for (let i = 0; i < ids.length; i++) {
      // Split Paragraph id and Sentence id from id String
      let p_id = ids[i].slice(0, ids[i].indexOf("-"))
      let s_id = ids[i].slice(ids[i].indexOf("-")+1)
      // Find the index of the Paragraph that has id = p_id
      let p_index = ps.value.findIndex(p => p.id == p_id);
      result.push([ps.value[p_index].name, Number(s_id)])
    }
    return result
  }

  function remove_para(p_id) {
    let index = ps.value.findIndex(p => p.id == p_id)
    if (ps.value.length == 1) {
      ps.value = []
    }
    else {
      ps.value = ps.value.slice(0, index).concat(ps.value.slice(index+1))
    }
  }

  function export_data() {
    let data = {}
    data['facts'] = ids_to_names(checked_ids)
    data['question'] = question_content.value
    data['contexts'] = ps.value
    data['answer'] = answer_content.value

    console.log(data)
  }

</script>

<template>

  <div class="wrapper">
    <div class="left-panel">
      <div class="web-title-container">
        <img class="app-logo disable-select" src="./assets/t-and-t-logo-no-text.svg">
        <div class="text-title">
          <h1 class="app-name disable-select">Vi-PotQA Annotator</h1>
          <h3 class="hashtag disable-select">@tannd-ds</h3>
        </div>
      </div>
      <div class="p-name">
        <label class="disable-select" for="name-input">Paragraph Name</label>
        <input class="input-box" id="name-input" v-model="p_name" placeholder="Paragraph Name" spellcheck="false" autocomplete="off" aria-autocomplete="none">
      </div>
      <div class="p-name">
        <label class="disable-select" for="content-input">Paragraph Content</label>
        <textarea id="content-input" v-model="p_content" placeholder="Insert your paragraph here" rows="15" spellcheck="false" autocomplete="off" aria-autocomplete="none"></textarea>
      </div>
      <button class="btn add-btn" @click="add">Add</button>
      <div class="p-name">
        <label class="disable-select" for="question-input">Question</label>
        <input class="input-box" id="question-input" v-model="question_content" placeholder="Question" spellcheck="false" autocomplete="off" aria-autocomplete="none"> 
      </div>
      <div class="p-name">
        <label class="disable-select" for="answer-input">Answer</label>
        <input class="input-box" id="answer-input" v-model="answer_content" placeholder="Answer" spellcheck="false" autocomplete="off" aria-autocomplete="none"> 
      </div>
      <button class="btn confirm-btn" @click="export_data">Confirm</button>
    </div>

    <div class="right-panel scrollable">
      <div class="p-list">
        <div class="p-confirmed" v-for="p in ps" :key="p.name">
          <div class="p-name-bar">
            <h4 class="disable-select"> {{ p.name }} </h4>
            <div class="p-name-bar-btn">
              <button class="edit-btn" @click="" title="Edit Paragraph"><img src="./assets/pen-solid.svg"></button>
              <!-- <button class="remove-btn" @click="remove_para(p.id)" title="Remove Paragraph"><img src="./assets/xmark-solid.svg"></button> -->
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
