<template>
  <div
      class="motiv-slider h-[300px] cursor-pointer overflow-hidden mb-7"
      @click="handleClick"
  >
    <transition name="fade" mode="out-in">
      <div
          :key="currentGroupIndex"
          class="h-full lg:flex md:justify-between"
      >
        <div
            v-for="(slide, index) in currentGroup"
            :key="index"
            class="h-full lg:w-[33.2%]"
        >
          <div class="h-full flex flex-col items-center bg-brand-ultra-light__dark/30 relative">
            <div class="flex-1 flex items-center justify-center w-full mb-28">
              <img
                  :src="slide.imageUrl"
                  class="h-20 object-contain"
                  alt="Logo"
              >
            </div>
            <h2 class="uppercase font-spb text-brand-light dark:text-brand-light__dark text-base text-center leading-tight absolute top-40 w-4/5" v-html="format.nl2br(slide.text)"></h2>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {useFormatText} from "~/composable/nl2br.js";

const format = useFormatText();

const { data: sliderMotivData } = await useAsyncData('sliderMotiv', () => {
  return queryCollection('sliderMotiv').first();
});

const sliderMotivCollection = sliderMotivData.value.meta.body;

const isMobile = ref(false);
const currentGroupIndex = ref(0);
let interval = null;

const groupSize = computed(() => isMobile.value ? 1 : 3);

const currentGroup = computed(() => {
  const size = groupSize.value;
  const start = currentGroupIndex.value * size;
  return Array.from({ length: size }, (_, i) => {
    const index = (start + i) % sliderMotivCollection.length;
    return sliderMotivCollection[index];
  });
});

const nextGroup = () => currentGroupIndex.value += 1;

const handleClick = () => {
  nextGroup();
  resetInterval();
};

const startInterval = () => {
  interval = setInterval(nextGroup, 8000);
};

const resetInterval = () => {
  clearInterval(interval);
  startInterval();
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
  startInterval();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
  clearInterval(interval);
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>