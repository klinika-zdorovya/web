<template>
  <div class="slider-main relative w-full h-[370px] bg-background-brand overflow-hidden">
    <!-- Слайды -->
    <div
        v-for="(slide, index) in sliderCollection"
        :key="index"
        :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
        @click="nextSlide"
        class="absolute inset-0 flex transition-opacity duration-1000 cursor-pointer"
    >
      <!-- Левый текстовый блок -->
      <div class="flex-1 flex flex-col justify-center px-8 py-2 text-white xl:pr-0">
        <h2 v-if="slide.header" class="font-spb text-brand-ultra-light mb-1">
          {{ slide.header }}
        </h2>
        <h2 v-if="slide.subheader" class="font-spb text-white mb-6">
          {{ slide.subheader }}
        </h2>
        <p class="text-base max-w-2xl leading-4 md:leading-6 md:pr-1" :class="{'mt-12': !slide.subheader}" v-html="format.nl2br(slide.text)"></p>
      </div>

      <!-- Правый блок с изображением (только на десктопе) -->
      <div class="hidden xl:block w-1/2 relative">
        <div class="h-full flex justify-end items-center">
          <img
              :src="slide.imageUrl"
              alt="Slide image"
              class="h-full max-w-full object-contain opacity-70"
          >
        </div>
      </div>
    </div>

    <!-- Навигационные точки -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
          v-for="(_, index) in sliderCollection"
          :key="index"
          :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
          class="w-3 h-3 rounded-full transition-colors duration-300"
          @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {useFormatText} from "~/composable/nl2br.js";

const format = useFormatText();

const {data: sliderData} = await useAsyncData('sliderMain', () => {
  return queryCollection('sliderMain').first()
});
const sliderCollection = sliderData.value.meta.body;

const currentSlide = ref(0);
let interval = null;

// Навигация
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % sliderCollection.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetInterval();
};

// Таймер
const startInterval = () => {
  interval = setInterval(nextSlide, 6000);
};

const resetInterval = () => {
  clearInterval(interval);
  startInterval();
};

// Жизненный цикл
onMounted(startInterval);
onUnmounted(() => clearInterval(interval));
</script>