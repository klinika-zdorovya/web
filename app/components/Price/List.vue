<template>
  <div>
    <!-- Секции -->
    <div v-for="section in pricelist.body" :key="section.title" class="mb-8">
      <!-- Заголовок секции -->
      <h2 class="text-lg font-semibold mb-4">{{ section.title }}</h2>

      <!-- Таблица -->
      <div class="rounded-lg overflow-hidden border border-gray-100">
        <div
            v-for="(service, index) in section.services"
            :key="service.name"
            class="grid grid-cols-[1fr_142px] items-center px-4 py-3"
            :class="index % 2 === 0 ? 'bg-[#EFF4F4]' : 'bg-white'"
        >
          <!-- Название услуги -->
          <span class="text-gray-900">{{ service.name }}</span>

          <!-- Цена -->
          <div class="text-right font-medium text-gray-700">
            <template v-if="service.minPrice === service.maxPrice">
              {{ formatPrice(service.minPrice) }}
            </template>
            <template v-else>
              {{ formatPrice(service.minPrice) }}–{{ formatPrice(service.maxPrice) }}
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