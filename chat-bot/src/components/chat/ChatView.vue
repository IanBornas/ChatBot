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

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B','KB','MB','GB','TB']
  const i = Math.floor(Math.log(bytes)/Math.log(k))
  return parseFloat((bytes/Math.pow(k,i)).toFixed(dm)) + ' ' + sizes[i]
}

async function readFileAsText(file) {
  return await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve(null)
    reader.readAsText(file)
  })
}

async function handleFiles(files) {
  console.log('handleFiles received files:', files)
  for (const f of files) {
    // Add a user message showing the file was uploaded
    props.addMessage(f.name, 'user', {
      type: 'file',
      file: {
        name: f.name,
        size: formatBytes(f.size),
        mime: f.type
      }
    })

    // Build a prompt for the AI. If the file is text-like, include its content.
    let fileText = null
    if (f.type.startsWith('text/') || f.type === 'application/json') {
      fileText = await readFileAsText(f)
    }

    const promptParts = []
    promptParts.push(`A user uploaded a file named "${f.name}" (${formatBytes(f.size)}, ${f.type || 'unknown type'}).`)
    if (fileText) {
      // only include limited amount to avoid very long prompts
      const truncated = fileText.length > 20000 ? fileText.slice(0, 20000) + '\n\n[TRUNCATED]' : fileText
      promptParts.push('File contents:\n' + truncated)
      promptParts.push('Please summarize the main points and extract any actionable items. Keep answer concise.')
    } else {
      promptParts.push('Please summarize what you can from the file metadata and suggest how to extract content if needed.')
    }

    const composed = promptParts.join('\n\n')

    // Ask the AI about the file
    try {
      isSending.value = true
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: composed })
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data && typeof data.reply === 'string') {
        props.addMessage(data.reply, 'assistant', { confidence: data.confidence || 'medium' })
      } else {
        props.addMessage('Unable to analyze the uploaded file.', 'assistant', { confidence: 'low' })
      }
    } catch (err) {
      props.addMessage('Error analyzing file: ' + (err.message || 'unknown'), 'assistant', { confidence: 'low' })
    } finally {
      isSending.value = false
    }
  }
}

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

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`)
    }

    if (!data || typeof data.reply !== 'string') {
      throw new Error('Invalid response from server')
    }

    props.addMessage(data.reply, 'assistant', {
      confidence: data.confidence || 'medium'
    })
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
    <main class="flex flex-1 min-w-0 flex-col h-screen overflow-x-hidden bg-base-200/30 px-5 py-4 sm:py-6 sm:pl-[16.5rem] sm:pr-6">
      <div class="mx-auto flex w-full max-w-4xl h-full min-h-0 flex-1 flex-col gap-4">
        <ChatHeader :title="title" />
        <div class="flex-1 h-full min-h-0 rounded-2xl border border-base-content/10 bg-base-100/60 p-4 shadow-sm">
          <ChatBox class="h-full" :messages="messages" :is-typing="isSending" :error-message="errorMessage" />
        </div>
        <div>
          <TextBox :disabled="isSending" @send-message="handleSendMessage" @files-selected="handleFiles" />
        </div>
      </div>
    </main>
  </div>
</template>
