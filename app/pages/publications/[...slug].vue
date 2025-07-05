<template>
  <div class="container mx-auto">
    <MainButton
        text="← Все публикации"
        url="/publications/list"
    />

    <article class="prose max-w-none mt-2">
      <header class="mb-6">
        <div class="flex w-full flex-col md:flex-row md:justify-between mb-4 md:mb-8">
          <time class="text-sm">
            {{ format.formatDate(page.date) }}
          </time>
          <span class="md:text-right font-bold">{{page.authors}}</span>
        </div>
        <h1 class="text-brand-light dark:text-brand-light__dark mb-4 leading-7">
          {{ page.title }}
        </h1>
      </header>

      <!-- Обертка для изображения с обтеканием -->
      <div v-if="page.titlePhoto" class="float-left mr-4 mb-2">
        <img
            :src="page.titlePhoto"
            alt="Cover"
            class="rounded-lg shadow-lg max-w-[200px]"
        >
      </div>

      <!-- Отображение основного контента -->
      <ContentRenderer v-if="page" :value="page"/>
    </article>
  </div>
</template>

<script setup>
import {useFormatText} from '~/composable/format';
import {computed} from 'vue';

const format = useFormatText();
const route = useRoute();

const {data: page} = await useAsyncData('publication-' + route.path, () => {
  return queryCollection('publications').path(route.path).first();
})

useHead({
  title: computed(() => page.value?.title || 'Публикации')
});

if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: false});
}
</script>