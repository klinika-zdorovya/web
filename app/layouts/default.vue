<template>
  <div class="min-h-screen flex flex-col">
    <!-- Шапка -->
    <header class="bg-white shadow-md fixed w-full top-0 z-40 md:hidden">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-blue-600">Клиника Здоровья</NuxtLink>
        <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 focus:outline-none md:hidden"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Основной контент и меню -->
    <div class="flex flex-1 mt-16 md:mt-0">
      <!-- Боковое меню -->
      <nav
          class="fixed md:sticky md:top-0 transform transition-transform duration-300 ease-in-out
               w-[70vw] md:w-72 h-[calc(100vh-4rem)] md:h-[calc(100vh-80px)]
               bg-white shadow-md z-30
               md:translate-x-0 -translate-x-full md:overflow-x-auto"
          :class="{ 'translate-x-0': isMenuOpen }"
      >
        <div class="h-full flex flex-col">
          <div class="p-4 flex-1">
            <div class="hidden md:block mb-8">
              <NuxtLink to="/" class="text-xl font-bold text-blue-600">Клиника Здоровья</NuxtLink>
            </div>
            <ul class="space-y-2">
              <NavigationItem
                  v-for="link in navigation"
                  :key="link.path"
                  :item="link"
                  class="ml-0"
              />
            </ul>
          </div>

          <!-- Дополнительная информация -->
          <div class="p-4 border-t mt-auto">
            <div class="text-sm text-gray-500">
              Дополнительная информация<br>
              Телефон: +7 (XXX) XXX-XX-XX<br>
              Режим работы: 9:00-21:00
            </div>
          </div>
        </div>
      </nav>

      <!-- Оверлей для мобильного меню -->
      <div
          v-if="isMenuOpen"
          @click="isMenuOpen = false"
          class="fixed inset-0 bg-black/50 z-20 md:hidden"
      ></div>

      <!-- Основное содержимое -->
      <main class="flex-1 overflow-auto">
        <div class="container mx-auto px-4 py-6">
          <!-- Хлебные крошки -->
          <Breadcrumbs class="mb-6" />

          <div class="prose max-w-none">
            <slot />
          </div>
        </div>
      </main>
    </div>

    <!-- Футер -->
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-sm">
          © {{ new Date().getFullYear() }} Клиника Здоровья. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const isMenuOpen = ref(false);

// Блокировка скролла при открытом меню
watch(isMenuOpen, (val) => {
  if (process.client) {
    document.body.classList.toggle('menu-open', val)
  }
})

const navigation = [
  {
    title: 'Главная',
    fullTitle: 'Главная',
    path: '/',
  },
  {
    title: 'Клиника',
    fullTitle: 'Клиника',
    path: '/clinic/',
    children: [
      { title: 'О клинике', fullTitle: 'О клинике', path: '/clinic/about/' },
      { title: 'История создания', fullTitle: 'История создания', path: '/clinic/history/' },
      { title: 'Наши специалисты', fullTitle: 'Наши специалисты', path: '/clinic/doctors/' },
      { title: 'Документы', fullTitle: 'Документы', path: '/clinic/documents/' },
      { title: 'Наш манифест', fullTitle: 'Наш манифест', path: '/clinic/manifest/' },
    ]
  },
  {
    title: 'Направления',
    fullTitle: 'Направления',
    path: '/dimensions/',
    children: [
      { title: 'Лечебная физкультура', fullTitle: 'Лечебная физкультура', path: '/dimensions/physculture/' },
      { title: 'Реабилитация пациентов с неврологическими заболеваниями', fullTitle: 'Реабилитация пациентов с неврологическими заболеваниями', path: '/dimensions/reabilitation/' },
      { title: 'Обеспечение спортивных мероприятий', fullTitle: 'Обеспечение спортивных мероприятий', path: '/dimensions/provision/' },
      { title: 'Терапевтическое направление', fullTitle: 'Терапевтическое направление', path: '/dimensions/therapy/' },
    ]
  },
  {
    title: 'Посетителям и пациентам',
    fullTitle: 'Посетителям и пациентам',
    path: '/patients/',
    children: [
      { title: 'Полезные советы', fullTitle: 'Полезные советы', path: '/patients/useful-tips/' },
      { title: 'Ортопедическая продукция', fullTitle: 'Ортопедическая продукция', path: '/patients/orthopedic-products/' },
    ]
  },
  {
    title: 'Цены', fullTitle: 'Цены на услуги', path: '/pricelist/',
  },
  {
    title: 'Публикации', fullTitle: 'Публикации', path: '/publications/',
  },
  {
    title: 'Вопрос–ответ', fullTitle: 'Вопрос–ответ', path: '/questions/',
  },
  {
    title: 'Контактная информация', fullTitle: 'Контактная информация', path: '/contacts/',
  },
]
</script>

<style>
.router-link-active:not(.exact) {
  @apply bg-blue-50;
}

/* Анимация для мобильного меню */
 .transform {
   transition-property: transform;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   transition-duration: 300ms;
 }

/* Скрытие скролла при открытом меню */
body.menu-open {
  overflow: hidden;
}


</style>