<template>
  <div class="relative mt-3 md:mt-5">
    <!-- Абсолютный заголовок -->
    <div class="absolute left-0 top-0 z-10 w-[145px] h-7 bg-brand-light text-white/90
    text-[10px] pl-2 items-center justify-center uppercase font-bold">
      Почему именно мы
    </div>

    <!-- Flex-контейнер -->
    <div class="flex flex-wrap justify-start gap-1 animate-pulse ">
      <div
          v-for="i in 8"
          :key="i"
          class="flex  md:w-[33%] flex-col items-center justify-center bg-brand-light/10 p-4 pt-12"
          :style="{
          flex: '0 0 auto'
        }"
      >
        <!-- Иконка -->
        <div class="w-20 h-20 mb-4 bg-brand-light/10 rounded-full"></div>

        <!-- Текст -->
        <div class="w-full space-y-2">
          <div class="h-4 bg-brand-light/10 rounded"></div>
          <div class="h-4 bg-brand-light/10 rounded w-5/6 mx-auto"></div>
          <div class="h-4 bg-brand-light/10 rounded w-4/5 mx-auto"></div>
          <div class="h-4 bg-brand-light/10 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Логика компонента
</script>

<style>
/* Адаптивность */
@media (max-width: 1284px) {
  div[style] {
    width: 49% !important;
    height: auto !important;
    aspect-ratio: 1 / 1;
  }
}

@media (max-width: 1024px) {
  div[style] {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 / 1;
  }
}

</style>