<template>
  <th
    @click="$emit('sort')"
    class="cursor-pointer select-none px-2 py-1 bg-gray-100 dark:bg-gray-800 sticky top-0 z-10"
  >
    <slot />
    <span v-if="active">
      {{ asc ? '↑' : '↓' }}
    </span>
  </th>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
  asc: boolean
}>()

defineEmits(['sort'])
</script>
