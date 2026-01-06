# **3. Система управления контентом (Nuxt Content)**

## **3.1. Форматы хранения данных**

В проекте используется три основных формата для хранения контента, каждый из которых имеет свои преимущества для разных типов данных:

### **Markdown (.md)**
**Использование:** Текстовый контент с разметкой (статьи, новости, описания разделов)
**Примеры файлов:**
- `/content/clinic/about/index.md` — страница "О клинике"
- `/content/news/2024-11-04.md` — новость
- `/content/publications/*.md` — публикации

**Преимущества:**
- Простой синтаксис для форматирования текста
- Поддержка заголовков, списков, таблиц, изображений
- Возможность вставки HTML и Vue-компонентов

### **YAML (.yaml/.yml)**
**Использование:** Структурированные данные с иерархией (меню, контакты, документы)
**Примеры файлов:**
- `/content/data/navigation/navigation.yaml` — навигационное меню
- `/content/data/contacts/contacts.yaml` — контактная информация
- `/content/data/documents/documents.yaml` — метаданные документов

**Преимущества:**
- Читаемый формат с отступами
- Поддержка списков и вложенных объектов
- Идеально для конфигурационных данных

### **JSON (.json)**
**Использование:** Строго структурированные данные (врачи, FAQ, прайс-лист)
**Примеры файлов:**
- `/content/data/doctors/1.rodichkin.json` — данные врача
- `/content/data/faq/1.question.json` — вопрос-ответ
- `/content/data/pricelist/pricelist.yaml` — прайс-лист (в формате YAML)

**Преимущества:**
- Стандартный формат для обмена данными
- Строгая структура с типами данных
- Легко парсить и валидировать

## **3.2. Базовый синтаксис Markdown и Front Matter**

### **Front Matter (YAML в начале файла)**
Каждый Markdown файл может начинаться с секции Front Matter между тройными дефисами:

```markdown
---
title: 'Заголовок страницы'
date: '2024-01-15'
description: 'Краткое описание для SEO'
image: '/images/publications/cover.jpg'
category: 'Медицина'
tags: ['здоровье', 'реабилитация', 'ЛФК']
order: 1  # Порядок сортировки (необязательно)
---

# Основное содержимое
```

### **Базовый синтаксис Markdown**

```markdown
# Заголовок 1 уровня
## Заголовок 2 уровня
### Заголовок 3 уровня

**Жирный текст** или __жирный текст__
*Курсив* или _курсив_

- Маркированный список
- Второй элемент
  - Вложенный элемент

1. Нумерованный список
2. Второй элемент

[Текст ссылки](https://example.com)

![Альтернативный текст](/images/path/to/image.jpg)

> Цитата или важное замечание

`inline code`

```javascript
// Блок кода с указанием языка
const example = 'code';
```

| Таблица | С заголовками |
|---------|---------------|
| Ячейка 1 | Ячейка 2     |


```

## **3.3. Структура папки `/content`**

### **Организация по разделам**
```
    content/
    ├── clinic/           # Раздел "Клиника"
    ├── dimensions/       # Раздел "Направления"
    ├── patients/         # Раздел "Посетителям и пациентам"
    ├── news/            # Новости (динамический список)
    ├── publications/    # Публикации (динамический список)
    ├── reviews/         # Отзывы (динамический список)
    └── data/            # Структурированные данные

```
### **Файлы `index.md` для разделов**
Каждый раздел имеет файл `index.md`, который определяет главную страницу раздела:

```markdown
---
title: 'Клиника'
description: 'Информация о нашей клинике'
layout: 'default'
---

# Добро пожаловать в нашу клинику

Основное содержимое раздела...
```

## **3.4. Конфигурация Nuxt Content (`content.config.ts`)**

### **Определение коллекций**
Файл `content.config.ts` определяет структуру и валидацию данных:

```typescript
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Коллекция для страниц контента
    content: defineCollection({
      type: 'page',
      source: '**',  // Все файлы
    }),

    // Коллекция для врачей
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

    // Коллекция для FAQ
      faq: defineCollection({
          type: 'data',
          source: 'data/faq/**.json',
          schema: z.object({
              date: z.string(),
              name: z.string(),
              question: z.string(),
              avatar: z.string(),
              answer: z.string(),
              doctorName: z.string(),
          })
      }),

    // Коллекция для навигации
    menu: defineCollection({
      type: 'page',
      source: 'data/navigation/navigation.yaml',
    }),
  }
  ...
})
```

## **3.5. Запросы к контенту с помощью `queryContent()`**

### **Базовые запросы**

```vue
<!-- Пример в компоненте Vue: получение отзывов-->
<template>
  <div class="mx-auto space-y-8">
    <ReviewsCard
        v-for="review in sortedReviews"
        :key="review._path"
        :review="review"
    />
  </div>
</template>

<script setup>
  // Получение и сортировка отзывов
  const { data: reviews } = await useAsyncData('reviews', () =>
      queryCollection('reviews').all()
  );

  const sortedReviews = computed(() => {
    return [...(reviews.value || [])].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });
</script>
```

