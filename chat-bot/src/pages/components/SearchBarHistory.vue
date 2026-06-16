<script setup>
import { defineProps, defineEmits, inject, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const chatState = inject('chatState')

const matches = computed(() => {
  const q = String(props.modelValue || '').trim().toLowerCase()
  if (!q) return []
  const out = []
  for (const chat of chatState.chats.value || []) {
    for (const msg of chat.messages || []) {
      if (String(msg.content || '').toLowerCase().includes(q)) {
        out.push({ chatId: chat.id, chatTitle: chat.title, message: msg })
      }
    }
  }
  return out
})
</script>


<template>
    <div class="w-full px-4 py-4 sm:px-6">
        <div class="mx-auto w-full max-w-3xl rounded-2xl border border-base-content/15 bg-base-100/70 px-3 py-2 shadow-sm">
            <input
                type="text"
                :value="props.modelValue"
                @input="(e) => emit('update:modelValue', e.target.value)"
                placeholder="Search for chats"
                class="h-11 w-full rounded-xl bg-transparent px-3 text-sm outline-none placeholder:text-base-content/60"
            />
        </div>
        <div v-if="matches.length > 0" class="mt-2 max-h-64 overflow-auto">
          <ul class="divide-y">
            <li v-for="item in matches" :key="item.message.id" class="px-3 py-2 flex items-start justify-between gap-2">
              <div class="min-w-0" @click.stop="chatState.selectChat(item.chatId)">
                <div class="text-sm font-medium truncate">{{ item.chatTitle || 'Chat' }}</div>
                <div class="text-xs text-base-content/70 line-clamp-2">{{ item.message.content }}</div>
                <div class="text-xxs text-base-content/50">{{ new Date(item.message.id).toLocaleString() }}</div>
              </div>
              <div class="flex-shrink-0">
                <button class="btn btn-ghost btn-sm" @click.stop="chatState.deleteMessage(item.chatId, item.message.id)">Delete</button>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
