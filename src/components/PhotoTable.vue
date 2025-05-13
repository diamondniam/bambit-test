<template>
  <div>
    <div
      v-if="visiblePhotos?.length"
      class="max-h-[600px] max-w-[600px] mx-auto overflow-y-auto border"
      @scroll="onScroll"
      ref="scrollContainer"
    >
      <table class="min-w-full table-auto text-sm">
        <thead>
          <tr>
            <TableHeaderCell :active="sortField === 'id'" :asc="sortAsc" @sort="sort('id')"
              >Ид</TableHeaderCell
            >
            <TableHeaderCell
              :active="sortField === 'albumId'"
              :asc="sortAsc"
              @sort="sort('albumId')"
              >Альбом</TableHeaderCell
            >
            <TableHeaderCell :active="sortField === 'title'" :asc="sortAsc" @sort="sort('title')"
              >Название</TableHeaderCell
            >
            <TableHeaderCell :active="sortField === 'url'" :asc="sortAsc" @sort="sort('url')"
              >Ссылка</TableHeaderCell
            >
            <TableHeaderCell
              :active="sortField === 'thumbnailUrl'"
              :asc="sortAsc"
              @sort="sort('thumbnailUrl')"
              >Миниатюра</TableHeaderCell
            >
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="photo in visiblePhotos"
            :key="photo.id"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 border-b"
          >
            <td class="truncate px-2 py-1" :title="photo.id">{{ photo.id }}</td>
            <td class="truncate px-2 py-1" :title="photo.albumId">{{ photo.albumId }}</td>
            <td class="truncate px-2 py-1" :title="photo.title">{{ photo.title }}</td>
            <td class="truncate px-2 py-1" :title="photo.url">{{ photo.url }}</td>
            <td class="truncate px-2 py-1" :title="photo.thumbnailUrl">{{ photo.thumbnailUrl }}</td>
          </tr>
          <tr v-if="loading">
            <td colspan="5" class="text-center p-4">Загрузка...</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center p-4">Нет данных</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore'
import TableHeaderCell from './TableHeaderCell.vue'

const photosStore = usePhotosStore()
const visibleCount = ref(30)
const scrollContainer = ref<HTMLElement | null>(null)

const visiblePhotos = computed(() => {
  return photosStore.filteredPhotos.slice(0, visibleCount.value)
})

const loading = computed(() => photosStore.loading)
const sort = (field: string) => {
  photosStore.sortBy(field)
  visibleCount.value = 30
}

const sortField = computed(() => photosStore.sortField)
const sortAsc = computed(() => photosStore.sortAsc)

const onScroll = () => {
  if (!scrollContainer.value) return
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    visibleCount.value += 30
  }
}

watch(
  () => photosStore.filteredPhotos,
  () => {
    visibleCount.value = 30
  },
)
</script>
