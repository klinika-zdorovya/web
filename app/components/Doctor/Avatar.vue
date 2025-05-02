<template>
    <img
        :alt="doctor.name"
        :src="doctor.avatar"
        class="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover"
    >
</template>

<script setup lang="ts">
const props = defineProps({
  doctor: {
    type: Object,
    required: true
  },
})
</script>
