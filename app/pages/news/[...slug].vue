<template>
  <div class="container mx-auto">
    <MainButton
        text="← Все новости"
        url="/newslist"
    />

    <article class="p-8 pt-0 rounded-lg shadow-md">
      <header class="mb-6">
        <time class="text-sm block mb-4 text-right">
          {{ format.formatDate(page.date) }}
        </time>
        <h1 class="text-brand-light dark:text-brand-light__dark mb-4">
          {{ page.title }}
        </h1>
        <p class="mb-6 text-xl">
          {{ page.preview }}
        </p>
      </header>
      <ContentRenderer
          v-if="page"
          :value="page"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
import {useFormatText} from '~/composable/format';
const format = useFormatText();
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('news').path(route.path).first();
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false });
}
</script>
