# **2. Структура проекта и настройка окружения**

## **2.1. Архитектура репозитория GitHub (актуальная структура)**

Организация репозитория:

```
klinika-zdorovya/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── main.yml            # Конфигурация деплоя (автоматическая сборка и публикация)
├── app/                        # Исходный код приложения Nuxt 3
│   ├── assets/                 # Статические активы
│   │   ├── css/               # CSS файлы
│   │   │   └── main.css
│   │   ├── fonts/             # Шрифты проекта
│   │   │   ├── petersburg-cyrillic/
│   │   │   └── proxima-nova/
│   │   └── scss/              # SCSS файлы
│   │       └── main.scss
│   ├── components/             # Vue-компоненты, сгруппированные по функциональности
│   │   ├── Breadcrumbs.vue
│   │   ├── Contacts/          # Компоненты для раздела контактов
│   │   ├── Doctor/            # Компоненты для отображения врачей
│   │   ├── Documents/         # Компоненты для документов
│   │   ├── Faq/               # Компоненты для FAQ
│   │   ├── LeftPanel/         # Левая панель навигации
│   │   ├── LogoMain.vue
│   │   ├── MainButton.vue
│   │   ├── MainFooter.vue
│   │   ├── News/              # Компоненты для новостей
│   │   ├── Pagination.vue
│   │   ├── Price/             # Компоненты для цен
│   │   ├── Products/          # Компоненты для продуктов
│   │   ├── Publications/      # Компоненты для публикаций
│   │   ├── Reviews/           # Компоненты для отзывов
│   │   ├── RoundButton.vue
│   │   ├── Skeleton/          # Skeleton-компоненты для загрузки
│   │   ├── Slider/            # Слайдеры
│   │   ├── Sticker.vue
│   │   └── ThemeSwitcher.vue
│   ├── composable/            # Composable функции Nuxt 3
│   │   └── format.ts
│   ├── layouts/               # Шаблоны страниц
│   │   └── default.vue
│   ├── pages/                 # Страницы (маршрутизация)
│   │   ├── [...slug].vue      # Динамические страницы для контента
│   │   ├── news/              # Новости
│   │   │   ├── [...slug].vue  # Детальная страница новости
│   │   │   └── list/          # Список новостей с пагинацией
│   │   │       └── [[page]].vue
│   │   ├── publications/      # Публикации
│   │   │   ├── [...slug].vue  # Детальная страница публикации
│   │   │   └── list/          # Список публикаций с пагинацией
│   │   │       └── [[page]].vue
│   │   └── reviews/           # Отзывы
│   │       └── index.vue      # Список отзывов
│   └── plugins/               # Плагины Nuxt
│       └── yandex-maps.client.ts  # Яндекс.Карты (только клиентский)
├── content/                    # ВСЁ СОДЕРЖИМОЕ САЙТА (контент)
│   ├── clinic/                # Раздел "Клиника"
│   │   ├── about/
│   │   │   └── index.md
│   │   ├── doctors/
│   │   │   └── index.md       # Список врачей (ссылается на data/doctors/)
│   │   ├── documents/
│   │   │   └── index.md       # Документы клиники
│   │   ├── history/
│   │   │   └── index.md       # История клиники
│   │   ├── index.md           # Главная страница раздела "Клиника"
│   │   └── manifest/
│   │       └── index.md       # Манифест клиники
│   ├── contacts/              # Контакты
│   │   └── index.md
│   ├── data/                  # Структурированные данные
│   │   ├── contacts/
│   │   │   └── contacts.yaml  # Контактная информация
│   │   ├── doctors/
│   │   │   ├── 1.rodichkin.json
│   │   │   ├── 2.pupkov.json
│   │   │   ├── 3.slyazin.json
│   │   │   └── 4.orlov.json   # Данные врачей в JSON
│   │   ├── documents/
│   │   │   └── documents.yaml # Метаданные документов
│   │   ├── faq/
│   │   │   ├── 1.question.json
│   │   │   └── 2.question.json # Вопросы-ответы в JSON
│   │   ├── navigation/
│   │   │   └── navigation.yaml # Навигационное меню
│   │   ├── pricelist/
│   │   │   └── pricelist.yaml # Прайс-лист
│   │   └── products/
│   │       ├── 1.matras.md
│   │       ├── 2.pillow.md
│   │       ├── 3.espander.md
│   │       └── 4.orto.md      # Описание продуктов в Markdown
│   ├── dimensions/            # Раздел "Направления"
│   │   ├── index.md           # Главная страница направлений
│   │   ├── physculture/       # Лечебная физкультура
│   │   │   └── index.md
│   │   ├── provision/         # Обеспечение спортивных мероприятий
│   │   │   └── index.md
│   │   ├── reabilitation/     # Реабилитация
│   │   │   └── index.md
│   │   └── therapy/           # Терапевтическое направление
│   │       └── index.md
│   ├── index.md               # Главная страница сайта
│   ├── news/                  # Новости (каждая - отдельный файл)
│   │   ├── 2024-11-04.md
│   │   ├── 2025-01-01.md
│   │   └── ...               # Файлы названы по дате публикации
│   ├── old/                   # Архивный контент
│   ├── patients/              # Раздел "Посетителям и пациентам"
│   │   ├── index.md
│   │   ├── orthopedic-products/
│   │   │   └── index.md       # Ортопедическая продукция
│   │   └── useful-tips/
│   │       └── index.md       # Полезные советы
│   ├── pricelist/             # Цены
│   │   └── index.md
│   ├── publications/          # Публикации (статьи)
│   │   ├── chetyre-kita-v-lechenii-osteohondroza-pozvonochnika.md
│   │   └── ...               # Файлы названы транслитом
│   ├── questions/             # Вопрос-ответ
│   │   └── index.md
│   ├── reviews/               # Отзывы
│   │   ├── 2014-05-22.md
│   │   └── ...               # Файлы названы по дате
│   └── typo.md                # Корректура
├── content.config.ts          # Конфигурация Nuxt Content
├── documentation/             # Документация проекта
│   ├── Chapter 1. Introduction/
│   │   └── Introduction.md
│   └── Chapter 2. Project structure/
│       └── Scructure.md
├── nuxt.config.ts             # Конфигурация Nuxt
├── package.json               # Зависимости и скрипты
├── pnpm-lock.yaml             # Фиксация версий зависимостей (pnpm)
├── public/                    # Статические файлы
│   ├── favicon.ico
│   └── images/                # Изображения
│       ├── doctors/           # Фото врачей
│       ├── documents/         # Изображения документов
│       ├── logo/              # Логотипы
│       ├── products/          # Изображения продуктов
│       ├── publications/      # Обложки публикаций
│       └── slider/            # Изображения для слайдеров
├── server/                    # Серверные файлы Nuxt
│   └── tsconfig.json
├── tailwind.config.js         # Конфигурация Tailwind CSS
└── tsconfig.json              # Конфигурация TypeScript
```

