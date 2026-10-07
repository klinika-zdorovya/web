<template>
  <!-- На главной нет видимого заголовка; для поиска и скринридеров нужен один <h1>. -->
  <h1 v-if="isHome" class="sr-only">Клиника «Передовые технологии здоровья»: мануальная терапия в Санкт-Петербурге</h1>
  <ContentRenderer
      v-if="page"
      :value="page"
  />
</template>

<script setup lang="ts">
import {normalizeContentPath} from '~/composable/contentPath';
const route = useRoute()
const contentPath = normalizeContentPath(route.path);
const isHome = contentPath === '/';

const { data: page } = await useAsyncData('page-' + contentPath, () => {
  return queryCollection('content').path(contentPath).first();
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })
}

useHead({
  title: computed(() => page.value?.title ? `${page.value.title} | Клиника здоровья` : undefined),
});
</script>