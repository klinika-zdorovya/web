// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  css: [
      './app/assets/css/main.css',
      './app/assets/scss/main.scss',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'nuxt-color-scheme',    // Явно указываем ключ хранилища
    dataValue: 'theme',                 // Используем data-theme атрибут для надежности
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  ssr: true,
  experimental: {
    payloadExtraction: false
  },
  router: {
    options: {
      strict: false
    }
  },
  sourcemap: false,
  runtimeConfig: {
    public: {
      yandexMapsApiKey: '1c0b9327-7844-434a-a494-cfe26e5759de', //process.env.YANDEX_MAPS_API_KEY
    }
  },
  plugins: ['./app/plugins/yandex-maps.client.ts'],
  routeRules: {
    '/publications/list/:page': { prerender: true },
  },
})