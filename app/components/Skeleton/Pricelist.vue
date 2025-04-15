<template>
  <div class="animate-pulse">
    <!-- Секция услуг -->
    <div class="mb-8">
      <!-- Заголовок секции -->
      <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>

      <!-- Таблица -->
      <div class="rounded-lg overflow-hidden border border-gray-100">
        <div v-for="i in 5"
             :key="'service-' + i"
             class="grid grid-cols-[1fr_142px] items-center px-4 py-3"
             :class="i % 2 === 0 ? 'bg-white' : 'bg-[#EFF4F4]'">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Секция товаров -->
    <div>
      <!-- Заголовок секции -->
      <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>

      <!-- Таблица -->
      <div class="rounded-lg overflow-hidden border border-gray-100">
        <div v-for="i in 4"
             :key="'product-' + i"
             class="grid grid-cols-[1fr_142px] items-center px-4 py-3"
             :class="i % 2 === 0 ? 'bg-white' : 'bg-[#EFF4F4]'">
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
</template>