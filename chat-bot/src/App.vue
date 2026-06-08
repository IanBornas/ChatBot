<script setup>
import { provide, reactive, toRef } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/layout/Navbar.vue'

const router = useRouter()

function createChat() {
  return {
    id: Date.now(),
    title: 'New Chat',
    messages: []
  }
}

const state = reactive({
  chats: [],
  currentChat: createChat()
})

function upsertChat(chat) {
  const index = state.chats.findIndex((item) => item.id === chat.id)
  if (index === -1) {
    state.chats.push(chat)
    return
  }
  state.chats[index] = chat
}

function createNewChat() {
  if (state.currentChat.messages.length > 0) {
    upsertChat(state.currentChat)
  }
  state.currentChat = createChat()
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

function selectChat(chatId) {
  const selected = state.chats.find((chat) => chat.id === chatId)
  if (!selected) return
  state.currentChat = selected
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

function addMessage(content, role = 'user') {
  if (typeof content === 'object' && content !== null) {
    const text = (content.text || '').trim()
    const attachments = content.attachments || []
    if (!text && (!attachments || attachments.length === 0)) return
    const message = {
      id: Date.now(),
      role,
      content: text,
      attachments
    }
    state.currentChat.messages.push(message)
    if (state.currentChat.title === 'New Chat' && text) {
      state.currentChat.title = text.slice(0, 40)
    }
    return
  }

  const trimmed = String(content).trim()
  if (!trimmed) return
  const message = {
    id: Date.now(),
    role,
    content: trimmed
  }
  state.currentChat.messages.push(message)
  if (state.currentChat.title === 'New Chat') {
    state.currentChat.title = trimmed.slice(0, 40)
  }
}

function deleteMessage(messageId) {
  const idx = state.currentChat.messages.findIndex((m) => m.id === messageId)
  if (idx !== -1) {
    state.currentChat.messages.splice(idx, 1)
    if (!state.currentChat.messages.length) {
      state.currentChat.title = 'New Chat'
    }
    return true
  }
  return false
}

function clearMessages() {
  state.currentChat.messages = []
  state.currentChat.title = 'New Chat'
}

function deleteChat(chatId) {
  const idx = state.chats.findIndex((c) => c.id === chatId)
  if (idx !== -1) {
    const removed = state.chats.splice(idx, 1)
    if (state.currentChat && state.currentChat.id === chatId) {
      state.currentChat = createChat()
    }
    return removed[0]
  }
  return null
}

function clearChats() {
  state.chats = []
  state.currentChat = createChat()
}

provide('chatState', {
  chats: state.chats,
  currentChat: toRef(state, 'currentChat'),
  createNewChat,
  selectChat,
  addMessage,
  deleteMessage,
  clearMessages,
  deleteChat,
  clearChats
})
</script>

<template>

    <!-- Sidebar -->
    <NavBar
      :chats="state.chats"
      @new-chat="createNewChat"
      @select-chat="selectChat"
    />
  
    <router-view/>
</template>

<style scoped></style>
