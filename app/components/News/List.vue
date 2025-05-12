<template>
  <div class="mx-auto relative">
    <sticker text="Новости клиники" />
    <div v-if="newsData?.length" class="pt-9">
      <NewsCard
          v-for="(item, index) in newsData"
          :key="item._path"
          :title="item.title"
          :date="item.date"
          :preview="item.preview"
          :path="item.path"
          :class="{'mb-2': index === newsData?.length - 1}"
      />
    </div>

    <div v-else class="text-gray-600 text-center py-12">
      <p class="text-xl">Новостей пока нет</p>
    </div>
  </div>
</template>

<script setup>
const ITEMS_PER_PAGE = 2;

const {data: newsData} = await useAsyncData('news-list', async () => {
      return await queryCollection('news')
          .order('date', 'DESC')
          .limit(ITEMS_PER_PAGE)
          .all();
    }
);

</script>