import axios from 'axios'

const BASE_URL = 'https://6a63478e1bffb2ffab8bf836.mockapi.io'

export function fetchCars() {
  return axios.get(`${BASE_URL}/cars`)
}

export function fetchCar(id) {
  return axios.get(`${BASE_URL}/cars/${id}`)
}

export function updateCar(id, data) {
  return axios.put(`${BASE_URL}/cars/${id}`, data)
}
