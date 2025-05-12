<template>
  <div
      class="
      absolute top-0 left-0 px-5 pt-1 z-10
      bg-brand-light text-color-typography__dark text-[10px] font-bold uppercase"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
const {text} = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>