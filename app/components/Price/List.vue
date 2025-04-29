<template>
  <div>
    <!-- Секции -->
    <div v-for="section in pricelist.body" :key="section.title" class="mb-8">
      <!-- Заголовок секции с правым столбцом -->
      <div class="grid grid-cols-[1fr_142px] items-center px-4 border-b-[3px]
      border-brand-light dark:border-brand-light__dark mb-4 pb-2
           text-brand-light dark:text-brand-light__dark"
      >
        <h2 class="text-lg font-semibold">{{ section.title }}</h2>
        <div class="text-right font-medium">Стоимость, руб.</div>
      </div>

      <!-- Таблица -->
      <div class="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-400">
        <div
            v-for="(service, index) in section.services"
            :key="service.name"
            class="grid grid-cols-[1fr_142px] items-center px-4 py-3"
            :class="index % 2 === 0
            ? 'bg-background-block dark:bg-background-block__dark'
            : 'bg-background-content dark:bg-background-content__dark'
            "
        >
          <!-- Название услуги -->
          <span class="text-gray-900 dark:text-gray-400">{{ service.name }}</span>

          <!-- Цена -->
          <div class="text-right font-medium text-gray-700 dark:text-gray-200">
            <template v-if="service.minPrice === service.maxPrice">
              {{ formatPrice(service.minPrice) }}
            </template>
            <template v-else>
              {{ formatPrice(service.minPrice) }} – {{ formatPrice(service.maxPrice) }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { data: pricelist } = await useAsyncData('pricelist', () => {
  return queryCollection('pricelist').first()
})

console.log('pricelist', pricelist )

// Форматирование цены
const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
</script>