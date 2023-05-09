<script setup>

  import { ref, reactive, computed, watch } from 'vue'
  import Toast from './components/Toast.vue'

  const is_show_toast = ref(false)
  const toast_title = ref("")
  const toast_content = ref("")
  const toast_type = ref("success")

  const ps = ref([])
  const p_name = ref("")
  const p_content = ref("")
  const question_content = ref("")
  const answer_content = ref("")
  const checked_ids = ref([])
  const confirmed_data = ref([])

  // Load data from LocalStorage
  load_state()
  function load_state() {
    let confirmed_local = localStorage.getItem("data")
    confirmed_data.value = (confirmed_local == null) ? [] : JSON.parse(confirmed_local) 
    let ps_local = localStorage.getItem("current_ps")
    ps.value = (ps_local == null) ? [] : JSON.parse(ps_local)
  }

  function para_to_sentences(para) {
    return  para.split(/(?<=[.!?])\s+/)
  }

  function add_para() {
    if (hasValidInput()) {
      const p_temp = {
        name: p_name.value,
        content: para_to_sentences(p_content.value)
      }
      ps.value.push(p_temp)
      localStorage.setItem("current_ps", JSON.stringify(ps.value))
      p_name.value = p_content.value = ''
    }
    else {
      show_toast('error', 'Fail', 'Paragraph\'s name or content is empty')
    }
  }

  function update_checked_id(removed_p_id) {
    let ids = checked_ids.value
    let result = []
    for (let i = 0; i < ids.length; i++) {
      // Split Paragraph id and Sentence id from id String
      let p_id = ids[i].slice(0, ids[i].indexOf("-"))
      let s_id = ids[i].slice(ids[i].indexOf("-")+1)
      /*
      - If p_id is removed_p_id: move on
      - If p_id is less than remove_p_id: add it to new list, doesn't need extra update
      - If p_id is greater than remove_p_id: update its index (by minus 1) then add it to new list
      */
      if (p_id == removed_p_id) continue
      if (p_id < removed_p_id)
        result.push(ids[i])
      else 
        result.push(String(p_id-1) + '-' + String(s_id))
    }
    return result
  }
  
  function remove_para(p) {
    let index = find_index_a_in_b(p, ps.value)
    ps.value = ps.value.slice(0, index).concat(ps.value.slice(index+1))
    checked_ids.value = update_checked_id(index)
    localStorage.setItem("current_ps", JSON.stringify(ps.value))
  }

  function hasValidInput() {
    return p_name.value.trim() && p_content.value.trim()
  }

  function ids_to_names() {
    let ids = checked_ids.value
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

  function export_data() {
    let data = {}
    data['facts'] = ids_to_names()
    data['question'] = question_content.value
    let ps_simplified = []
    for (let i = 0; i < ps.value.length; i++)
      ps_simplified.push([ps.value[i].name, ps.value[i].content])
    data['contexts'] = ps_simplified
    data['answer'] = answer_content.value

    confirmed_data.value.push([data])
    localStorage.setItem("data", JSON.stringify(confirmed_data.value))
    show_toast('success', 'Success', 'Save data successfully')
  }

  function sentence_to_word(sentence) {
    return sentence.split(" ")
  }

  function show_toast(type='sucess', title, content) {
    toast_type.value = type
    toast_title.value = title
    toast_content.value = content
    is_show_toast.value = true
    setTimeout(function(){is_show_toast.value = false}, 3000)
  }
</script>

<template>
  <Teleport to="body">
    <toast :class="{ active: is_show_toast }" :show="is_show_toast" :type="toast_type" @close="is_show_toast=false" @click="is_show_toast=false">
      <template #title>{{ toast_title }}</template>
      <template #content>{{ toast_content }}</template>
    </toast>
  </Teleport>
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
        <textarea id="content-input" v-model="p_content" placeholder="Insert your paragraph here" rows="10" spellcheck="false" autocomplete="off" aria-autocomplete="none"></textarea>
      </div>
      <button class="btn add-btn" @click="add_para">Add</button>
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
          <p class="s-list">
            <span class="s-confirmed" v-for="s in p.content">
              <span class="word s-index">
                <input 
                type="checkbox" 
                name="optional" 
                :id="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
                :value="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
                v-model="checked_ids"
                required hidden
                >
                <label :for="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" class="disable-select">[{{ find_index_a_in_b(s, p.content) }}]</label>
              </span>
              <span class="word" v-for="w in sentence_to_word(s)">
                <input 
                type="checkbox" 
                name="optional" 
                :id="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
                :value="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" 
                v-model="checked_ids"
                required hidden
                >
                <label :for="String(find_index_a_in_b(p, ps)) + '-' + String(find_index_a_in_b(s, p.content))" class="disable-select">{{ w }}</label>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>