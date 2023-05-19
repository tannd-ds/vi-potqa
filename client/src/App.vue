<script setup>

  import { ref, reactive, computed, watch } from 'vue'
  import Toast from './components/Toast.vue'
  import PageBackground from './components/PageBackground.vue'
  import InputWithLabel from './components/InputWithLabel.vue'

  const is_show_toast = ref(false)
  const toast_title = ref("")
  const toast_content = ref("")
  const toast_type = ref("success")

  const ps = ref([])
  const current_input = ref({
    p_name: "",
    p_content: "",
    question_content: "",
    answer_content: "",
  })

  const checked_ids = ref([])
  const confirmed_data = ref([])

  // Server-side variables
  let flask_host = 'http://localhost:8989/json'

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
        name: current_input.value.p_name,
        content: para_to_sentences(current_input.value.p_content)
      }
      ps.value.push(p_temp)
      localStorage.setItem("current_ps", JSON.stringify(ps.value))
      current_input.value.p_name = current_input.value.p_content = ''
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
      let s_id = ids[i].slice(ids[i].indexOf("-") + 1 )
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

  function edit_para(p) {
    console.log(p.content, p.name)
  }

  function hasValidInput() {
    return current_input.value.p_name.trim() && current_input.value.p_content.trim()
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

    if (ps.value.length == 0) {
      show_toast('error', 'Empty Contexts', 'Please add more Context Paragraph')
      return 
    }
    let ps_simplified = []
    for (let i = 0; i < ps.value.length; i++)
      ps_simplified.push([ps.value[i].name, ps.value[i].content])
    data['contexts'] = ps_simplified

    if (ids_to_names().length == 0) {
      show_toast('error', 'Empty Facts', 'Please choose more facts')
      return 
    }
    data['facts'] = ids_to_names()
    
    if (current_input.value.question_content == "") {
      show_toast('error', 'Empty Question', 'Please add a Question')
      return 
    }
    data['question'] = current_input.value.question_content
    
    if (current_input.value.answer_content== "") {
      show_toast('error', 'Empty Answer', 'Please add an Answer')
      return 
    }
    data['answer'] = current_input.value.answer_content

    POST_data([data])

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

  import axios from 'axios';

  function POST_data(post_data) {
    axios.post(flask_host, {
      body: post_data
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function GET_data() {
    axios.get(flask_host)
      .then(response => {
        console.log(JSON.parse(response.data['data']))
      })
      .catch(error => {
        console.error(error);
      });
  }

</script>

<template>
  <Teleport to="body">
    <toast 
      :class="{ active: is_show_toast }" 
      :show="is_show_toast" 
      :type="toast_type" 
      @close="is_show_toast=false" 
      @click="is_show_toast=false"
    >
      <template #title>{{ toast_title }}</template>
      <template #content>{{ toast_content }}</template>
    </toast>
  </Teleport>
  <PageBackground>
    <div class="wrapper">
      <div class="left-panel">
        <div class="web-title-container">
          <div class="text-title">
            <h1 class="app-name disable-select">Vi-PotQA</h1>
          </div>
        </div>
        <InputWithLabel 
          :type="`input`"
          :id="`name-input`"
          :label_name="`Paragraph Name`"
          :placeholder="`Input Paragraph Name`"
          v-model:model-value="current_input.p_name"
        />
        <InputWithLabel 
          :type="`textarea`"
          :id="`context-input`"
          :label_name="`Paragraph Content`"
          :placeholder="`Input Paragraph Content`"
          v-model:model-value="current_input.p_content"
        />
        <button class="btn add-btn" @click="add_para">Add</button>
        <InputWithLabel 
          :type="`input`"
          :id="`question-content`"
          :label_name="`Question`"
          :placeholder="`Input Question`"
          v-model:model-value="current_input.question_content"
        />
        <InputWithLabel 
          :type="`input`"
          :id="`answer-content`"
          :label_name="`Answer`"
          :placeholder="`Input Answer`"
          v-model:model-value="current_input.answer_content"
        />
        <button class="btn confirm-btn" @click="export_data">Confirm</button>
        <button class="btn confirm-btn" @click="GET_data">GET</button>
        <button class="btn confirm-btn" @click="POST_data(confirmed_data)">POST</button>
      </div>

      <div class="right-panel scrollable">
        <div class="p-list">
          <div class="p-confirmed" v-for="(p, p_index) in ps" :key="p.name">
            <div class="p-name-bar">
              <h4 class="disable-select"> {{ p.name }} </h4>
              <div class="p-name-bar-btn">
                <button class="edit-btn" @click="edit_para(p)" title="Edit Paragraph"><img src="./assets/images/pen-solid.svg"></button>
                <button class="remove-btn" @click="remove_para(p)" title="Remove Paragraph"><img src="./assets/images/xmark-solid.svg"></button>
              </div>
            </div>
            <p class="s-list">
              <span class="s-confirmed" v-for="(s, s_index) in p.content">
                <span class="word s-index">
                  <input 
                  type="checkbox" 
                  name="optional" 
                  :id="`${p_index}-${s_index}`" 
                  :value="`${p_index}-${s_index}`" 
                  v-model="checked_ids"
                  required hidden
                  >
                  <label :for="`${p_index}-${s_index}`" class="disable-select">[{{ s_index }}]</label>
                </span>
                <span class="word" v-for="w in sentence_to_word(s)">
                  <input 
                  type="checkbox" 
                  name="optional" 
                  :id="`${p_index}-${s_index}`" 
                  :value="`${p_index}-${s_index}`"
                  v-model="checked_ids"
                  required hidden
                  >
                  <label :for="`${p_index}-${s_index}`" class="disable-select">{{ w }}</label>
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </PageBackground>
</template>