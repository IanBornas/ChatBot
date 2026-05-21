<script setup>
defineProps({
  title: {
    type: String,
    default: 'New Chat'
  }
})
</script>


<template>
  <div class="flex items-center justify-between rounded-2xl border border-base-content/10 bg-base-100/70 px-4 py-3 shadow-sm">
    <div class="min-w-0">
      <p class="text-xs uppercase tracking-wide text-base-content/60">Chat</p>
      <h1 class="truncate text-lg font-semibold">{{ title }}</h1>
    </div>
  </div>
</template>
