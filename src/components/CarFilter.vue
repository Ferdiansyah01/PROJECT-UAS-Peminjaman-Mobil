<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  types: { type: Array, default: () => [] }
})

const search = defineModel('search')
const typeFilter = defineModel('typeFilter')

const showFilters = ref(false)
const uniqueTypes = computed(() => [...new Set(props.types)])
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <div class="relative flex-1">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Cari mobil..."
          class="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-colors"
        />
      </div>
      <button
        @click="showFilters = !showFilters"
        class="lg:hidden rounded-lg border border-slate-800 px-3 py-2.5 text-sm text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"/>
        </svg>
      </button>
    </div>
    <div
      class="flex flex-wrap gap-2"
      :class="{ 'hidden lg:flex': !showFilters }"
    >
      <button
        @click="typeFilter = ''"
        class="rounded-full px-3 py-1 text-xs font-medium transition-colors"
        :class="!typeFilter ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400 hover:text-slate-100'"
      >
        Semua
      </button>
      <button
        v-for="t in uniqueTypes"
        :key="t"
        @click="typeFilter = t"
        class="rounded-full px-3 py-1 text-xs font-medium transition-colors"
        :class="typeFilter === t ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400 hover:text-slate-100'"
      >
        {{ t }}
      </button>
    </div>
  </div>
</template>
