<template>
  <div class="mx-auto">
    <div v-if="publicationsData?.publications?.length">
      <PublicationsCard
          v-for="item in publicationsData.publications"
          :key="item.path"
          :title="item.title"
          :date="item.date"
          :title-photo="item.titlePhoto"
          :annotation="item.annotation"
          :path="item.path"
      />

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          base-url="/publications/list"
      />
    </div>

    <div v-else class="text-gray-600 text-center py-12">
      <p class="text-xl">Публикаций пока нет</p>
    </div>
  </div>
</template>

<script setup>
const ITEMS_PER_PAGE = 25;
const route = useRoute();

const currentPage = computed(() => {
  const page = parseInt(route.params.page) || 1;
  return page > 0 ? page : 1;
});

const { data: publicationsData } = await useAsyncData(
    `publications-${currentPage.value}`,
    async () => {
      const [publications, total] = await Promise.all([
        queryCollection('publications')
            .order('date', 'DESC')
            .limit(ITEMS_PER_PAGE)
            .skip((currentPage.value - 1) * ITEMS_PER_PAGE)
            .all(),
        queryCollection('publications').count()
      ])

      return { publications, total };
    }
);

const totalPages = computed(() =>
    Math.ceil(publicationsData.value?.total / ITEMS_PER_PAGE) || 1
);

if (currentPage.value > totalPages.value) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>