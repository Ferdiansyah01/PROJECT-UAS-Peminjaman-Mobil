<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePeminjamanStore } from '../stores/peminjamanStore'

const router = useRouter()
const store = usePeminjamanStore()

onMounted(() => {
  if (!store.submitted) {
    router.push('/')
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div v-if="store.submitted" class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-800/60 mb-6">
        <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-white mb-2">Peminjaman Berhasil!</h1>
      <p class="text-sm text-slate-400 mb-8">Mobil berhasil dipinjam. Berikut detail peminjaman Anda:</p>

      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 text-left max-w-md mx-auto">
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Mobil</span>
            <span class="font-medium text-white">{{ store.selectedCar?.name }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Peminjam</span>
            <span class="font-medium text-white">{{ store.formData.name }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Kontak</span>
            <span class="font-medium text-white">{{ store.formData.contact }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Tanggal Pinjam</span>
            <span class="font-medium text-white">{{ store.formData.borrowDate }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Tanggal Kembali</span>
            <span class="font-medium text-white">{{ store.formData.returnDate }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <router-link to="/" class="btn-primary">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
</template>
