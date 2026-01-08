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
  ssr: false,
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://klinika-zdorovya.ru',
    }
  },
  plugins: ['./app/plugins/yandex-maps.client.ts'],
  routeRules: {
    '/publications/list/1': {
      redirect: '/publications/list',
    }
  },

  // SEO оптимизация
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
})