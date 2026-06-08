<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const chatState = inject('chatState')
if (!chatState) throw new Error('chatState not provided')

    const { chats, selectChat, deleteChat, clearChats } = chatState
const router = useRouter()

import { ref, computed } from 'vue'

const searchTerm = ref('')

    const filteredChats = computed(() => {
    const q = (searchTerm.value || '').toLowerCase().trim()
    // only show chats that have at least one message
    const nonEmpty = chats.filter((c) => c.messages && c.messages.length > 0)
    if (!q) return nonEmpty
    return nonEmpty.filter((c) => {
        const title = (c.title || '').toLowerCase()
        if (title.includes(q)) return true
        // search inside messages text
        for (const m of (c.messages || [])) {
            if ((m.content || '').toLowerCase().includes(q)) return true
        }
        return false
    })
})

function openChat(chat) {
    selectChat(chat.id)
    router.push('/')
}

function confirmDelete(chat) {
    if (confirm(`Delete chat "${chat.title || 'Untitled chat'}"? This cannot be undone.`)) {
        deleteChat(chat.id)
    }
}

function confirmClear() {
    if (confirm('Clear all chats? This will remove all saved conversations.')) {
        clearChats()
    }
}
</script>

<template>
    <div class="min-h-screen px-6 py-6 sm:pl-[16.5rem] sm:pr-6">
        <div class="mx-auto w-full max-w-4xl space-y-4">
            <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm">
                <h1 class="text-2xl font-semibold">Recent Chats</h1>
            </div>

                    <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-4 py-4 shadow-sm">
                        <div class="flex items-center justify-between mb-3 gap-4">
                            <div class="flex-1">
                                <input v-model="searchTerm" type="search" placeholder="Search chats..." class="w-full rounded-md px-3 py-2 border border-base-content/10 bg-transparent outline-none" />
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="text-sm text-base-content/60">{{ filteredChats.length }} results</div>
                                <div>
                                    <button v-if="chats.length > 0" @click="confirmClear" class="text-xs px-3 py-1 rounded bg-red-600/10 text-red-400 hover:bg-red-600/12">Clear All</button>
                                </div>
                            </div>
                        </div>
                        <ul class="space-y-3">
                            <li v-if="filteredChats.length === 0" class="text-sm text-base-content/60">No matching chats.</li>
                            <li v-for="chat in filteredChats" :key="chat.id">
                                <div class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors">
                                    <button @click="openChat(chat)" class="flex-1 text-left">
                                        <div class="text-sm font-medium truncate">{{ chat.title || 'Untitled chat' }}</div>
                                        <div class="text-xs text-base-content/60">{{ chat.messages?.length || 0 }} messages</div>
                                    </button>
                                    <div class="flex gap-2">
                                        <button @click="confirmDelete(chat)" class="text-xs px-2 py-1 rounded bg-red-600/8 text-red-300 hover:bg-red-600/12">Delete</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
        </div>
    </div>
</template>