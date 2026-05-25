<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
})

const bubbleWrapBase = 'chat max-w-full'
const bubbleClass =
  'chat-bubble max-w-[85%] break-words whitespace-pre-wrap [overflow-wrap:anywhere] shadow-sm'
</script>

<template>
  <div :class="[bubbleWrapBase, message.role === 'user' ? 'chat-sender' : 'chat-receiver']">
    <div :class="bubbleClass">{{ message.content }}</div>
  </div>
</template>
