<template>
  <div
      class="block mb-6 p-6 bg-background-block dark:bg-background-block__dark
      rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-crosshair">

    <article class="flex gap-6 mb-8">
      <!-- Изображение слева -->
      <div class="flex-shrink-0 w-[90x] h-[124px] overflow-hidden rounded-lg">
        <img
            :alt="title"
            :src="titlePhoto"
            class="object-cover w-full h-full"
        />
      </div>

      <!-- Контент справа -->
      <div class="flex-1">
        <!-- Дата -->
        <time class="text-sm ">
          {{ format.formatDate(date) }}
        </time>

        <!-- Заголовок -->
        <h2 class="font-spb text-xl mt-1 mb-2">
          {{ title }}
        </h2>

        <!-- Аннотация -->
        <div
            v-if="annotation"
            class="prose mb-3"
            v-html="format.nl2br(annotation)"
        />

        <!-- Кнопка -->
        {{ path }}
        <MainButton
            :url="path"
            text="Прочитать полностью"
        />
      </div>
    </article>
  </div>
</template>

<script setup>
import {useFormatText} from '~/composable/format';

const format = useFormatText();

const props = defineProps({
  titlePhoto: String,
  date: String,
  title: String,
  annotation: String,
  path: String
});
</script>