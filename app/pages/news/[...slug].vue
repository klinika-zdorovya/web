<template>
  <div class="container mx-auto">
    <MainButton
        text="← Все новости"
        url="/news/list"
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
import {normalizeContentPath} from '~/composable/contentPath';
definePageMeta({ ownHeading: true });
const format = useFormatText();
const route = useRoute();
const contentPath = normalizeContentPath(route.path);

const { data: page } = await useAsyncData('page-' + contentPath, () => {
  return queryCollection('news').path(contentPath).first();
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false });
}

useHead({
  title: computed(() => page.value?.title ? `${page.value.title} | Клиника здоровья` : 'Новости'),
});
</script>
