<template>
  <div :class="{ 'list-card': view === 'list' }"
       class="h-full flex flex-col items-center bg-brand-ultra-light__dark/30 relative">
    <div :class="{ 'mb-28': view === 'slider' }" class="flex-1 flex items-center justify-center w-full">
      <img
          :src="slide.imageUrl"
          alt="Logo"
          class="h-20 object-contain"
      >
    </div>
    <h2
        :class="view === 'slider' ? 'absolute top-40 w-4/5' : 'mt-4 px-4'"
        class="uppercase font-spb text-brand-light dark:text-brand-light__dark text-base text-center leading-tight"
        v-html="format.nl2br(slide.text)"
    ></h2>
  </div>
</template>

<script setup>
import {useFormatText} from '~/composable/format.ts';

const format = useFormatText();

const props = defineProps({
  slide: {
    type: Object,
    required: true,
  },
  view: {
    type: String,
    default: 'slider',
    validator: (value) => ['slider', 'list'].includes(value),
  },
});
</script>