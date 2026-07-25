<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCarStore } from '../stores/carStore'
import CarCard from '../components/CarCard.vue'
import CarFilter from '../components/CarFilter.vue'

const store = useCarStore()
const search = ref('')
const typeFilter = ref('')

onMounted(() => {
  store.getCars()
})

const types = computed(() => store.carTypes)

const filteredCars = computed(() => {
  return store.cars.filter(c => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)
    const matchType = !typeFilter.value || c.type === typeFilter.value
    return matchSearch && matchType
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">Daftar Mobil</h1>
      <p class="text-sm text-slate-400 mt-1">Pilih mobil yang tersedia untuk dipinjam</p>
    </div>

    <div v-if="store.error" class="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-sm text-rose-400">
      {{ store.error }}
    </div>

    <div class="mb-6">
      <CarFilter v-model:search="search" v-model:type-filter="typeFilter" :types="types" />
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden animate-pulse">
        <div class="aspect-[16/9] bg-slate-700"></div>
        <div class="p-5 space-y-3">
          <div class="h-5 bg-slate-700 rounded w-3/4"></div>
          <div class="h-4 bg-slate-700 rounded w-1/2"></div>
          <div class="h-9 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredCars.length === 0" class="text-center py-16">
      <p class="text-slate-400 text-sm">Tidak ada mobil yang ditemukan</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CarCard v-for="car in filteredCars" :key="car.id" :car="car" />
    </div>
  </div>
</template>
