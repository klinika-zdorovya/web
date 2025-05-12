<template>
  <NuxtLink
      :to="path" class="block mb-6 p-6 bg-background-block dark:bg-background-block__dark rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div class="flex justify-between items-start mb-3">
      <h2 class="text-xl font-semibold text-brand-light dark:text-brand-light__dark">{{ title }}</h2>
      <span class="text-sm whitespace-nowrap ml-4">
        {{ formatDate(date) }}
      </span>
    </div>
    <p class="leading-relaxed">{{ preview }}</p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>