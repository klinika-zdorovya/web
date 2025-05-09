<template>
  <NuxtLink
      class="
      absolute top-0 left-0 px-5
      bg-background-brand-green__dark text-brand-ultra-light"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
const {text} = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>