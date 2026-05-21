<script setup>
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
                <div :class="bubbleClass">{{ message.content }}</div>
            </div>
        </div>
    </div>
</template>
