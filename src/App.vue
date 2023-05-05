<script setup>

  import { ref, reactive, computed, watch } from 'vue'

  const ps = ref([
    {
      name: 'Hello World',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ]
    },
  ])
  const p_name = ref("")
  const p_content = ref("")
  const question_content = ref("")
  const answer_content = ref("")
  const checked_ids = ref([])
  const confirmed_data = Array(localStorage.getItem("data"))

  function para_to_sentences(para) {
    return  para.split(/(?<=[.!?])\s+/)
  }

  function add() {
    if (hasValidInput()) {
        const p_temp = {
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
      result.push([ps.value[p_id].name, Number(s_id)])
    }
    return result
  }

  function find_index_a_in_b(a, b) {
    return b.findIndex(b_element => b_element == a)
  }

  function remove_para(p) {
    let index = find_index_a_in_b(p, ps.value)
    ps.value = ps.value.slice(0, index).concat(ps.value.slice(index+1))
  }

  function export_data() {
    let data = {}
    data['facts'] = ids_to_names(checked_ids)
    data['question'] = question_content.value
    let ps_simplified = []
    for (let i = 0; i < ps.value.length; i++)
      ps_simplified.push(ps.value[i].name, ps.value[i].content)
    data['contexts'] = ps_simplified
    data['answer'] = answer_content.value

    confirmed_data.push(data)
    localStorage.setItem("data", JSON.stringify(confirmed_data))
  }


</script>

<template>
  <div class="wrapper">
    <div class="left-panel">
      <div class="web-title-container">
        <img class="app-logo disable-select" src="./assets/avocaduck-logo-head-no-text.svg">
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
              <button class="remove-btn" @click="remove_para(p)" title="Remove Paragraph"><img src="./assets/xmark-solid.svg"></button>
            </div>
          </div>
          <div class="s-confirmed" v-for="s in p.content">
            <input 
              type="checkbox" 
              name="optional" 
              :id="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
              :value="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
              v-model="checked_ids"
              required hidden
            >
            <label :for="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" class="">{{ s }}</label>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>