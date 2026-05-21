<script setup>
defineProps({
  chats: {
    type: Array,
    default: () => []
  }
})

defineEmits([
    'new-chat',
    'select-chat'
])
</script>



<template>

<aside id="collapsible-mini-sidebar" class="overlay [--auto-close:sm] overlay-minified:w-17  sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden w-66 sm:absolute sm:z-0 sm:flex sm:translate-x-0 border-e border-base-content/20" role="dialog" tabindex="-1" >

<div class="drawer-header  overlay-minified:px-3.75 py-2 w-full flex items-center justify-between gap-3">
    <router-link to="/">
         <h3 class="drawer-title text-xl font-semibold overlay-minified:hidden">ChatBotUI</h3> 
    </router-link>  
  </div> 
  <div class="drawer-body px-2 pt-4">
    <ul class="menu p-0">
      <li>
        <button
          @click="$emit('new-chat')"
          class="flex items-center gap-2 w-full"
        >

          <span class="icon-[tabler--user] size-5"></span>

          <span class="overlay-minified:hidden">
            New Chat
          </span>

        </button>
      </li>
      <li v-if="chats.length > 0" class="menu-title px-3 pt-3 text-xs uppercase opacity-70">
        Recent Chats
      </li>
      <li v-for="chat in chats" :key="chat.id">
        <button
          @click="$emit('select-chat', chat.id)"
          class="flex items-center gap-2 w-full truncate"
          :title="chat.title"
        >
          <span class="icon-[tabler--message] size-5"></span>
          <span class="overlay-minified:hidden truncate">
            {{ chat.title }}
          </span>
        </button>
      </li>
      <li>
        <router-link to="/search-history">
          <span class="icon-[tabler--user] size-5"></span>
          <span class="overlay-minified:hidden">Search Chat</span>
        </router-link> 
      </li>
      <li>
        <router-link to="/about">
          <span class="icon-[tabler--user] size-5"></span>
          <span class="overlay-minified:hidden">About</span>
        </router-link> 
      </li>
      <li>
        <router-link to="/settings">
          <span class="icon-[tabler--user] size-5"></span>
          <span class="overlay-minified:hidden">Settings</span>
        </router-link> 
      </li>
      <li>
        <router-link to="/history">
          <span class="icon-[tabler--user] size-5"></span>
          <span class="overlay-minified:hidden">History</span>
        </router-link> 
      </li>
    </ul>
  </div>
</aside>
</template>
