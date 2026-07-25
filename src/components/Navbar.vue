<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span class="text-lg font-bold tracking-tight">Peminjaman Mobil</span>
      </router-link>

      <nav class="flex items-center gap-1">
        <router-link to="/" class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="route.path === '/' ? 'bg-indigo-900/40 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'">
          Beranda
        </router-link>
        <router-link to="/borrowed" class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="route.path === '/borrowed' ? 'bg-indigo-900/40 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'">
          Peminjaman
        </router-link>
        <router-link to="/about" class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="route.path === '/about' ? 'bg-indigo-900/40 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'">
          Tentang
        </router-link>
      </nav>
    </div>
  </header>
</template>
