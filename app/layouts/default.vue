<template>
  <div class="container min-h-screen flex flex-col max-w-screen-xl m-auto">
    <!-- Шапка -->
    <header class="bg-white shadow-md fixed w-full top-0 z-40 md:hidden">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink class="text-xl font-bold text-blue-600" to="/">Клиника Здоровья</NuxtLink>
        <button
            class="p-2 focus:outline-none md:hidden"
            @click="isMenuOpen = !isMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Основной контент и меню -->
    <div class="flex mt-16 md:mt-0">
      <!-- Боковое меню -->
      <nav
          :class="{ 'translate-x-0': isMenuOpen }"
          class="fixed md:sticky md:top-0 transform transition-transform duration-300 ease-in-out
               w-[70vw] md:w-72 h-[calc(100vh-4rem)] md:h-[calc(100vh-69px)]
               bg-background-block shadow-md z-30
               md:translate-x-0 -translate-x-full overflow-auto md:overflow-visible"
      >
        <div class="h-full flex flex-col">
          <LeftPanelLogo />
          <LeftPanelNavigation :navigation="navigation" />
          <LeftPanelBottomInfo />
        </div>
      </nav>

      <!-- Оверлей для мобильного меню -->
      <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-black/50 z-20 md:hidden"
          @click="isMenuOpen = false"
      ></div>

      <!-- Основное содержимое -->
      <main class="flex-1 bg-background-content">
        <div class="container">
          <!-- Хлебные крошки -->
          <Breadcrumbs class="hidden md:flex md:fixed md:top-0 bg-background-brand pl-4 min-h-28 w-full max-w-[992px]"/>

          <div class="prose max-w-none mx-auto px-4 mt-8 md:mt-28">
            <slot/>
          </div>
        </div>
      </main>
    </div>

    <!-- Футер -->
    <footer class="bg-background-brand-dark text-white mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-sm">
          © 2011-{{ new Date().getFullYear() }} Клиника Здоровья. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {ref, provide} from 'vue';

const isMenuOpen = ref(false);
const isMobile = ref(false);
const openItem = ref(null);

const setOpenItem = (path) => {
  openItem.value = path;
}
const {data} = await useAsyncData('menu', () => {
  return queryCollection('menu').first();
})

const navigation = data.value.body;


provide('mobileMenuState', {
  openItem,
  setOpenItem,
});

provide('isMobile', isMobile);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
}


// Блокировка скролла при открытом меню
watch(isMenuOpen, (val) => {
  if (process.client) {
    document.body.classList.toggle('menu-open', val);
  }
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});



</script>

<style>


</style>