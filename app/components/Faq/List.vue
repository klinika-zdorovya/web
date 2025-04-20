<template>
  <div class="container mx-auto px-4">
    <div class="space-y-8 divide-y divide-divider">
      <FaqItem
          v-for="(item, index) in faq"
          :key="index"
          :faq="item"
      />
    </div>
  </div>
</template>

<script setup>
const { data: faq } = await useAsyncData('faq', () => {
  return queryCollection('faq')
      .all();
})
</script>