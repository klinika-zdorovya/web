<template xmlns="http://www.w3.org/1999/html">
    <ClientOnly>
        <button class="text-color-header__dark" @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'" title="Сменить тему">
          <svg
              v-if="isMounted"
              :key="colorMode.value"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Луна (темная тема) -->
            <path
                v-if="colorMode.value === 'light'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />

            <!-- Солнце (светлая тема) -->
            <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <template #fallback> <!-- Фолбэк для SSR -->
            <div class="w-6 h-6" /> <!-- Пустой контейнер -->
        </template>

    </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();
const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true;

    // Синхронизируем с localStorage при загрузке
    if (localStorage.getItem('nuxt-color-scheme')) {
        colorMode.preference = localStorage.getItem('nuxt-color-scheme')
    }
})

const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    // Форсируем сохранение
    localStorage.setItem('nuxt-color-scheme', colorMode.preference)
}
</script>

<style scoped>
svg {
  transition: transform 0.3s ease;
}

svg:hover {
  transform: rotate(15deg);
}
</style>
