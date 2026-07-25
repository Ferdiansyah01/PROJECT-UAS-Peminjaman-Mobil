<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '../stores/carStore'

const props = defineProps({
  car: { type: Object, required: true }
})

const store = useCarStore()
const router = useRouter()

const form = reactive({
  renterName: '',
  contact: '',
  borrowDate: '',
  returnDate: ''
})

const errors = ref({})

function validate() {
  const e = {}
  if (!form.renterName.trim()) e.renterName = 'Nama harus diisi'
  if (!form.contact.trim()) e.contact = 'Kontak harus diisi'
  if (!form.borrowDate) e.borrowDate = 'Tanggal pinjam harus diisi'
  if (!form.returnDate) e.returnDate = 'Tanggal kembali harus diisi'
  if (form.borrowDate && form.returnDate && form.returnDate < form.borrowDate) {
    e.returnDate = 'Tanggal kembali harus setelah tanggal pinjam'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  store.formData.renterName = form.renterName
  store.formData.contact = form.contact
  store.formData.borrowDate = form.borrowDate
  store.formData.returnDate = form.returnDate
  const ok = await store.borrowCar(props.car.id)
  if (ok) {
    router.push('/borrowed')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <div class="space-y-1">
      <label class="text-xs font-medium text-slate-400">Nama Peminjam</label>
      <input
        v-model="form.renterName"
        type="text"
        placeholder="Masukkan nama"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
      />
      <p v-if="errors.renterName" class="text-xs text-rose-400">{{ errors.renterName }}</p>
    </div>

    <div class="space-y-1">
      <label class="text-xs font-medium text-slate-400">Kontak</label>
      <input
        v-model="form.contact"
        type="text"
        placeholder="No. telepon atau email"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
      />
      <p v-if="errors.contact" class="text-xs text-rose-400">{{ errors.contact }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-400">Tanggal Pinjam</label>
        <input
          v-model="form.borrowDate"
          type="date"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <p v-if="errors.borrowDate" class="text-xs text-rose-400">{{ errors.borrowDate }}</p>
      </div>
      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-400">Tanggal Kembali</label>
        <input
          v-model="form.returnDate"
          type="date"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <p v-if="errors.returnDate" class="text-xs text-rose-400">{{ errors.returnDate }}</p>
      </div>
    </div>

    <p v-if="store.error" class="text-xs text-rose-400">{{ store.error }}</p>

    <button
      type="submit"
      :disabled="store.loading"
      class="w-full py-2.5 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 disabled:opacity-50 transition-colors"
    >
      {{ store.loading ? 'Memproses...' : 'Konfirmasi Peminjaman' }}
    </button>
  </form>
</template>
