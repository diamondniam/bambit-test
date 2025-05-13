<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
    <div class="max-w-[600px] mx-auto flex flex-col gap-3">
      <button class="self-end" @click="toggleTheme">{{ theme === 'light' ? '🌜' : '🌞' }}</button>
      <AlbumFilter />
      <PhotoTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlbumFilter from './components/AlbumFilter.vue'
import PhotoTable from './components/PhotoTable.vue'
import { onMounted, ref } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  const html = document.documentElement
  const dark = html.classList.toggle('dark')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  theme.value = dark ? 'dark' : 'light'
}

onMounted(() => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})
</script>
