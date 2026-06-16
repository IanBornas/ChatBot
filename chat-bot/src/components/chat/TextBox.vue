<script setup>
import { ref } from 'vue'
import FileUpload from '../FileUpload.vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send-message','files-selected'])
const message = ref('')
const showUploader = ref(false)

function sendMessage() {
  if (props.disabled) return
  const trimmed = message.value.trim()
  if (!trimmed) return
  emit('send-message', trimmed)
  message.value = ''
}
</script>

<template>
    <div class="mt-auto pt-2">
        <div class="mx-auto w-full max-w-4xl rounded-2xl border border-base-content/20 bg-base-100/80 px-3 py-2 shadow-sm">
            <div class="flex items-end gap-2">
                <button type="button" class="btn btn-circle btn-text" aria-label="Attach file" @click.prevent="showUploader = !showUploader">
                    <span class="text-lg leading-none">+</span>
                </button>
                <textarea
                    rows="1"
                    class="min-h-[44px] max-h-32 w-full flex-1 resize-none bg-transparent px-2 py-2 outline-none"
                    placeholder="Message ChatBotUI"
                    v-model="message"
                    :disabled="disabled"
                    @keydown.enter.exact.prevent="sendMessage">
                </textarea>
                <button type="button" class="btn btn-circle btn-primary" aria-label="Send message" :disabled="disabled" @click="sendMessage">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M10 14l11-11" />
                        <path d="M21 3l-6.5 18a.55.55 0 0 1-1 .08L10 14l-7.58-3.52a.55.55 0 0 1 .08-1L21 3z" />
                    </svg>
                </button>
            </div>
            <div v-if="showUploader" class="mt-3">
                <FileUpload @files-selected="files => { emit('files-selected', files); showUploader = false }" />
            </div>
        </div>
    </div>
</template>

