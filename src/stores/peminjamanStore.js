import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePeminjamanStore = defineStore('peminjaman', () => {
  const selectedCar = ref(null)
  const formData = ref({
    name: '',
    contact: '',
    borrowDate: '',
    returnDate: '',
  })
  const submitted = ref(false)

  function setSelectedCar(car) {
    selectedCar.value = car
  }

  function updateForm(field, value) {
    formData.value[field] = value
  }

  function resetForm() {
    formData.value = { name: '', contact: '', borrowDate: '', returnDate: '' }
    submitted.value = false
  }

  function markSubmitted() {
    submitted.value = true
  }

  return {
    selectedCar,
    formData,
    submitted,
    setSelectedCar,
    updateForm,
    resetForm,
    markSubmitted,
  }
})
