<script setup>
  import { ref } from 'vue'
  import { useAnnotationInputStore } from './stores/annotationInput';
  import { useGeneralStore } from './stores/generalStore'

  const is_show_toast = ref(false)
  const toast_title = ref("")
  const toast_content = ref("")
  const toast_type = ref("success")

  const current_input = useAnnotationInputStore()
  const general_store = useGeneralStore()

  const confirmed_data = ref([])

  function ids_to_names() {
    let ids = current_input.checked_ids
    let result = []
    for (let i = 0; i < ids.length; i++) {
      // Split Paragraph id and Sentence id from id String
      let p_id = ids[i].slice(0, ids[i].indexOf("-"))
      let s_id = ids[i].slice(ids[i].indexOf("-")+1)
      // Find the index of the Paragraph that has id = p_id
      result.push([ps[p_id].name, Number(s_id)])
    }
    return result
  }

  function export_data() {
    let data = {}

    if (current_input.contexts.length == 0) {
      show_toast('error', 'Empty Contexts', 'Please add more Context Paragraph')
      return 
    }
    let ps_simplified = []
    for (let i = 0; i < current_input.contexts.length; i++)
      ps_simplified.push([current_input.contexts[i].name, current_input.contexts[i].content])
    data['contexts'] = ps_simplified

    data['facts'] = current_input.get_contexts_names
    console.log(current_input.get_contexts_names)
    if (data['facts'].length == 0) {
      show_toast('error', 'Empty Facts', 'Please choose more facts')
      return 
    }
    
    if (current_input.question_content == "") {
      show_toast('error', 'Empty Question', 'Please add a Question')
      return 
    }
    data['question'] = current_input.question_content
    
    if (current_input.answer_content== "") {
      show_toast('error', 'Empty Answer', 'Please add an Answer')
      return 
    }
    data['answer'] = current_input.answer_content

    POST_data([data])

    // confirmed_data.value.push([data])
    // localStorage.setItem("data", JSON.stringify(confirmed_data.value))
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

  const { $axios } = useNuxtApp()
  function POST_data(post_data) {
    $axios.post($axios.defaults.baseURL, {
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
    $axios.get($axios.defaults.baseURL)
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
      :show="is_show_toast" 
      :type="toast_type" 
      @close="is_show_toast=false" 
      @click="is_show_toast=false"
    >
      <template #title>{{ toast_title }}</template>
      <template #content>{{ toast_content }}</template>
    </toast>
  </Teleport>
  <Teleport to="body">
    <OverlayEditContext
      :show="general_store.is_show_overlay"
      :context_index="0"
    >

    </OverlayEditContext>
  </Teleport>
  <PageBackground>
    <div class="wrapper">
      <div class="left-panel scrollable">
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
          v-model:model-value="current_input.new_p_name"
        />
        <InputWithLabel 
          :type="`textarea`"
          :id="`context-input`"
          :label_name="`Paragraph Content`"
          :placeholder="`Input Paragraph Content`"
          v-model:model-value="current_input.new_p_content"
        />
        <button class="btn add-btn" @click="current_input.add_context(current_input.get_p_name_and_sentences)">Add</button>
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
      </div>

      <div class="right-panel scrollable">
        <ContextList />
      </div>
    </div>
  </PageBackground>
</template>