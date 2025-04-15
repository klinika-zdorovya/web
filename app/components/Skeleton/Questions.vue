<template>
  <div class="animate-pulse space-y-8 p-4">
    <!-- Элемент списка -->
    <div v-for="i in 3" :key="i" class="flex flex-col md:flex-row gap-6">
      <!-- Блок вопроса -->
      <div class="md:w-1/2 space-y-3">
        <!-- Дата и имя -->
        <div class="flex items-center gap-2">
          <div class="h-4 bg-gray-200 rounded w-1/5"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        <!-- Текст вопроса -->
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Блок ответа -->
      <div class="md:w-1/2 space-y-4">
        <!-- Заголовок ответа -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-200"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>

        <!-- Текст ответа -->
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="flex justify-center gap-2 mt-8">
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

@media (max-width: 767px) {
  .md\:flex-row {
    flex-direction: column;
  }
}
</style>