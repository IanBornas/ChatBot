<script setup>
import logo from '../../assets/knight bot.png'
</script>


<template>
    <div class="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 text-center px-4">
        <img :src="logo" alt="Chatbot Logo" class="w-32 h-32">
        <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold">Fact Knight - At Your Service</h1>
            <p class="text-base-content/80 max-w-md mx-auto">
                Your trusted companion for accurate information and insightful answers. Ask me anything!
            </p>
        </div>
        
        <div class="flex flex-col md:flex-row gap-8 mt-4">
            <div class="flex flex-col gap-3">
                <h2 class="text-xl font-semibold">CORE IDEAS</h2>
                <ul class="text-left text-sm space-y-2 text-base-content/70">
                    <li>• Quick and efficient responses</li>
                </ul>
            </div>
            
            <div class="flex flex-col gap-3">
                <h2 class="text-xl font-semibold">FEATURES</h2>
                <ul class="text-left text-sm space-y-2 text-base-content/70">
                    <li>• Real-time chat assistance</li>
                </ul>
            </div>
        </div>
    </div>
</template>
