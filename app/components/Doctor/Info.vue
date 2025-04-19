<template>
  <div class="mt-8 text-background-brand">
    <h5 class="font-bold uppercase">{{ doctor.name }}</h5>
    <div class="text-gray-600">{{ doctor.positionFirst }}</div>
    <div class="font-semibold2">{{ doctor.descriptionTitle }}</div>
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
