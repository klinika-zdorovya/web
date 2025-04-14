<template>
  <NuxtLink
      :to="url"
      class="inline-block leading-10 px-6 mr-2.5 font-extrabold text-xs text-brand-light uppercase
      no-underline bg-background-block transition-colors duration-500 hover:bg-background-block-hover"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
const {url, text} = defineProps({
  url: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>