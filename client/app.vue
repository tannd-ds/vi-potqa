<template>
  <Html>
    <Head>
      <Title>ViPQA</Title>
    </Head>
  </Html>
  <Teleport to="body"> <Toast /> </Teleport>
  <Teleport to="body"> <Overlay /> </Teleport>
  <PageBackground>
    <div class="wrapper">
      <div class="panel scrollable">
        <div class="web-title-container">
          <h1 class="app-name disable-select">ViPQA</h1>
        </div>
        <InputWithLabel 
          :type="`input`"
          :id="`name-input`"
          :label_name="`Paragraph Name`"
          :placeholder="`(Optional) Input Paragraph Name`"
          v-model:model-value="current_input.new_p_name"
        />
        <InputWithLabel 
          :type="`textarea`"
          :id="`context-input`"
          :label_name="`Paragraph Content`"
          :placeholder="`Input Paragraph Content`"
          v-model:model-value="current_input.new_p_content"
        />
        <button class="btn add-btn" @click="current_input.add_context">Add</button>
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
        <button class="btn" @click="current_input.save_confirmed">Confirm</button>
      </div>

      <div class="panel scrollable">
        <ContextList />
      </div>
      <ConfirmedHandler />
    </div>
  </PageBackground>
</template>

<script setup>
  import { useAnnotationInputStore } from './stores/annotationInput';
  import { useGeneralStore } from './stores/generalStore'

  const current_input = useAnnotationInputStore()
  const general_store = useGeneralStore()

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
