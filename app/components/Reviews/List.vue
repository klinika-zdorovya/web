<template>
  <div class="mx-auto space-y-8">
    <ReviewsCard
        v-for="review in sortedReviews"
        :key="review._path"
        :review="review"
    />
  </div>
</template>

<script setup>
// Получение и сортировка отзывов
const { data: reviews } = await useAsyncData('reviews', () =>
    queryCollection('reviews').all()
);

const sortedReviews = computed(() => {
  return [...(reviews.value || [])].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
</script>