```vue
<!-- app/pages/news/list/[[page]].vue -->
<template>
  <div class="mx-auto">
    <div v-if="newsData?.news?.length">
      <NewsCard
          v-for="item in newsData.news"
          :key="item._path"
          :title="item.title"
          :date="item.date"
          :preview="item.preview"
          :path="item.path"
      />

      <Pagination
          :base-url="baseUrl"
          :current-page="currentPage"
          :total-pages="totalPages"
      />
    </div>

    <div v-else class="text-gray-600 text-center py-12">
      <p class="text-xl">Новостей пока нет</p>
    </div>
  </div>
</template>

<script setup>
  const ITEMS_PER_PAGE = 3
  const route = useRoute()
  const baseUrl = '/news/list' // Может быть передан как пропс при использовании в других местах

  const currentPage = computed(() => {
    const page = parseInt(route.params.page) || 1
    return page > 0 ? page : 1
  })

  const { data: newsData } = await useAsyncData(
      `news-${currentPage.value}`,
      async () => {
        const [news, total] = await Promise.all([
          queryCollection('news')
              .order('date', 'DESC')
              .limit(ITEMS_PER_PAGE)
              .skip((currentPage.value - 1) * ITEMS_PER_PAGE)
              .all(),
          queryCollection('news').count()
        ])
        return {news, total}
      }
  )

  const totalPages = computed(() =>
      Math.ceil(newsData.value?.total / ITEMS_PER_PAGE) || 1
  )

  if (currentPage.value > totalPages.value) {
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
  }
</script>

```

## **3.6. Отображение контента**

### **Использование `<ContentDoc />`**
В текущей реализации не используется
```vue
<template>
  <div class="container mx-auto px-4">
    <!-- Автоматическое отображение контента из текущего маршрута -->
    <ContentDoc />
  </div>
</template>
```

### **Ручное отображение с `<ContentRenderer />`**

```vue
<template>
  <ContentRenderer
      v-if="page"
      :value="page"
  />
</template>

<script setup lang="ts">
  const route = useRoute()

  const { data: page } = await useAsyncData('page-' + route.path, () => {
    return queryCollection('content').path(route.path).first();
  })

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })
  }
</script>
```

## **3.7. Работа с изображениями**

### **В Markdown файлах**

```markdown
![Альтернативный текст](/images/publications/cover.jpg)

![Фото врача](/images/doctors/ivanov.png "Доктор Иванов")

<img src="/images/doctors/ivanov.png" alt="Доктор Иванов"/>
```

### **В JSON/YAML данных**

```json
{
  "avatar": "/images/doctors/rodichkin.png",
  "gallery": [
    "/images/clinic/photo1.jpg",
    "/images/clinic/photo2.jpg"
  ]
}
```

## **3.8. Валидация схем данных**

### **Схема для новостей (пример расширения)**

```typescript
// В content.config.ts
const newsSchema = defineCollection({
  type: 'page',
  source: 'news/**.md',
  schema: z.object({
    title: z.string(),
    date: z.string().transform(str => new Date(str)),
    preview: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    category: z.enum(['События', 'Обновления', 'Акции']).default('События'),
    tags: z.array(z.string()).optional(),
  })
})
```

### **Валидация при разработке**

При запуске dev-сервера Nuxt Content автоматически проверяет соответствие данных схемам. При ошибке вы увидите сообщение в консоли:

```
[nuxt] [content] Validation error in data/doctors/5.invalid.json:
  - Expected string, received number at "positionFirst"
```

## **3.9. Расширенные возможности**

### **Кастомные компоненты в Markdown**

```vue
<!-- components/Custom/Alert.vue -->
<template>
  <div class="alert alert-{{ type }}">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, default: 'info' }
})
</script>
```

```markdown
---
title: 'Статья с кастомным компонентом'
---

# Заголовок

::alert{type="warning"}
Важная информация для пациентов!
::
```

### **Программная навигация**

```typescript
// Получение дерева навигации
const { data: navigation } = await useAsyncData('navigation', () => 
  queryContent()
    .where({ _partial: false }) // Исключаем частичные файлы
    .only(['title', '_path', 'description'])
    .find()
)
```

## **3.10. Лучшие практики**

1. **Согласованное именование файлов:**
    - Новости: `YYYY-MM-DD-slug.md`
    - Публикации: `slug-translit.md`
    - Врачи: `номер.фамилия.json`

2. **Оптимизация запросов:**
    - Используйте `only()` для выбора нужных полей
    - Кэшируйте часто используемые данные
    - Используйте пагинацию для больших списков

3. **Организация контента:**
    - Разделяйте контент по типам (данные, страницы, списки)
    - Используйте вложенные папки для сложных структур
    - Дублирующие данные выносите в YAML/JSON файлы

4. **Производительность:**
    - Используйте `<NuxtImg />` для оптимизации изображений
    - Включайте только необходимые поля в запросах
    - Используйте статическую генерацию где возможно

---

**В следующем разделе** мы подробно рассмотрим **"Детальное руководство по редактированию контента"**, где покажем конкретные примеры редактирования каждого раздела сайта через интерфейс GitHub.