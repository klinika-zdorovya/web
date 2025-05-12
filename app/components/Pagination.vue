<template>
  <div class="mt-10 flex items-center justify-between border-t border-separate pt-6">
    <MainButton
        v-if="currentPage > 1"
        text="← Назад"
        :url="previousPageUrl"
    />

    <span class="text-sm">
      Страница {{ currentPage }} из {{ totalPages }}
    </span>

    <MainButton
        v-if="currentPage < totalPages"
        text="Вперед →"
        :url="nextPageUrl"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  baseUrl: {
    type: String,
    default: '/newslist'
  }
})

const previousPageUrl = computed(() => `${props.baseUrl}/${props.currentPage - 1}`)
const nextPageUrl = computed(() => `${props.baseUrl}/${props.currentPage + 1}`)
</script>