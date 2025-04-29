<template>
  <div class="left-column hidden md:block bg-brand-light min-h-32 p-2 max-h-0">
    <NuxtLink class="text-h4_sm font-bold block font-spb uppercase my-2 ml-16" to="/">
      <LogoMain />
    </NuxtLink>
    <div class="phone text-center text-white text-xs font-bold leading-tight">
      <div class="">Запись по телефону</div>
      <a href="tel:78129042767" class="block pb-1.5 no-underline text-2xl font-extrabold -tracking-[0.01em]">+7 (812) 904-27-67</a>
    </div>
  </div>
</template>

<script setup lang="ts">

import LogoMain from "~/components/LogoMain.vue";
</script>

<style scoped>

</style>