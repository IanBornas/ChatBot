<script setup>
import logo from '../../assets/knight bot.png'

defineProps({
  chats: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['new-chat', 'select-chat'])
</script>

<template>
  <aside class="app-sidebar" role="navigation" aria-label="Main navigation">
    <div class="sidebar-inner">
      <div class="sidebar-logo">
        <router-link to="/" class="flex items-center gap-3">
          <img :src="logo" alt="Fact Knight" class="logo-icon w-9 h-9 object-cover rounded-full">
          <div class="nav-label font-semibold text-sm">Fact Knight</div>
        </router-link>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li>
            <button type="button" @click="emit('new-chat')" class="nav-item">
              <span class="nav-icon">+</span>
              <span class="nav-label">New Chat</span>
            </button>
          </li>

          <li v-if="chats.length" class="menu-title px-3 pt-4 pb-2 text-xs uppercase tracking-wide opacity-50 font-semibold">
            Recent
          </li>

          <li v-for="chat in chats" :key="chat.id">
            <button type="button" @click="emit('select-chat', chat.id)" class="nav-item" :title="chat.title">
              <span class="nav-icon">#</span>
              <span class="nav-label truncate">{{ chat.title }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <ul>
          <li>
            <router-link to="/history" class="nav-item">
              <span class="nav-icon">H</span>
              <span class="nav-label">History</span>
            </router-link>
          </li>
          <li>
            <router-link to="/search-history" class="nav-item">
              <span class="nav-icon">S</span>
              <span class="nav-label">Search</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-item">
              <span class="nav-icon">i</span>
              <span class="nav-label">About</span>
            </router-link>
          </li>
          <li>
            <router-link to="/settings" class="nav-item">
              <span class="nav-icon">*</span>
              <span class="nav-label">Settings</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