## **2.2. Локальная настройка для разработки**

### **Предварительные требования**

1. **Node.js** версии 18 или выше
   ```bash
   # Проверка версии Node.js
   node --version
   # Должно быть не ниже 18.0.0
   ```

2. **Git** для управления версиями
   ```bash
   git --version
   ```

3. **Пакетный менеджер pnpm** (уже используется в проекте)
   ```bash
   # Установка pnpm (если еще не установлен)
   npm install -g pnpm
   ```

### **Установка проекта**

```bash
# 1. Клонирование репозитория
git clone https://github.com/klinika-zdorovya/web.git
cd klinika-zdorovya

# 2. Установка зависимостей (используется pnpm)
pnpm install

# 3. Запуск сервера разработки
pnpm dev

# 4. Открыть в браузере
# Сервер будет доступен по адресу: http://localhost:3000
```

### **Доступные команды (из package.json)**

Команды, доступные в проекте:

| Команда | Описание |
|---------|----------|
| `pnpm dev` | Запуск сервера разработки с горячей перезагрузкой |
| `pnpm build` | Сборка проекта для production |
| `pnpm generate` | Генерация статического сайта |
| `pnpm preview` | Предпросмотр собранного проекта |
| `pnpm lint` | Проверка кода с помощью ESLint |

## **2.3. Обзор ключевых папок и файлов**

### **`/content/` — Ядро контента**

Особенности структуры контента в проекте:

1. **Смешанные форматы**: Используются Markdown, YAML и JSON
2. **Организация по типам**:
    - `data/` — структурированные данные (врачи, цены, FAQ)
    - `clinic/`, `dimensions/` и т.д. — текстовые разделы
3. **Конвенции именования**:
    - Новости и отзывы: `YYYY-MM-DD.md`
    - Публикации: транслитом с темой
    - Врачи: `номер.фамилия.json`

Пример файла врача в JSON:
```json
    {
      "name": "Родичкин Павел Васильевич",
      "positionFirst": "Учредитель и главный врач Клиники «Передовые технологии здоровья»",
      "positionSecond": "Главный врач и основатель Клиники, доктор медицинских наук, профессор Родичкин Павел Васильевич",
      "avatar": "/images/doctors/rodichkin.png",
      "descriptionTitle": "Стаж лечебной деятельности по мануальной терапии – более 30 лет.",
      "description": "Родился 25 июня 1966 в г. Одинцово Московской области\nВ 1983 г. окончил школу с золотой"
    }
```

### **`/app/components/` — Переиспользуемые компоненты**

Компоненты сгруппированы по функциональности:
- `Doctor/` — компоненты для отображения информации о врачах
- `News/` — компоненты для работы с новостями
- `Skeleton/` — skeleton-компоненты для состояния загрузки

