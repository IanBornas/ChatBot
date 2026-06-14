<script setup>
import ConfidenceMeter from './ConfidenceScore.vue'

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
    
    <!-- Message Bubble -->
    <div :class="bubbleClass">
      {{ message.content }}
    </div>

    <!-- Confidence Meter (AI only) -->
    <div 
      v-if="message.role === 'assistant' && message.confidence"
      class="mt-2 ml-2 max-w-[85%]"
    >
      <ConfidenceMeter :confidence="message.confidence" />
    </div>

  </div>
</template>
