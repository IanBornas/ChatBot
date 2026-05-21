<script setup>
import logo from '../../assets/chatbot-logo.png'
</script>


<template>
    <div class="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2 text-center">
        <img :src="logo" alt="Chatbot Logo" class="w-48 h-48">
        <h1 class="text-xl font-semibold">Welcome to Chatbot</h1>
        <p class="text-base-content/70">How can I help you today?</p>
    </div>
</template>
