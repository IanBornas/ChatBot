<script setup>
import { inject } from 'vue'
import ChatView from '../components/chat/ChatView.vue'

const chatState = inject('chatState')
if (!chatState) {
  throw new Error('chatState was not provided')
}

const currentChat = chatState.currentChat
const addMessage = chatState.addMessage

function handleSendMessage(message) {
  addMessage(message, 'user')
}
</script>

<template>
  <ChatView
    :title="currentChat.title"
    :messages="currentChat.messages"
    @send-message="handleSendMessage"
  />
</template>
