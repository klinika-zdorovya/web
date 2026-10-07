<template>
  <div class="container min-h-screen flex flex-col m-auto">
    <!-- Шапка для мобильной версии -->
    <header class="bg-brand-light shadow-md fixed w-full z-40 md:hidden">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between text-brand-ultra-light">
        <NuxtLink to="/">
          <LogoMain />
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
    <div class="flex mt-16 md:mt-0 relative">
      <!-- Боковое меню -->
      <nav
          :class="{ 'translate-x-0': isMenuOpen }"
          class="fixed md:relative transform transition-transform duration-300 ease-in-out
               w-[70vw] md:w-[270px] shadow-lg z-30 h-full
               bg-background-block dark:bg-background-block__dark
               md:translate-x-0 -translate-x-full overflow-auto md:overflow-visible"
      >
        <div class="h-full min-h-[calc(100vh - 76px)] flex-col">
          <LeftPanelLogo />
          <LeftPanelNavigation :navigation="navigation" @close-menu="closeMenu" />
          <DoctorCard name="Родичкин" view="short" />
        </div>
      </nav>

      <!-- Оверлей для мобильного меню -->
      <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-black/50 z-20 md:hidden"
          @click="isMenuOpen = false"
      ></div>

      <!-- Основное содержимое -->
      <main class="flex-1 bg-background-content dark:bg-background-content__dark">
        <div class="container">
          <!-- Хлебные крошки (скрываем на главной) -->
          <Breadcrumbs
              v-if="!isHomePage"
              :navigation="navigation"
              class="hidden md:flex bg-background-brand px-16 min-h-32 w-full"
          />

          <!-- Блок контента (убираем паддинги на главной) -->
          <div
              class="prose max-w-none mx-auto leading-7 min-h-[calc(100vh-278px)]"
              :class="{'px-4 my-4 md:my-6 md:px-16': !isHomePage}"
          >
            <transition
                mode="out-in"
                :name="transitionName"
            >
              <div class="content-wrapper" :key="$route.path">
                <slot />
              </div>
            </transition>
          </div>
        </div>
      </main>
    </div>

    <MainFooter />
  </div>
</template>

<script setup>
import {normalizeContentPath} from '~/composable/contentPath';
import {ref, provide, computed} from 'vue';
import LogoMain from '~/components/LogoMain.vue';
import MainFooter from '~/components/MainFooter.vue';
import {useRoute} from 'vue-router';
import {useStructuredData} from '~/composable/useStructuredData';

const route = useRoute();
const isHomePage = computed(() => route.path === '/');
const transitionName = computed(() =>
    isHomePage.value ? 'home-slide' : 'content-fade'
);
const isMenuOpen = ref(false);
const isMobile = ref(false);
const openItem = ref(null);

const {getAllStructuredData} = useStructuredData();

const setOpenItem = (path) => {
  openItem.value = path;
}
const {data} = await useAsyncData('menu', () => {
  return queryCollection('menu').first();
})

const closeMenu = () => isMenuOpen.value = false;

const navigation = data.value.body;


provide('mobileMenuState', {
  openItem,
  setOpenItem,
});

provide('isMobile', isMobile);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
}

// Функция для получения заголовка страницы
const getPageTitle = (path) => {
  const titles = {
    '/clinic': 'Клиника',
    '/clinic/about': 'О клинике',
    '/clinic/history': 'История создания',
    '/clinic/doctors': 'Наши специалисты',
    '/clinic/documents': 'Документы',
    '/clinic/manifest': 'Наш манифест',
    '/dimensions': 'Направления',
    '/dimensions/physculture': 'Лечебная физкультура',
    '/dimensions/reabilitation': 'Реабилитация пациентов с неврологическими заболеваниями',
    '/dimensions/provision': 'Обеспечение спортивных мероприятий',
    '/dimensions/therapy': 'Терапевтическое направление',
    '/patients': 'Посетителям и пациентам',
    '/patients/useful-tips': 'Полезные советы',
    '/patients/orthopedic-products': 'Ортопедическая продукция',
    '/pricelist': 'Цены на услуги',
    '/publications/list': 'Публикации',
    '/questions': 'Вопрос-ответ',
    '/reviews': 'Отзывы',
    '/news/list': 'Новости',
    '/contacts': 'Контакты'
  };
  const normalized = normalizeContentPath(path);
  if (titles[normalized]) return titles[normalized];

  // страницы-списки: /news/list/2, /publications/list/3
  const pageMatch = normalized.match(/^\/(news|publications)\/list\/(\d+)$/);
  if (pageMatch) {
    const name = pageMatch[1] === 'news' ? 'Новости' : 'Публикации';
    return `${name}, страница ${pageMatch[2]}`;
  }
  return null;
};

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

const siteUrl = useRuntimeConfig().public.siteUrl;
// Канонический адрес: с завершающим слэшем (так отдаёт папки статический хостинг).
const canonicalUrl = computed(() => {
  const path = route.path.endsWith('/') ? route.path : `${route.path}/`;
  return `${siteUrl}${path}`;
});

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],

  title: computed(() => {
    const pageTitle = route.meta.title || getPageTitle(route.path);
    return pageTitle ? `${pageTitle} | Клиника здоровья` : 'Клиника "Передовые технологии здоровья"';
  }),

  meta: [
    {
      name: 'description',
      content: 'Клиника мануальной терапии в Санкт-Петербурге. Лечение заболеваний опорно-двигательного аппарата, реабилитация после травм, лечебная физкультура.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Клиника "Передовые технологии здоровья"' },
    {
      property: 'og:title',
      content: computed(() => {
        const pageTitle = route.meta.title || getPageTitle(route.path);
        return pageTitle ? `${pageTitle} | Клиника здоровья` : 'Клиника "Передовые технологии здоровья"';
      })
    },
    { property: 'og:image', content: '/images/og-image.jpg' },
    { property: 'og:url', content: canonicalUrl },
    { name: 'robots', content: 'index, follow' }
  ],

  script: computed(() => {
    return getAllStructuredData().map(data => ({
      type: 'application/ld+json',
      children: JSON.stringify(data)
    }));
  }),

  htmlAttrs: {
    lang: 'ru'
  }
});

</script>

<style scoped>
/* анимация для всех страниц, кроме главной */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.30s, transform 0.1s;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* анимация для главной страницы */
.home-slide-enter-active {
  transition: all 0.25s ease-out;
}

.home-slide-leave-active {
  transition: all 0.15s ease-in;
}

.home-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.home-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>