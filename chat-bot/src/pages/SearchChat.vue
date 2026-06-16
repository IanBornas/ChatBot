<script setup>
import { inject, ref, computed } from 'vue'
import SearchBarHistory from './components/SearchBarHistory.vue'
import ChatHistoryCard from './components/ChatHistoryCard.vue'

const chatState = inject('chatState')
const search = ref('')

const filteredChats = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return chatState.chats.value.slice().reverse()
    return chatState.chats.value.filter((chat) => {
        if (chat.title && chat.title.toLowerCase().includes(q)) return true
        for (const m of chat.messages || []) {
            if (String(m.content || '').toLowerCase().includes(q)) return true
        }
        return false
    }).reverse()
})
</script>


<template>
    <div style="padding-left: var(--sidebar-width);">
    <div class="flex items-center justify-between gap-4 px-4 sm:px-6">
        <SearchBarHistory v-model="search" />
    </div>

    <div class="mt-4">
        <div v-if="filteredChats.length === 0" class="p-6 text-center text-sm text-base-content/60">
            No chats found.
        </div>
        <div v-for="chat in filteredChats" :key="chat.id" class="cursor-pointer px-4 sm:px-6">
            <div @click="chatState.selectChat(chat.id)">
                <ChatHistoryCard
                    :chatName="chat.title"
                    :chatConversation="chat.messages && chat.messages.length ? chat.messages[chat.messages.length - 1].content : ''"
                    :chatDuration="new Date(chat.id).toLocaleString()"
                    @delete="() => chatState.deleteChat(chat.id)"
                />
            </div>
        </div>
    </div>
  </div>
</template>
