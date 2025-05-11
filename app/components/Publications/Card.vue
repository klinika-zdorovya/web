<template>
  <div
      class="flex mb-6 p-6 bg-background-block dark:bg-background-block__dark rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-crosshair">
    <!-- Текстовый блок -->
    <div class="overflow-hidden w-full">
      <!-- Изображение с обтеканием -->
      <div class="float-left mr-4 mb-0 w-[90px] h-[124px] overflow-hidden rounded-lg">
        <img
            :alt="title"
            :src="titlePhoto"
            class="object-cover w-full h-full"
        />
      </div>
      <!-- Дата -->
      <time class="text-sm text-gray-600 dark:text-gray-300 block">
        {{ format.formatDate(date) }}
      </time>

      <!-- Заголовок -->
      <h2 class="font-spb text-xl mt-1 mb-2">
        {{ title }}
      </h2>

      <!-- Аннотация -->
      <div
          v-if="annotation"
          class="prose dark:prose-invert text-gray-700 dark:text-gray-300 mb-3"
          v-html="format.nl2br(annotation)"
      />

      <div class="clear-both flex justify-end ">
        <MainButton
            :url="path"
            text="Прочитать полностью"
            class="shadow-md"
        />
      </div>
    </div>

    <!-- Кнопка в правом нижнем углу -->
    <div class="clear-both relative">

    </div>
  </div>
</template>

<script setup>
import {useFormatText} from '~/composable/format';

const format = useFormatText();

defineProps({
  titlePhoto: String,
  date: String,
  title: String,
  annotation: String,
  path: String
});
</script>