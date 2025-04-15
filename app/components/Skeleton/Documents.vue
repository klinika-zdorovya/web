<template>
  <div class="p-4 md:p-6">
    <!-- Заголовок -->
    <div class="mb-6 animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/4 max-w-[200px] mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/6 max-w-[120px]"></div>
    </div>

    <!-- Галерея -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <div
          v-for="i in 8"
          :key="i"
          class="group cursor-pointer animate-pulse"
      >
        <!-- Контейнер для превью -->
        <div class="relative bg-gray-200 rounded-lg overflow-hidden"
             :style="{ paddingTop: '141.333%' }"> <!-- 318/225*100% -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <!-- Подпись -->
        <div class="mt-3">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Скелетон для модалки (скрыт по умолчанию) -->
    <div v-if="false" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div class="bg-white w-full max-w-4xl rounded-xl p-6 animate-pulse">
        <!-- Основной слайд -->
        <div class="bg-gray-200 rounded-lg aspect-[3/4] mb-4"></div>

        <!-- Навигация -->
        <div class="flex justify-between items-center">
          <div class="h-4 bg-gray-200 rounded w-24"></div>
          <div class="flex gap-2">
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>