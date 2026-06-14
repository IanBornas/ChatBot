<script setup>
import { computed } from 'vue'

const props = defineProps({
    confidence: {
        type: String,
        required: true
    }
})

// Determine bar width
const confidenceWidth = computed(() => {
    switch (props.confidence.toLowerCase()) {
        case 'high':
            return '95%'
        case 'medium':
            return '65%'
        case 'low':
            return '35%'
        default:
            return '0%'
    }
})

// Determine bar color
const confidenceColor = computed(() => {
    switch (props.confidence.toLowerCase()) {
        case 'high':
            return 'bg-emerald-500'
        case 'medium':
            return 'bg-yellow-400'
        case 'low':
            return 'bg-red-500'
        default:
            return 'bg-gray-400'
    }
})

// Badge styling
const confidenceBadge = computed(() => {
    switch (props.confidence.toLowerCase()) {
        case 'high':
            return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        case 'medium':
            return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        case 'low':
            return 'bg-red-500/20 text-red-400 border border-red-500/30'
        default:
            return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    }
})
</script>

<template>
    <div class="w-full max-w-md rounded-2xl bg-zinc-900 p-4 shadow-lg">
        
        <!-- Header -->
        <div class="mb-3 flex items-center justify-between">
            <h1 class="text-sm font-medium text-gray-300">
                AI Confidence
            </h1>

            <span
                :class="confidenceBadge"
                class="rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm"
            >
                {{ confidence }}
            </span>
        </div>

        <!-- Progress Background -->
        <div class="h-3 w-full overflow-hidden rounded-full bg-zinc-700">
            
            <!-- Progress Fill -->
            <div
                :class="confidenceColor"
                class="h-full rounded-full transition-all duration-500 ease-in-out"
                :style="{ width: confidenceWidth }"
            ></div>
        </div>

        <!-- Accuracy Text -->
        <p class="mt-2 text-xs text-gray-400">
            Estimated response reliability based on AI retrieval confidence.
        </p>
    </div>
</template>