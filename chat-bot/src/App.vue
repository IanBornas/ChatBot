<script setup>
import { provide, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/layout/Navbar.vue'

const router = useRouter()

function loadChats() {
  try {
    const raw = localStorage.getItem('chat_history')
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load chats from localStorage', e)
    return []
  }
}

const chats = ref(loadChats())
const currentChat = ref(createChat())

function createChat() {
  return {
    id: Date.now(),
    title: 'New Chat',
    messages: []
  }
}

function upsertChat(chat) {
  const index = chats.value.findIndex((item) => item.id === chat.id)
  if (index === -1) {
    chats.value.push(chat)
    return
  }
  chats.value[index] = chat
}

watch(chats, (val) => {
  try {
    localStorage.setItem('chat_history', JSON.stringify(val))
  } catch (e) {
    console.warn('Failed to persist chats to localStorage', e)
  }
}, { deep: true })

function createNewChat() {
  if (currentChat.value.messages.length > 0) {
    upsertChat(currentChat.value)
  }
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
  const trimmed = content.trim()
  if (!trimmed) return
  console.log('addMessage called:', { content, role, options })
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

function deleteChat(chatId) {
  const idx = chats.value.findIndex(c => c.id === chatId)
  if (idx !== -1) chats.value.splice(idx, 1)
  if (currentChat.value && currentChat.value.id === chatId) {
    currentChat.value = createChat()
  }
}

function deleteMessage(chatId, messageId) {
  // try currentChat first, then saved chats
  if (currentChat.value && currentChat.value.id === chatId) {
    const idx = (currentChat.value.messages || []).findIndex(m => m.id === messageId)
    if (idx !== -1) currentChat.value.messages.splice(idx, 1)
    return
  }
  const chat = chats.value.find(c => c.id === chatId)
  if (!chat) return
  const idx = (chat.messages || []).findIndex(m => m.id === messageId)
  if (idx !== -1) chat.messages.splice(idx, 1)
}

provide('chatState', {
  chats,
  currentChat,
  createNewChat,
  selectChat,
  addMessage,
  deleteChat,
  deleteMessage
})
</script>

<template>

    <!-- Sidebar -->
    <NavBar
      :chats="chats"
      @new-chat="createNewChat"
      @select-chat="selectChat"
    />
  
    <router-view/>
</template>

<style>
:root {
  --sidebar-width: 16.5rem; /* default sidebar width (w-66) */
  --sidebar-collapsed-width: 4.25rem; /* collapsed / minified width (w-17) */
}

/* When the sidebar is minified, override the layout variable */
.overlay-minified {
  --sidebar-width: var(--sidebar-collapsed-width);
}
</style>
