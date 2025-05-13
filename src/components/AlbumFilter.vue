<template>
  <div class="flex gap-2 mb-4">
    <input
      v-model="input"
      placeholder="Введите ID альбомов (напр. 1 2 3)"
      class="px-4 py-2 border rounded w-full"
    />
    <button :disabled="photosStore.loading" @click="onSearch">
      <span v-if="photosStore.loading">Загрузка...</span>
      <span v-else>Поиск</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore'

const input = ref(localStorage.getItem('albumInput') || '')
const photosStore = usePhotosStore()

const onSearch = () => {
  const ids = input.value
    .split(' ')
    .map((i) => parseInt(i))
    .filter((n) => !isNaN(n))
  photosStore.fetchPhotos(ids)
}

watch(
  () => input.value,
  (val) => {
    localStorage.setItem('albumInput', val)
  },
)

onMounted(() => {
  if (input.value) {
    onSearch()
  }
})
</script>
