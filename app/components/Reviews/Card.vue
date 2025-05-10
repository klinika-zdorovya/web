<template>
  <div
      class="block mb-6 p-6 bg-background-block dark:bg-background-block__dark
      rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-crosshair">
    <div class="flex items-start gap-4 mb-4">
      <div v-if="review.authorPhoto" class="shrink-0">
        <img
            :alt="review.author"
            :src="review.authorPhoto"
            class="w-10 h-10 rounded-full object-cover"
        >
      </div>
      <div
          v-else
          :class="avatarColor"
          class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <span class="text-white font-medium">
          {{ getInitials(review.author) }}
        </span>
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold text-brand-light dark:text-brand-light__dark">{{ review.author }}</span>
          <span class="text-sm ">{{ format.formatDate(review.date) }}</span>
        </div>
      </div>
    </div>

    <ContentRenderer :value="review"/>
  </div>
</template>

<script setup>
import {useFormatText} from '~/composable/format';
import {computed} from 'vue';

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
});

const format = useFormatText();

// Цветовые классы для аватара
const colorClasses = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500'
];

// Генерация цвета на основе имени
const avatarColor = computed(() => {
  const name = props.review.author;
  const hash = Array.from(name).reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colorClasses[hash % colorClasses.length];
});

// Генерация инициалов
const getInitials = (name) => {
  const names = name.split(' ');
  let initials = names[0][0];
  if (names.length > 1) initials += names[names.length - 1][0];
  return initials.toUpperCase();
};
</script>