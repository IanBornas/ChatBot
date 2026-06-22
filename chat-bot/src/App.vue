<script setup>
import { provide, ref, watch } from 'vue'
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

function loadChats() {
  try {
    const raw = localStorage.getItem('chat_history')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Failed to load chats from localStorage', error)
    return []
  }
}

const chats = ref(loadChats())
const currentChat = ref(createChat())

function upsertChat(chat) {
  if (!chat || !chat.messages?.length) return
  const index = chats.value.findIndex((item) => item.id === chat.id)
  if (index === -1) {
    chats.value.push(chat)
    return
  }
  chats.value[index] = chat
}

watch(
  chats,
  (value) => {
    try {
      localStorage.setItem('chat_history', JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to persist chats to localStorage', error)
    }
  },
  { deep: true }
)

watch(
  currentChat,
  (chat) => {
    upsertChat(chat)
  },
  { deep: true }
)

function createNewChat() {
  upsertChat(currentChat.value)
  currentChat.value = createChat()
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

function selectChat(chatId) {
  const selected = chats.value.find((chat) => chat.id === chatId)
  if (!selected) return
  currentChat.value = selected
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

function addMessage(content, role = 'user', options = {}) {
  if (typeof content === 'object' && content !== null) {
    const text = String(content.text || '').trim()
    const attachments = content.attachments || []
    if (!text && attachments.length === 0) return

    const message = {
      id: Date.now(),
      role,
      content: text,
      attachments,
      ...options
    }
    currentChat.value.messages.push(message)
    if (currentChat.value.title === 'New Chat' && text) {
      currentChat.value.title = text.slice(0, 40)
    }
    return
  }

  const trimmed = String(content).trim()
  if (!trimmed) return
  const message = {
    id: Date.now(),
    role,
    content: trimmed,
    ...options
  }
  currentChat.value.messages.push(message)
  if (currentChat.value.title === 'New Chat') {
    currentChat.value.title = trimmed.slice(0, 40)
  }
}

function deleteMessage(chatIdOrMessageId, maybeMessageId) {
  const messageId = maybeMessageId ?? chatIdOrMessageId
  const chatId = maybeMessageId ? chatIdOrMessageId : currentChat.value.id
  const chat = chatId === currentChat.value.id
    ? currentChat.value
    : chats.value.find((item) => item.id === chatId)

  if (!chat) return false
  const index = chat.messages.findIndex((message) => message.id === messageId)
  if (index === -1) return false
  chat.messages.splice(index, 1)
  if (chat.id === currentChat.value.id && chat.messages.length === 0) {
    chat.title = 'New Chat'
  }
  return true
}

function clearMessages() {
  currentChat.value.messages = []
  currentChat.value.title = 'New Chat'
}

function deleteChat(chatId) {
  const index = chats.value.findIndex((chat) => chat.id === chatId)
  if (index === -1) return null
  const [removed] = chats.value.splice(index, 1)
  if (currentChat.value.id === chatId) {
    currentChat.value = createChat()
  }
  return removed
}

function clearChats() {
  chats.value = []
  currentChat.value = createChat()
}

provide('chatState', {
  chats,
  currentChat,
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
  <NavBar
    :chats="chats"
    @new-chat="createNewChat"
    @select-chat="selectChat"
  />

  <router-view />
</template>

<style>
:root {
  --sidebar-width: 16.5rem;
  --sidebar-collapsed-width: 4.25rem;
}

.overlay-minified {
  --sidebar-width: var(--sidebar-collapsed-width);
}
</style>