Пример компонента:
```vue
<!-- app/components/Doctor/Avatar.vue -->
<template>
  <img
      :alt="doctor.name"
      :src="doctor.avatar"
      class="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover"
  >
</template>

<script setup lang="ts">
  const props = defineProps({
    doctor: {
      type: Object,
      required: true
    },
  })
</script>

```

### **`/app/pages/` — Маршрутизация**

Особенности маршрутизации:
- `[...slug].vue` — динамический маршрут для контентных страниц
- `news/[...slug].vue` — детальная страница новости
- `news/list/[[page]].vue` — список новостей с пагинацией

### **`/public/images/` — Изображения**

Структура изображений:
- `doctors/` — фотографии врачей
- `publications/` — обложки статей (организованы по папкам)
- `slider/` — изображения для слайдеров

## **2.4. Конфигурационные файлы**

### **`nuxt.config.ts` — Основная конфигурация**

```typescript
// nuxt.config.ts
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
        }
    },
    plugins: ['./app/plugins/yandex-maps.client.ts'],
    routeRules: {
        '/publications/list/:page': { prerender: true },
    },
})
```

### **`content.config.ts` — Конфигурация Content**

```typescript
// content.config.ts
import {defineContentConfig, defineCollection, z} from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**',
        }),

        menu: defineCollection({
            type: 'page',
            source: 'data/navigation/navigation.yaml',
        }),

        doctors: defineCollection({
            type: 'data',
            source: 'data/doctors/**.json',
            schema: z.object({
                name: z.string(),
                positionFirst: z.string(),
                positionSecond: z.string(),
                avatar: z.string(),
                description: z.string(),
                descriptionTitle: z.string(),
            })
        }),
        ...
}),;
```

### **`tailwind.config.js` — Конфигурация Tailwind**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        'components/**/*.{vue,js}',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'composables/**/*.{js,ts}',
        'plugins/**/*.{js,ts}',
        'App.{js,ts,vue}',
        'app.{js,ts,vue}'
    ],
    theme: {
        extend: {
            colors: {
                /*'background__dark': '#20201F',*/

                // Light
                'background': '#F3F8F8',
                'background-content': '#FAFAFA',
                'background-block': '#EFF4F4',
            }
        }
    }, 
    ...
  plugins: [],
};
```

## **2.5. Работа с контентом в разработке**

### **Добавление новой новости**

1. Создать файл в `/content/news/`:
   ```bash
   # Имя файла: ГГГГ-ММ-ДД.md
   touch content/news/2024-11-04.md
   ```

2. Заполнить содержимое:
   ```markdown
   ---
   title: 'С Днём народного единства! Вместе к здоровью, силе и взаимопониманию!'
   date: '2024-11-04'
   preview: 'Наш коллектив поздравляет с праздником единства и сплочённости! Желаем всем крепкого здоровья, доверия друг к другу и общих побед в борьбе за благополучие!'
   ---
   
   # Новое оборудование
   
   От всей души поздравляем вас с Днём народного единства — праздником, который напоминает нам, как важно сохранять связь поколений, поддерживать друг друга и идти к целям сообща!
   ```

### **Добавление нового врача**

1. Создать JSON файл в `/content/data/doctors/`:
   ```bash
   # Имя файла: номер.фамилия.json
   touch content/data/doctors/5.ivanov.json
   ```

2. Добавить фото врача в `/public/images/doctors/`:
   ```bash
   cp ~/Downloads/ivanov.jpg public/images/doctors/ivanov.png
   ```

3. Заполнить данные врача:
   ```json
   {
     "name": "Фамилия Имя Отчество",
     "positionFirst": "Должность",
     "positionSecond": "Должность для отображения на главной странице",
     "avatar": "/images/doctors/ivanov.png",
     "descriptionTitle": "Краткая информация о враче",
     "description": "Полная информаци о враче, с переносом строк через \n"
   }
   ```

## **2.6. Частые проблемы и решения**

### **Проблема: Контент не обновляется**
```bash
# Решение: Очистить кэш Nuxt
rm -rf .nuxt .output node_modules/.vite
pnpm dev
```

### **Проблема: Шрифты не загружаются**
```css
/* В app/assets/css/main.css добавить: */
@font-face {
  font-family: 'Petersburg';
  src: url('/fonts/petersburg-cyrillic/petersburg-cyrillic.woff2') format('woff2');
}
```

### **Проблема: Изображения не отображаются**
- Проверить путь в публичной папке: `/public/images/`
- Убедиться, что путь в контенте начинается с `/images/`
- Проверить права доступа к файлам

---

**В следующем разделе** подробно рассмотрим систему управления контентом (Nuxt Content 3), включая форматы хранения данных (Markdown, YAML, JSON), базовый синтаксис, работу с Front Matter, структуру контента и запросы к данным. Это поможет понять, как организован контент и как его редактировать.