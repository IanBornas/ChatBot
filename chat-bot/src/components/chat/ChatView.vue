<script setup>
import { ref } from 'vue'
import ChatBox from './ChatBox.vue'
import ChatHeader from './ChatHeader.vue'
import TextBox from './TextBox.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: {
    type: Array,
    default: () => []
  },
  addMessage: {
    type: Function,
    required: true
  }
})

const isSending = ref(false)
const errorMessage = ref('')

async function handleSendMessage(message) {
  if (isSending.value) return
  errorMessage.value = ''
  props.addMessage(message, 'user')

  isSending.value = true
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`)
    }

    const data = await response.json()
    if (!data || typeof data.reply !== 'string') {
      throw new Error('Invalid response from server')
    }

    props.addMessage(data.reply, 'bot')
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Request failed'
    errorMessage.value = `Unable to reach the server. ${details}`
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Chat Area -->
    <main class="flex flex-1 min-w-0 flex-col overflow-x-hidden bg-base-200/30 px-5 py-4 sm:py-6 sm:pl-[16.5rem] sm:pr-6">
      <div class="mx-auto flex w-full max-w-4xl min-h-0 flex-1 flex-col gap-4">
        <ChatHeader :title="title" />
        <div class="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-base-content/10 bg-base-100/60 p-4 shadow-sm">
          <ChatBox :messages="messages" :is-typing="isSending" :error-message="errorMessage" />
        </div>
        <div>
          <TextBox :disabled="isSending" @send-message="handleSendMessage" />
        </div>
      </div>
    </main>
  </div>
</template>
