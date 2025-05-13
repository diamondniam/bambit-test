import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePhotosStore = defineStore('photos', () => {
  const allPhotos = ref<any[]>([])
  const filteredPhotos = ref<any[]>([])
  const loading = ref(false)
  const sortField = ref<string | null>(null)
  const sortAsc = ref(true)

  const fetchPhotos = async (albumIds: number[] = []) => {
    loading.value = true
    const params = albumIds.map((id) => `albumId=${id}`).join('&')
    const url = `https://jsonplaceholder.typicode.com/photos${params ? '?' + params : ''}`
    const res = await fetch(url)
    const data = await res.json()
    allPhotos.value = data
    filteredPhotos.value = data.slice()
    sortField.value = null
    loading.value = false
  }

  const sortBy = (field: string) => {
    if (sortField.value === field) {
      sortAsc.value = !sortAsc.value
    } else {
      sortField.value = field
      sortAsc.value = true
    }
    filteredPhotos.value = [...allPhotos.value].sort((a, b) => {
      if (a[field] < b[field]) return sortAsc.value ? -1 : 1
      if (a[field] > b[field]) return sortAsc.value ? 1 : -1
      return 0
    })
  }

  return {
    allPhotos,
    filteredPhotos,
    loading,
    fetchPhotos,
    sortBy,
    sortField,
    sortAsc,
  }
})
