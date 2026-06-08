<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send-message'])
const message = ref('')
const attachments = ref([])
const fileInput = ref(null)

function onAttachClick() {
    if (fileInput.value) fileInput.value.click()
}

function onFilesSelected(e) {
    const files = Array.from(e.target.files || [])
    files.forEach((f) => {
        const url = URL.createObjectURL(f)
        attachments.value.push({ file: f, name: f.name, size: f.size, type: f.type, url })
    })
    e.target.value = null
}

function removeAttachment(index) {
    const removed = attachments.value.splice(index, 1)
    if (removed && removed[0] && removed[0].url) {
        try { URL.revokeObjectURL(removed[0].url) } catch (e) {}
    }
}

function sendMessage() {
    const trimmed = message.value.trim()
    if (!trimmed && attachments.value.length === 0) return
    emit('send-message', { text: trimmed, attachments: attachments.value.map(a => ({ name: a.name, size: a.size, type: a.type, url: a.url })) })
    message.value = ''
    // keep object URLs around for messages; clear input attachments without revoking those URLs
    attachments.value = []
}
</script>

<template>
    <div class="mt-auto pt-2">
        <div class="message-input-panel mx-auto w-full max-w-4xl rounded-2xl px-3 py-2 shadow-sm">
            <div class="flex flex-col gap-2">
                <div v-if="attachments.length > 0" class="flex flex-wrap gap-2">
                    <div v-for="(a, i) in attachments" :key="i" class="flex items-center gap-2 bg-base-200/40 px-3 py-1 rounded-md border border-base-content/10">
                        <span class="text-sm truncate max-w-[14rem]">{{ a.name }}</span>
                        <button type="button" class="text-xs text-base-content/60" @click="removeAttachment(i)">Remove</button>
                    </div>
                </div>
                <div class="flex items-end gap-2">
                    <input ref="fileInput" type="file" class="hidden" @change="onFilesSelected" multiple accept="image/*,.pdf,.doc,.docx,.txt" />
                    <button type="button" class="btn btn-circle btn-text" aria-label="Attach file" @click="onAttachClick">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24L9.5 17.7a1 1 0 0 1-1.41-1.41L14.72 10" />
                        </svg>
                    </button>
                    <textarea
                        rows="1"
                        class="min-h-[44px] max-h-32 w-full flex-1 resize-none bg-transparent px-2 py-2 outline-none"
                        placeholder="Message ChatBotUI"
                        v-model="message"
                        @keydown.enter.exact.prevent="sendMessage">
                    </textarea>
                    <button type="button" class="btn btn-circle btn-primary" aria-label="Send message" @click="sendMessage">
                        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M10 14l11-11" />
                            <path d="M21 3l-6.5 18a.55.55 0 0 1-1 .08L10 14l-7.58-3.52a.55.55 0 0 1 .08-1L21 3z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
