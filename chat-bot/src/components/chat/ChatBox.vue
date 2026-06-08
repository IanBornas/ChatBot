<script setup>
import { computed } from 'vue'
import WelcomeScreen from './WelcomeScreen.vue'

defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})

const containerClass = 'flex w-full min-w-0 flex-col gap-4 overflow-x-hidden'
const bubbleWrapBase = 'chat max-w-full'
const bubbleClass = 'chat-bubble max-w-[85%] break-words whitespace-pre-wrap [overflow-wrap:anywhere] shadow-sm'
</script>

<template>
    <div :class="containerClass">
        <!--Welcome screen-->
        <WelcomeScreen v-if="messages.length === 0" />

        <div v-else class="flex flex-col gap-4">
            <div
                v-for="message in messages"
                :key="message.id"
                :class="[bubbleWrapBase, message.role === 'user' ? 'chat-sender' : 'chat-receiver']">
                <div :class="bubbleClass">
                  <div v-if="message.content">{{ message.content }}</div>
                  <div v-if="message.attachments && message.attachments.length" class="mt-2 flex flex-col gap-2">
                    <div v-for="(file, idx) in message.attachments" :key="idx" class="flex items-center gap-3 bg-base-200/20 px-3 py-2 rounded-md border border-base-content/10">
                      <div class="flex items-center gap-2">
                        <template v-if="file.type && file.type.startsWith('image/')">
                          <img :src="file.url" alt="attachment" class="w-16 h-12 object-cover rounded" />
                        </template>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium">{{ file.name }}</span>
                          <span class="text-xs text-base-content/60">{{ Math.round((file.size || 0) / 1024) }} KB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
