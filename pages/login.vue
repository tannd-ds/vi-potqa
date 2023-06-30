<template>
  <Html>
    <Head>
      <Title>ViPQA | Login</Title>
    </Head>
  </Html>
  <PageBackground>
    <div class="wrapper">
      <div class="panel scrollable">
        <div class="web-title-container">
          <h1 class="app-name disable-select">ViPQA</h1>
        </div>
        <InputWithLabel 
          :type="`input`"
          :id="`question-content`"
          :label_name="`Username`"
          :placeholder="`Input Question`"
          v-model:model-value="current_input.question_content"
        />
        <InputWithLabel 
          :type="`input`"
          :id="`answer-content`"
          :label_name="`Password`"
          :placeholder="`Input Answer`"
          v-model:model-value="current_input.answer_content"
        />
        <button class="btn" @click="login">Login</button>
      </div>
    </div>
  </PageBackground>
</template>

<script setup>
  import { useAnnotationInputStore } from '../stores/annotationInput';
  const current_input = useAnnotationInputStore()

  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  watchEffect(() => {
    if (user.value) {
      current_input.question_content = ""
      current_input.answer_content = ""
      router.push('/')
    }
  })

  const login = async () => {
    const { user, error } = await client.auth.signInWithPassword({
      email: current_input.question_content,
      password: current_input.answer_content,
    })
    if (error) {
      console.log(error)
    } else {
      console.log(user)
    }
  }

</script>
