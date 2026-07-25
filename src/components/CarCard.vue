<script setup>
import { computed } from 'vue'

const props = defineProps({
  car: { type: Object, required: true }
})

const imgSrc = computed(() => {
  if (!props.car.imageUrl) return ''
  if (props.car.imageUrl.startsWith('http') || props.car.imageUrl.startsWith('/')) return props.car.imageUrl
  return `/images/${props.car.imageUrl}`
})
</script>

<template>
  <router-link
    :to="car.available ? `/cars/${car.id}` : ''"
    class="group block rounded-lg border border-slate-800 bg-slate-900 overflow-hidden hover:border-slate-700 transition-colors"
    :class="{ 'opacity-60 pointer-events-none': !car.available }"
  >
    <div class="aspect-[16/10] bg-slate-800 overflow-hidden">
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="car.name"
        class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        @error="$event.target.style.display='none'"
      />
      <div v-if="!imgSrc" class="flex h-full items-center justify-center text-slate-600 text-sm">No Image</div>
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-medium text-slate-100">{{ car.name }}</h3>
          <p class="text-xs text-slate-500 mt-0.5">{{ car.brand }} &middot; {{ car.type }}</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          :class="car.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
        >
          {{ car.available ? 'Tersedia' : 'Tidak Tersedia' }}
        </span>
      </div>
      <div class="mt-3 flex items-center gap-3 text-xs text-slate-500">
        <span>{{ car.transmission }}</span>
        <span>&middot;</span>
        <span>{{ car.seats }} kursi</span>
      </div>
      <div class="mt-3">
        <span
          v-if="car.available"
          class="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors"
        >
          Pinjam Sekarang
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </span>
        <span v-else class="text-sm text-slate-600">Tidak tersedia</span>
      </div>
    </div>
  </router-link>
</template>
