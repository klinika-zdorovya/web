
<template>
  <div class="mx-auto">
    <div v-if="newsData?.news?.length">
      <NewsCard
          v-for="item in newsData.news"
          :key="item._path"
          :title="item.title"
          :date="item.date"
          :preview="item.preview"
          :path="item.path"
      />

      <!-- Пагинация (остается без изменений) -->
      <div class="mt-10 flex items-center justify-between border-t border-separate pt-6">
        <MainButton
            v-if="currentPage > 1"
            text="← Назад"
            :url="`/newslist/${currentPage - 1}`"
        />

        <span class="text-sm">
          Страница {{ currentPage }} из {{ totalPages }}
        </span>
        <MainButton
            v-if="currentPage < totalPages"
            text="Вперед →"
            :url="`/newslist/${currentPage + 1}`"
        />
      </div>
    </div>

    <div v-else class="text-gray-600 text-center py-12">
      <p class="text-xl">Новостей пока нет</p>
    </div>
  </div>
</template>

<script setup>
const ITEMS_PER_PAGE = 3;
const route = useRoute();

const currentPage = computed(() => {
  const page = parseInt(route.params.page) || 1;
  return page > 0 ? page : 1;
});

const { data: newsData } = await useAsyncData(
    `news-${currentPage.value}`,
    async () => {
      const [news, total] = await Promise.all([
        queryCollection('news')
            .order('date', 'DESC')
            .limit(ITEMS_PER_PAGE)
            .skip((currentPage.value - 1) * ITEMS_PER_PAGE)
            .all(),
        queryCollection('news').count()
      ]);
      return { news, total };
    }
);

const totalPages = computed(() =>
    Math.ceil(newsData.value?.total / ITEMS_PER_PAGE) || 1
);

if (currentPage.value > totalPages.value) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>