<script setup>
import Navbar from './Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 antialiased flex flex-col">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="border-t border-slate-800 py-6">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
        <span>&copy; 2024 Peminjaman Mobil</span>
        <router-link to="/about" class="hover:text-slate-300 transition-colors">Tentang</router-link>
      </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
