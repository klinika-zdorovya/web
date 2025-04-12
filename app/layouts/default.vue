<template>
  <div class="container min-h-screen flex flex-col m-auto">
    <!-- Шапка для мобильной версии -->
    <header class="bg-white shadow-md fixed w-full z-40 md:hidden">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink class="text-xl font-bold text-blue-600 " to="/">
          Клиника Здоровья
        </NuxtLink>
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
          class="fixed md:relative transform transition-transform duration-300 ease-in-out
               w-[70vw] md:w-[270px] bg-background-block shadow-lg z-30 h-full
               md:translate-x-0 -translate-x-full overflow-auto md:overflow-visible"
      >
        <div class="h-full min-h-[calc(100vh - 76px)] flex-col">
          <LeftPanelLogo />
          <LeftPanelNavigation :navigation="navigation" />
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
          <Breadcrumbs
              :navigation="navigation"
              class="hidden md:flex bg-background-brand pl-4 min-h-32 w-full"
          />

          <div class="prose max-w-none mx-auto px-4 my-8 md:px-16 leading-7 min-h-[calc(100vh-268px)]">
              <transition mode="out-in" name="content-fade">
                <div class="content-wrapper" :key="$route.path">
                  <slot />
                </div>
              </transition>

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
.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.30s, transform 0.1s;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>



То есть, как видишь, шрифт определяется как petersburg-web. Хз, что это за шрифт, может, переименованный, может, редкий, может плохо искал, может, нет в бесплатном доступе. Ну, не суть. Пытаюсь подобрать подходящий, взял шрифт "Petersburg Cyrillic". Вроде, и близок, но как будто не так, у меня с глазомером то тут не очень, но, кажется, начертание не то, а других нет.

Может, посоветуешь какой-нибудь шрифт такого плана. То есть, навскидку, что то типа: "университет" + "засечки". Не знаю, как правильно сформулировать