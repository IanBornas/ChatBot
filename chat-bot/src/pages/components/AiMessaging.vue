<script setup>
import { computed } from 'vue'
import ConfidenceMeter from './ConfidenceMeter.vue'

const props = defineProps({
    message: {
        type: [String, Object],
        default: ''
    },
    confidence: String
})

const msg = computed(() => {
    if (typeof props.message === 'string') {
        return {
            role: 'receiver',
            type: 'text',
            content: props.message
        }
    }
    return Object.assign({ role: 'receiver', type: 'text', content: '' }, props.message)
})
</script>

<template>
    <div :class="['chat', msg.role === 'sender' ? 'chat-end' : 'chat-start']">
        <div class="chat-bubble max-w-2xl">
            <template v-if="msg.type === 'file' && msg.file">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-medium">{{ msg.content || msg.file.title || msg.file.name }}</div>
                    <div class="bg-base-100 rounded-md">
                        <button class="flex items-center gap-2 px-3 py-2 w-full">
                            <div class="flex flex-col gap-2 w-full">
                                <div class="flex items-center">
                                    <span class="icon-[tabler--file-type-pdf] text-error me-2 size-5"></span>
                                    <span class="text-base-content/80 truncate font-medium">{{ msg.file.name }}</span>
                                </div>
                                <div class="text-base-content flex items-center gap-1 text-xs">
                                    <span v-if="msg.file.pages">{{ msg.file.pages }} Pages</span>
                                    <span v-if="msg.file.size"><span class="icon-[tabler--circle-filled] mt-0.5 size-1.5"></span>{{ msg.file.size }}</span>
                                    <span v-if="msg.file.mime"><span class="icon-[tabler--circle-filled] mt-0.5 size-1.5"></span>{{ msg.file.mime.split('/').pop().toUpperCase() }}</span>
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
                <div class="whitespace-pre-wrap">{{ msg.content }}</div>
            </template>

            <div class="mt-3">
                <ConfidenceMeter :confidence="confidence" />
            </div>
        </div>
    </div>
</template>