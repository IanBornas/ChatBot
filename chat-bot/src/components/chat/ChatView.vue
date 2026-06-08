<script setup>
import ChatBox from './ChatBox.vue'
import ChatHeader from './ChatHeader.vue'
import TextBox from './TextBox.vue'

defineProps({
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: {
    type: Array,
    default: () => []
  }
})

defineEmits(['send-message'])
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Chat Area -->
    <main class="flex flex-1 min-w-0 flex-col overflow-x-hidden bg-base-200/30 px-5 py-4 sm:py-6 sm:pl-[16.5rem] sm:pr-6">
      <div class="mx-auto flex w-full max-w-4xl min-h-0 flex-1 flex-col gap-4">
        <ChatHeader :title="title" />
        <div class="chat-panel flex-1 min-h-0 overflow-y-auto rounded-2xl p-4 shadow-sm">
          <ChatBox :messages="messages" />
        </div>
        <div>
          <TextBox @send-message="$emit('send-message', $event)" />
        </div>
      </div>
    </main>
  </div>
</template>
