<template>
  <div class="min-h-screen flex flex-col">
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
    <div class="flex flex-1 mt-16 md:mt-0">
      <!-- Боковое меню -->
      <nav
          :class="{ 'translate-x-0': isMenuOpen }"
          class="fixed md:relative transform transition-transform duration-300 ease-in-out
               w-64 h-full bg-white shadow-md z-30
               md:translate-x-0 -translate-x-full"
      >
        <div class="p-4">
          <div class="hidden md:block mb-8">
            <NuxtLink class="text-xl font-bold text-blue-600" to="/">Клиника Здоровья</NuxtLink>
          </div>

          <ul class="space-y-2">
            <li v-for="link in navigation" :key="link.path">
              <NuxtLink
                  :to="link.path"
                  active-class="bg-blue-100 font-semibold"
                  class="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Оверлей для мобильного меню -->
      <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-black/50 z-20 md:hidden"
          @click="isMenuOpen = false"
      ></div>

      <!-- Основное содержимое -->
      <main class="flex-1 overflow-auto">
        <div class="container mx-auto px-4 py-6">
          <div class="prose max-w-none">
            <slot/>
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
const isMenuOpen = ref(false)

const navigation = [
  {title: 'Главная', path: '/'},
  {title: 'О клинике', path: '/about'},
  {title: 'История', path: '/history'},
  {title: 'Статьи', path: '/articles'},
]
</script>

<style>
/* Стили для активных ссылок */
.router-link-exact-active {
  @apply bg-blue-100 font-semibold;
}

/* Стилизация контента из nuxt/content */
.prose {
  @apply max-w-none;
}
.prose h1 {
  @apply text-3xl font-bold mb-4;
}
.prose h2 {
  @apply text-2xl font-bold mb-3;
}
.prose p {
  @apply mb-4 text-gray-700 leading-relaxed;
}
</style>