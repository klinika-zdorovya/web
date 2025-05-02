<template>
  <div class="p-4 space-y-8">
    <div class="space-y-10">
      <div
          v-for="(product, index) in products"
          :key="product._path"
      >
        <ProductsCard :product="product"/>

        <!-- Разделитель -->
        <div
            v-if="index < products.length - 1"
            class="h-px bg-divider dark:bg-divider__dark mt-10"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {data: products} = await useAsyncData(`product`, () => {
      return queryCollection('products').all()
    }
)

</script>

<style scoped>
/* Адаптивные стили */
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