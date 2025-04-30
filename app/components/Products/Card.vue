<template>
  <div class="flex flex-col md:flex-row gap-6 md:gap-8">
    <!-- Изображение товара -->
    <img
        :src="product.imageUrl"
        :alt="product.title"
        class="w-full md:w-[280px] h-[280px] object-cover rounded-xl"
    />

    <!-- Контент товара -->
    <div class="flex-1 space-y-4">
      <h2 class="text-2xl font-semibold text-background-brand dark:text-brand-light__dark">
        {{ product.title }}
      </h2>

      <!-- Описание товара -->
      <div class="text-color-typography dark:text-color-typography__dark/90 text-base  space-y-3">
        {{ product.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  }
});
</script>
