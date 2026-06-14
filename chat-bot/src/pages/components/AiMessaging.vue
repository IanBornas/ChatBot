<script setup>
import ConfidenceMeter from './ConfidenceMeter.vue'

const props = defineProps({
    message: String,
    confidence: String
})
</script>

<template>
<div class="bg-zinc-800 rounded-xl p-4 max-w-2xl">
    
    <!-- AI response -->
    <p class="text-white">
        {{ message }}
    </p>

    <!-- Confidence meter -->
    <div class="mt-3">
        <ConfidenceMeter :confidence="confidence"/>
    </div>

</div>
</template>