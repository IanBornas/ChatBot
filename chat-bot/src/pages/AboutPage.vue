<script setup>
import logo from '../assets/knight bot.png'
</script>

<template>
    <div class="min-h-screen bg-base-200/30 px-5 py-6 sm:pl-[16.5rem] sm:pr-6">
        <div class="mx-auto flex w-full max-w-3xl flex-col items-center text-center rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-6 shadow-sm">
            <img :src="logo" alt="Chatbot Logo" class="h-48 w-48">
            <h1 class="mt-3 text-2xl font-semibold">About Page</h1>
            <p class="mt-3 max-w-2xl text-base text-base-content/80 text-justify">
                This project is made by Ian Gabriel S. Bornas and Julianna Marie M. Lundag
            </p>
        </div>
    </div>
</template>
