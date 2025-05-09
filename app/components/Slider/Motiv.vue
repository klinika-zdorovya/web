<template>
  <div
      class="motiv-slider cursor-pointer mb-7 relative"
      :class="{
      'h-[300px] overflow-hidden': view === 'slider',
      'overflow-visible': view === 'list'
    }"
      @click="handleClick"
  >
    <Sticker text="Почему именно мы" />

    <template v-if="view === 'slider'">
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
            <SliderCard :slide="slide" :view="view" />
          </div>
        </div>
      </transition>
    </template>

    <template v-else>
      <div class="flex flex-wrap gap-y-1 gap-x-[0.2%]">
        <div
            v-for="(slide, index) in sliderMotivCollection"
            :key="index"
            class="lg:w-[33.2%] md:w-[49.5%] w-full"
        >
          <SliderCard :slide="slide" :view="view" class="py-10" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {useFormatText} from "~/composable/format.ts";

const props = defineProps({
  view: {
    type: String,
    default: 'slider',
    validator: (value) => ['slider', 'list'].includes(value),
  },
});

const { data: sliderMotivData } = await useAsyncData('sliderMotiv', () => {
  return queryCollection('sliderMotiv').first();
});

const sliderMotivCollection = sliderMotivData.value.meta.body;
const format = useFormatText();
const isMobile = ref(false);
const currentGroupIndex = ref(0);
let interval = null;

const groupSize = computed(() => isMobile.value ? 1 : 3);
const currentGroup = computed(() => {
  if (props.view === 'list') return [];
  const size = groupSize.value;
  const start = currentGroupIndex.value * size;
  return Array.from({ length: size }, (_, i) => {
    const index = (start + i) % sliderMotivCollection.length;
    return sliderMotivCollection[index];
  });
});

const nextGroup = () => currentGroupIndex.value += 1;

const handleClick = () => {
  if (props.view === 'slider') {
    nextGroup();
    resetInterval();
  }
};

const startInterval = () => {
  if (props.view === 'slider') {
    interval = setInterval(nextGroup, 8000);
  }
};

const resetInterval = () => {
  clearInterval(interval);
  startInterval();
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  if (props.view === 'slider') {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    startInterval();
  }
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

.list-card {
  transition: opacity 0.3s ease;
  cursor: crosshair;

  &:hover {
    opacity: 0.8;
  }
}
</style>