<script setup>
import { onMounted } from 'vue'
import { useCarStore } from '../stores/carStore'

const store = useCarStore()

const imgSrc = (car) => {
  if (!car.imageUrl) return ''
  if (car.imageUrl.startsWith('http') || car.imageUrl.startsWith('/')) return car.imageUrl
  return `/images/${car.imageUrl}`
}

onMounted(() => {
  if (store.cars.length === 0) store.getCars()
})

async function handleReturn(car) {
  const ok = await store.returnCar(car.id)
  if (ok) {
    await store.getCars()
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-10">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">Daftar Peminjaman</h1>
      <p class="text-sm text-slate-400 mt-1">Mobil yang sedang dipinjam.</p>
    </div>

    <div v-if="store.loading && store.cars.length === 0" class="text-center py-16 text-sm text-slate-500">
      Memuat data...
    </div>

    <div v-else-if="store.error && store.cars.length === 0" class="text-center py-16 text-sm text-red-400">
      {{ store.error }}
    </div>

    <div v-else-if="store.borrowedCars.length === 0" class="text-center py-16">
      <svg class="w-12 h-12 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-slate-500 text-sm">Tidak ada mobil yang sedang dipinjam.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="car in store.borrowedCars"
        :key="car.id"
        class="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-lg p-4"
      >
        <div class="w-20 h-16 shrink-0 rounded-md bg-slate-800 overflow-hidden">
          <img
            v-if="imgSrc(car)"
            :src="imgSrc(car)"
            :alt="car.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-white truncate">{{ car.name }}</h3>
          <p class="text-xs text-slate-500">{{ car.brand }} &middot; {{ car.type }} &middot; {{ car.transmission }} &middot; {{ car.seats }} kursi</p>
          <div v-if="store.borrowingRecords[car.id]" class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>Peminjam: <strong class="text-slate-300">{{ store.borrowingRecords[car.id].renterName }}</strong></span>
            <span>Kontak: {{ store.borrowingRecords[car.id].contact }}</span>
            <span>Pinjam: {{ store.borrowingRecords[car.id].borrowDate }}</span>
            <span>Kembali: {{ store.borrowingRecords[car.id].returnDate }}</span>
          </div>
        </div>
        <button
          @click="handleReturn(car)"
          :disabled="store.loading"
          class="shrink-0 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
        >
          Selesai Pinjam
        </button>
      </div>
    </div>
  </div>
</template>
