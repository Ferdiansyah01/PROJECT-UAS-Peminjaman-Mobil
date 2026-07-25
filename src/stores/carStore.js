import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCars, fetchCar, updateCar } from '../services/api'

export const useCarStore = defineStore('car', () => {
  const cars = ref([])
  const selectedCar = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const formData = ref({
    renterName: '',
    contact: '',
    borrowDate: '',
    returnDate: ''
  })

  const LS_KEY = 'peminjaman_records'

  const borrowingRecords = ref(loadRecords())

  function loadRecords() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {}
    } catch {
      return {}
    }
  }

  function saveRecords() {
    localStorage.setItem(LS_KEY, JSON.stringify(borrowingRecords.value))
  }

  const carTypes = computed(() => {
    const t = new Set(cars.value.map(c => c.type).filter(Boolean))
    return [...t].sort()
  })

  async function getCars() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchCars()
      cars.value = res.data
    } catch (err) {
      error.value = 'Gagal memuat data mobil, coba lagi'
    } finally {
      loading.value = false
    }
  }

  async function getCar(id) {
    loading.value = true
    error.value = null
    try {
      const res = await fetchCar(id)
      selectedCar.value = res.data
    } catch (err) {
      error.value = 'Gagal memuat data mobil, coba lagi'
    } finally {
      loading.value = false
    }
  }

  async function borrowCar(id) {
    loading.value = true
    error.value = null
    try {
      await updateCar(id, { available: false })
      const car = cars.value.find(c => c.id === id)
      if (car) car.available = false
      if (selectedCar.value && selectedCar.value.id === id) {
        selectedCar.value.available = false
      }
      borrowingRecords.value[id] = { ...formData.value }
      saveRecords()
      formData.value = { renterName: '', contact: '', borrowDate: '', returnDate: '' }
      return true
    } catch (err) {
      error.value = 'Gagal memproses peminjaman, coba lagi'
      return false
    } finally {
      loading.value = false
    }
  }

  async function returnCar(id) {
    loading.value = true
    error.value = null
    try {
      await updateCar(id, { available: true })
      delete borrowingRecords.value[id]
      saveRecords()
      const car = cars.value.find(c => c.id === id)
      if (car) car.available = true
      if (selectedCar.value && selectedCar.value.id === id) {
        selectedCar.value.available = true
      }
      return true
    } catch (err) {
      error.value = 'Gagal mengembalikan mobil, coba lagi'
      return false
    } finally {
      loading.value = false
    }
  }

  const borrowedCars = computed(() => cars.value.filter(c => !c.available))

  return {
    cars, selectedCar, loading, error, formData, borrowingRecords, carTypes, borrowedCars,
    getCars, getCar, borrowCar, returnCar
  }
})
