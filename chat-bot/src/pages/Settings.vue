<script setup>

</script>


<template>
    <div class="min-h-screen bg-base-200/30 px-5 py-6 sm:pl-[16.5rem] sm:pr-6">
        <div class="mx-auto w-full max-w-4xl space-y-6">
            <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm">
                <h1 class="mt-1 text-2xl font-semibold">Settings</h1>
            </div>

            <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm">
                <h2 class="text-lg font-semibold">Appearance</h2>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <button type="button" class="flex items-center justify-between rounded-xl border border-base-content/15 bg-base-200/40 px-4 py-3 text-sm font-medium hover:border-base-content/25 hover:bg-base-200/60">
                        <span>Dark Mode</span>
                        <span class="text-xs text-base-content/60">Default</span>
                    </button>
                    <button type="button" class="flex items-center justify-between rounded-xl border border-base-content/15 bg-base-200/40 px-4 py-3 text-sm font-medium hover:border-base-content/25 hover:bg-base-200/60">
                        <span>Light Mode</span>
                    </button>
                </div>
            </div>

            <div class="rounded-2xl border border-base-content/10 bg-base-100/70 px-6 py-5 shadow-sm">
                <h2 class="text-lg font-semibold">AI Model</h2>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div class="rounded-xl border border-base-content/15 bg-base-200/40 px-4 py-3">
                        <p class="text-xs uppercase tracking-wide text-base-content/60">Model</p>
                        <p class="mt-1 text-sm font-medium">model</p>
                    </div>
                    <div class="rounded-xl border border-base-content/15 bg-base-200/40 px-4 py-3">
                        <p class="text-xs uppercase tracking-wide text-base-content/60">Tokens</p>
                        <p class="mt-1 text-sm font-medium">tokens</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

