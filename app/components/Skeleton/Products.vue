<template>
  <div class="p-4 space-y-8">
    <!-- Контейнер товаров -->
    <div class="space-y-10">
      <!-- Блок товара -->
      <div v-for="n in 3" :key="n" class="group">
        <div class="flex flex-col md:flex-row gap-6 md:gap-8">
          <!-- Изображение -->
          <div class="w-full md:w-[280px] h-[280px] bg-gray-200 rounded-xl"></div>

          <!-- Контент -->
          <div class="flex-1 space-y-4">
            <!-- Название -->
            <div class="h-7 bg-gray-200 rounded w-2/3"></div>

            <!-- Описание -->
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- Разделитель -->
        <div v-if="n < 3" class="h-px bg-gray-100 mt-10"></div>
      </div>
    </div>
  </div>
</template>

<style>
/* Адаптивность */
@media (max-width: 768px) {
  .md\:flex-row {
    flex-direction: column;
  }
  .md\:w-\[280px\] {
    width: 100%;
    height: 200px;
  }
}
</style>