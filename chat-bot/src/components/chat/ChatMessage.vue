<script setup>
import { computed } from 'vue'
import ConfidenceMeter from './ConfidenceScore.vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const bubbleWrapBase = 'chat max-w-full'
const bubbleClass = 'chat-bubble max-w-[85%] break-words whitespace-pre-wrap [overflow-wrap:anywhere] shadow-sm'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatMarkdown(str) {
  if (!str && str !== 0) return ''
  const escaped = escapeHtml(String(str))
  // Convert **bold** to <strong>
  const bold = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  return bold.replace(/\n/g, '<br/>')
}

const formattedContent = computed(() => formatMarkdown(props.message?.content))
const isHighRisk = computed(() => !!props.message?.isHighRisk)
</script>

<template>
  <div :class="[bubbleWrapBase, props.message.role === 'user' ? 'chat-sender' : 'chat-receiver']">
    <!-- High-risk full-width banner (assistant only) -->
    <div v-if="props.message.role === 'assistant' && isHighRisk" class="mb-2 w-full">
      <div class="rounded-md p-3 bg-amber-100 border-l-4 border-amber-400 text-amber-900 text-sm">
        <strong class="block">Warning — High-risk topic</strong>
        <span class="block">This conversation may contain medical, legal, or other sensitive advice. Responses are for informational purposes only and are not a substitute for professional guidance.</span>
      </div>
    </div>

    <!-- Compact inline badge (assistant only) -->
    <div v-if="props.message.role === 'assistant' && isHighRisk" class="flex justify-center mb-1">
      <span class="inline-block bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">High-risk topic</span>
    </div>

    <!-- Message Bubble -->
    <div :class="bubbleClass">
        <template v-if="props.message.type === 'file' && props.message.file">
          <div class="flex flex-col gap-4">
            <div class="text-sm font-medium">{{ props.message.content || props.message.file.name }}</div>
            <div class="bg-base-100 rounded-md">
              <button class="flex items-center gap-2 px-3 py-2 w-full">
                <div class="flex flex-col gap-2 w-full">
                  <div class="flex items-center">
                    <span class="icon-[tabler--file-type] text-error me-2 size-5"></span>
                    <span class="text-base-content/80 truncate font-medium">{{ props.message.file.name }}</span>
                  </div>
                  <div class="text-base-content flex items-center gap-1 text-xs">
                    <span v-if="props.message.file.pages">{{ props.message.file.pages }} Pages</span>
                    <span v-if="props.message.file.size"><span class="icon-[tabler--circle-filled] mt-0.5 size-1.5"></span>{{ props.message.file.size }}</span>
                    <span v-if="props.message.file.mime"><span class="icon-[tabler--circle-filled] mt-0.5 size-1.5"></span>{{ props.message.file.mime.split('/').pop().toUpperCase() }}</span>
                  </div>
                </div>
                <span class="btn btn-text btn-circle">
                  <span class="icon-[tabler--download] size-5"></span>
                </span>
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-if="props.message.role === 'assistant'" v-html="formattedContent"></div>
          <div v-else class="whitespace-pre-wrap">{{ props.message.content }}</div>
        </template>
    </div>

    <!-- Confidence Meter (AI only) -->
    <div 
      v-if="props.message.role === 'assistant' && props.message.confidence"
      class="mt-2 ml-2 max-w-[85%]"
    >
      <ConfidenceMeter :confidence="props.message.confidence" />
    </div>

  </div>
</template>
