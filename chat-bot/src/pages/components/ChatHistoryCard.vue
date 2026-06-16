<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  chatName: { type: String, required: true },
  chatConversation: { type: String, required: true },
  chatDuration: { type: String, required: true }
})

const emit = defineEmits(['delete'])

function confirmDelete() {
  if (confirm('Delete this chat? This cannot be undone.')) {
    emit('delete')
  }
}
</script>


<template>
  <div class="bg-base-200/30 px-0 py-2">
    <div class="mx-auto w-full max-w-4xl">
      <div class="relative rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm transition hover:border-base-content/20 hover:bg-base-100/80">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <h1 class="mt-1 truncate text-xl font-semibold">{{ chatName }}</h1>
            <p class="mt-2 line-clamp-2 text-sm text-base-content/80">{{ chatConversation }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="shrink-0 rounded-full border border-base-content/10 bg-base-200/60 px-3 py-1 text-xs text-base-content/70">{{ chatDuration }}</span>
            <button @click.stop="confirmDelete" class="px-3 py-1 text-xs rounded border border-base-content/10 bg-base-100/50 text-base-content/70 hover:bg-base-100/80 flex items-center gap-2" title="Delete chat">
              <span class="icon-[tabler--trash] size-4"></span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
