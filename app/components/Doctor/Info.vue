<template>
  <div class="md:mt-12 text-background-brand leading-4">
    <h5 class="font-bold uppercase">{{ doctor.name }}</h5>
    <div class="text-gray-600 mt-2 md:mt-3">{{ doctor.positionFirst }}</div>
    <div class="italic mt-2 md:mt-3">{{ doctor.descriptionTitle }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  doctor: {
    type: Object,
    required: true
  },
})
</script>
