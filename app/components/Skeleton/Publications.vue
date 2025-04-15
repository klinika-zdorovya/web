<template>
  <div class="animate-pulse p-4">
    <!-- Список публикаций -->
    <div class="space-y-6 mb-8">
      <div v-for="i in 4" :key="i" class="flex gap-4">
        <!-- Картинка -->
        <div class="w-[90px] h-[124px] bg-gray-200"></div>

        <!-- Текстовая информация -->
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>

        <!-- Кнопка -->
        <div class="w-[142px] h-10 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="flex justify-center gap-2">
      <div class="w-8 h-8 bg-gray-200 rounded"></div>
      <div class="w-8 h-8 bg-gray-200 rounded"></div>
      <div class="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>

<script setup>
// Логика компонента
</script>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.5 }
}
</style>