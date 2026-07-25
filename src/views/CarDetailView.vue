<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCarStore } from '../stores/carStore'
import PeminjamanForm from '../components/PeminjamanForm.vue'

const route = useRoute()
const store = useCarStore()

onMounted(() => {
  store.getCar(route.params.id)
})

const car = computed(() => store.selectedCar)

const imgSrc = computed(() => {
  if (!store.selectedCar?.imageUrl) return ''
  const url = store.selectedCar.imageUrl
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `/images/${url}`
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-10">
    <div v-if="store.loading" class="space-y-4">
      <div class="aspect-video bg-slate-800 rounded-lg animate-pulse"></div>
      <div class="h-8 bg-slate-800 rounded w-1/2 animate-pulse"></div>
      <div class="h-4 bg-slate-800 rounded w-1/3 animate-pulse"></div>
    </div>

    <div v-else-if="store.error && !car" class="text-center py-16">
      <p class="text-slate-400 text-sm">{{ store.error }}</p>
      <router-link to="/" class="mt-4 inline-block text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Kembali ke beranda</router-link>
    </div>

    <div v-else-if="car" class="space-y-8">
      <router-link to="/" class="inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition-colors">
        &larr; Kembali
      </router-link>

      <div class="aspect-video bg-slate-800 rounded-lg overflow-hidden">
        <img
          v-if="imgSrc"
          :src="imgSrc"
          :alt="car.name"
          class="w-full h-full object-cover"
          @error="$event.target.style.display = 'none'"
        />
        <div v-if="!imgSrc" class="w-full h-full flex items-center justify-center text-slate-500 text-sm">
          Tidak ada gambar
        </div>
      </div>

      <div>
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-white">{{ car.name }}</h1>
            <p class="text-slate-400">{{ car.brand }} &middot; {{ car.type }}</p>
          </div>
          <span
            class="text-xs font-medium px-2.5 py-1 rounded shrink-0"
            :class="car.available ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-400 border border-slate-600'"
          >
            {{ car.available ? 'Tersedia' : 'Tidak Tersedia' }}
          </span>
        </div>

        <div class="flex items-center space-x-6 text-sm text-slate-400 mb-4">
          <span>Transmisi: {{ car.transmission }}</span>
          <span>{{ car.seats }} kursi</span>
        </div>

        <p v-if="car.description" class="text-sm text-slate-300 leading-relaxed">{{ car.description }}</p>
      </div>

      <div v-if="car.available" class="border-t border-slate-800 pt-8">
        <h2 class="text-lg font-semibold text-white mb-6">Form Peminjaman</h2>
        <PeminjamanForm :car="car" />
      </div>

      <div v-else class="border-t border-slate-800 pt-8 text-center py-8">
        <p class="text-slate-400 text-sm">Mobil ini sedang tidak tersedia untuk dipinjam.</p>
      </div>
    </div>
  </div>
</template>
