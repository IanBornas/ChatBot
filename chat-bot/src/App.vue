<script setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/layout/Navbar.vue'

const router = useRouter()

const chats = ref([])
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

function addMessage(content, role = 'user') {
  const trimmed = content.trim()
  if (!trimmed) return
  const message = {
    id: Date.now(),
    role,
    content: trimmed
  }
  currentChat.value.messages.push(message)
  if (currentChat.value.title === 'New Chat') {
    currentChat.value.title = trimmed.slice(0, 40)
  }
}

provide('chatState', {
  chats,
  currentChat,
  createNewChat,
  selectChat,
  addMessage
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

<style scoped></style>
