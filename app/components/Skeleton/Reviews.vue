<template>
  <div class="animate-pulse space-y-6">
    <!-- Элемент отзыва -->
    <div v-for="i in 4" :key="i" class="flex gap-4 p-4 border-b border-gray-100">
      <!-- Аватар -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-full bg-gray-200"></div>
      </div>

      <!-- Основной контент -->
      <div class="flex-1 space-y-3">
        <!-- Заголовок -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="hidden sm:block h-4 bg-gray-200 rounded w-8"></div>
          <div class="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>

        <!-- Текст отзыва -->
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* Адаптивность */
@media (max-width: 640px) {
  .sm\:flex-row {
    flex-direction: column;
  }
}
</style>