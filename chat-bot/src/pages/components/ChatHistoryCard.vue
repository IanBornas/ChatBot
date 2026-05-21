<script setup>
defineProps({
  chatName: {
    type: String,
    required: true
  },
  chatConversation: {
    type: String,
    required: true
  },
  chatDuration: {
    type: String,
    required: true
  }
})
</script>


<template>
    <div class="min-h-screen bg-base-200/30 px-5 py-6 sm:pl-[16.5rem] sm:pr-6">
        <div class="mx-auto w-full max-w-4xl">
            <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm transition hover:border-base-content/20 hover:bg-base-100/80">
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                        <h1 class="mt-1 truncate text-xl font-semibold"> ChatName{{ chatName }}</h1>
                        <p class="mt-2 line-clamp-2 text-sm text-base-content/80">
                            Chat Conversation
                            {{ chatConversation }}
                        </p>
                    </div>
                    <span class="shrink-0 rounded-full border border-base-content/10 bg-base-200/60 px-3 py-1 text-xs text-base-content/70">
                        {{ chatDuration }}
                        Chat Duration
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
