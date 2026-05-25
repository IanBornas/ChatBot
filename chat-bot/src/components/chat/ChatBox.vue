<script setup>
import ChatMessage from './ChatMessage.vue'
import TypingIndicator from './TypingIndicator.vue'
import WelcomeScreen from './WelcomeScreen.vue'

defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  isTyping: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const containerClass = 'flex w-full min-w-0 flex-col gap-4 overflow-x-hidden'
const bubbleWrapBase = 'chat max-w-full'
const errorBubbleClass =
  'chat-bubble max-w-[85%] border border-error/30 bg-error/10 text-error shadow-sm'
</script>

<template>
  <div :class="containerClass">
    <!--Welcome screen-->
    <WelcomeScreen v-if="messages.length === 0" />

    <div v-else class="flex flex-col gap-4">
      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
    </div>

    <div v-if="isTyping" class="chat chat-receiver max-w-full">
      <div class="chat-bubble bg-base-200/60">
        <TypingIndicator />
      </div>
    </div>

    <div v-if="errorMessage" :class="[bubbleWrapBase, 'chat-receiver']">
      <div :class="errorBubbleClass">{{ errorMessage }}</div>
    </div>
  </div>
</template>
