<template>
  <div class="animate-pulse p-4 md:p-6">
    <!-- Основной блок контактов -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Левый блок - контактная информация -->
      <div class="space-y-6">
        <!-- Адрес -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        <!-- Телефон -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <!-- Время работы -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/5"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>

      <!-- Правый блок - карта -->
      <div class="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
        <!-- Пин на карте -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="flex flex-col items-center gap-2">
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div class="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительная информация (для мобильной версии) -->
    <div class="md:hidden space-y-4">
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
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