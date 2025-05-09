<template>
  <div class="mx-auto">
    <div v-if="newsData?.length">
      <NewsCard
          v-for="item in newsData"
          :key="item._path"
          :title="item.title"
          :date="item.date"
          :preview="item.preview"
          :path="item.path"
      />
    </div>

    <div v-else class="text-gray-600 text-center py-12">
      <p class="text-xl">Новостей пока нет</p>
    </div>
  </div>
</template>

<script setup>
const ITEMS_PER_PAGE = 2;

const { data: newsData } = await useAsyncData(
    `news-list`,
    async () => {
      const news = await queryCollection('news')
          .order('date', 'DESC')
          .limit(ITEMS_PER_PAGE)
          .all();

      console.log('news', news);

      return news;
    }
);

console.log(newsData);
</script>