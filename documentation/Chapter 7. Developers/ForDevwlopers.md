# **7. Для разработчиков: Расширение функциональности**

## **7.1. Добавление нового раздела**

### **Пример: Добавление раздела "Акции и скидки"**

#### **Шаг 1: Создание структуры контента**

1. **Создайте папку для раздела:**
   ```bash
   mkdir -p content/akcii
   ```

2. **Создайте главную страницу раздела:**
   ```bash
   touch content/akcii/index.md
   ```

3. **Заполните содержание:**
   ```markdown
   # Акции и скидки
   
   Текущие акции и специальные предложения клиники.
   
   ## ::main-button
   Подробнее об условиях
   ```

#### **Шаг 2: Добавление в навигационное меню**

1. **Отредактируйте `navigation.yaml`:**
   ```yaml
   # content/data/navigation/navigation.yaml
   body:
     - title: Клиника
       # ... существующие разделы
     
     - title: Акции
       fullTitle: Акции и скидки
       path: /akcii/
       children:
         - title: Текущие акции
           fullTitle: Текущие акции
           path: /akcii/current/
         - title: Архив акций
           fullTitle: Архив акций
           path: /akcii/archive/
     
     - title: Направления
       # ... остальное меню
   ```

#### **Шаг 3: Создание дочерних страниц**

1. **Создайте подразделы:**
   ```bash
   mkdir -p content/akcii/current
   mkdir -p content/akcii/archive
   
   touch content/akcii/current/index.md
   touch content/akcii/archive/index.md
   ```

2. **Заполните содержание подразделов:**
   ```markdown
   # content/akcii/current/index.md
   ---
   title: 'Текущие акции'
   ---
   
   ## Акция "Здоровый позвоночник"
   
   С 1 по 31 января скидка 20% на все процедуры...
   ```

## **7.2. Изменение стилей (Tailwind CSS)**

### **Расширение темы Tailwind**

У вас уже есть полная конфигурация Tailwind с кастомными цветами, шрифтами и размерами. Вот как использовать существующие классы:

#### **Использование кастомных цветов:**

```vue
<template>
  <!-- Использование кастомных цветов -->
  <div class="bg-background text-color-typography">
    <!-- Основной фон и цвет текста -->
    
    <div class="bg-background-content p-6 rounded-lg">
      <!-- Контентная область -->
    </div>
    
    <button class="bg-brand-light hover:bg-brand-light/90 text-white">
      <!-- Брендовая кнопка -->
    </button>
    
    <div class="border border-divider">
      <!-- Разделитель -->
    </div>
  </div>
</template>
```

#### **Использование кастомных шрифтов:**

```vue
<template>
  <div>
    <!-- Шрифт Petersburg Cyrillic -->
    <h1 class="font-spb text-h1 font-bold">
      Заголовок с фирменным шрифтом
    </h1>
    
    <!-- Шрифт Proxima Nova -->
    <p class="font-proxima-nova text-base">
      Основной текст с читаемым шрифтом
    </p>
  </div>
</template>
```

#### **Использование кастомных размеров отступов:**

```vue
<template>
  <div class="px-section_x_sm lg:px-section_x py-section_y_sm lg:py-section_y">
    <!-- Отступы секции, адаптивные для мобильных и десктопов -->
    Контент секции
  </div>
</template>
```

#### **Создание кастомных CSS-классов:**

1. **Добавьте кастомные стили в `app/assets/css/main.css`:**
   ```css
   /* app/assets/css/main.css */
   @layer components {
     /* Кнопки с использованием кастомных цветов */
     .btn-primary {
       @apply bg-brand-light text-white px-6 py-3 rounded-lg font-medium 
              hover:bg-brand-light/90 transition-colors duration-300 
              focus:outline-none focus:ring-2 focus:ring-brand-light focus:ring-offset-2;
     }
     
     .btn-secondary {
       @apply bg-background-brand-green text-white px-6 py-3 rounded-lg font-medium 
              hover:bg-background-brand-green-hover transition-colors duration-300;
     }
     
     /* Карточки с использованием кастомных цветов */
     .card {
       @apply bg-background-content rounded-xl shadow-lg p-6 border border-divider 
              hover:shadow-xl transition-shadow duration-300;
     }
     
     .card-hover {
       @apply transform hover:-translate-y-1 transition-transform duration-300;
     }
     
     /* Панели */
     .panel {
       @apply bg-gradient-to-br from-brand-light to-background-brand-green 
              text-white rounded-2xl p-8;
     }
     
     /* Типографика с использованием кастомных размеров */
     .heading-1 {
       @apply text-h1_sm lg:text-h1 font-bold font-spb text-brand-light mb-6;
     }
     
     .heading-2 {
       @apply text-h2_sm lg:text-h2 font-semibold font-spb text-brand-light mb-4;
     }
     
     .body-text {
       @apply font-proxima-nova text-base text-color-typography leading-base;
     }
   }

   @layer utilities {
     /* Анимации */
     .animate-fade-in {
       animation: fadeIn 0.5s ease-in-out;
     }
     
     /* Темная тема поддержка */
     .dark .text-brand-light {
       color: var(--brand-light__dark);
     }
     
     .dark .bg-background {
       background-color: var(--background__dark);
     }
     
     /* Обрезка текста */
     .text-clamp-2 {
       display: -webkit-box;
       -webkit-line-clamp: 2;
       -webkit-box-orient: vertical;
       overflow: hidden;
     }
   }
   ```

#### **Пример компонента с использованием всех кастомных стилей:**

```vue
<!-- app/components/UI/FeatureCard.vue -->
<template>
  <div class="feature-card card card-hover">
    <div class="feature-icon mb-4 p-3 bg-brand-ultra-light rounded-lg inline-block">
      <Icon :name="icon" class="w-8 h-8 text-brand-light" />
    </div>
    
    <h3 class="feature-title heading-2">
      {{ title }}
    </h3>
    
    <p class="feature-description body-text">
      {{ description }}
    </p>
    
    <div v-if="action" class="mt-4">
      <button 
        class="btn-secondary text-sm px-4 py-2"
        @click="$emit('action')"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  action: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<style scoped>
.feature-card {
  height: 100%;
}

.feature-icon {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

/* Темная тема */
:global(.dark) .feature-icon {
  background-color: var(--brand-ultra-light__dark);
}
</style>
```

## **7.3. Интеграция внешних сервисов**

### **Интеграция формы обратной связи с EmailJS**

1. **Создайте компонент формы:**
   ```bash
   touch app/components/Forms/ContactForm.vue
   ```

2. **Реализуйте компонент (адаптированный под стили проекта):**
   ```vue
   <!-- app/components/Forms/ContactForm.vue -->
   <template>
     <form @submit.prevent="handleSubmit" class="space-y-6">
       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
           <label class="block text-sm font-proxima-nova font-medium text-color-typography mb-2">
             Имя *
           </label>
           <input
             v-model="form.name"
             type="text"
             required
             class="w-full px-4 py-2 border border-divider rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent bg-background-content text-color-typography"
             placeholder="Ваше имя"
           />
         </div>
         
         <div>
           <label class="block text-sm font-proxima-nova font-medium text-color-typography mb-2">
             Телефон *
           </label>
           <input
             v-model="form.phone"
             type="tel"
             required
             class="w-full px-4 py-2 border border-divider rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent bg-background-content text-color-typography"
             placeholder="+7 (___) ___-__-__"
           />
         </div>
       </div>
       
       <div>
         <label class="block text-sm font-proxima-nova font-medium text-color-typography mb-2">
           Email
         </label>
         <input
           v-model="form.email"
           type="email"
           class="w-full px-4 py-2 border border-divider rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent bg-background-content text-color-typography"
           placeholder="email@example.com"
         />
       </div>
       
       <div>
         <label class="block text-sm font-proxima-nova font-medium text-color-typography mb-2">
           Сообщение *
         </label>
         <textarea
           v-model="form.message"
           required
           rows="4"
           class="w-full px-4 py-2 border border-divider rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent bg-background-content text-color-typography"
           placeholder="Опишите вашу проблему или вопрос..."
         ></textarea>
       </div>
       
       <div class="flex items-center">
         <input
           v-model="form.agreement"
           type="checkbox"
           required
           class="h-4 w-4 text-brand-light rounded focus:ring-brand-light"
         />
         <label class="ml-3 text-sm font-proxima-nova text-color-typography">
           Я согласен на обработку персональных данных
         </label>
       </div>
       
       <button
         type="submit"
         :disabled="loading"
         class="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
       >
         <span v-if="loading">Отправка...</span>
         <span v-else>Отправить заявку</span>
       </button>
       
       <div v-if="success" class="p-4 bg-green-50 border border-green-200 rounded-lg">
         <p class="text-green-800 font-medium">Заявка отправлена успешно!</p>
         <p class="text-green-600 text-sm mt-1">Мы свяжемся с вами в ближайшее время</p>
       </div>
       
       <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
         <p class="text-red-800 font-medium">Ошибка отправки</p>
         <p class="text-red-600 text-sm mt-1">{{ error }}</p>
       </div>
     </form>
   </template>

   <script setup>
   import emailjs from '@emailjs/browser'

   const form = reactive({
     name: '',
     phone: '',
     email: '',
     message: '',
     agreement: false,
   })

   const loading = ref(false)
   const success = ref(false)
   const error = ref('')

   // Настройки EmailJS (добавьте свои)
   const EMAILJS_CONFIG = {
     serviceId: 'YOUR_SERVICE_ID',
     templateId: 'YOUR_TEMPLATE_ID',
     publicKey: 'YOUR_PUBLIC_KEY',
   }

   const handleSubmit = async () => {
     if (loading.value) return
     
     loading.value = true
     error.value = ''
     
     try {
       await emailjs.send(
         EMAILJS_CONFIG.serviceId,
         EMAILJS_CONFIG.templateId,
         {
           from_name: form.name,
           from_phone: form.phone,
           from_email: form.email,
           message: form.message,
           to_email: 'info@klinika-zdorovya.ru',
           date: new Date().toLocaleString('ru-RU'),
         },
         EMAILJS_CONFIG.publicKey
       )
       
       success.value = true
       // Сброс формы
       Object.assign(form, {
         name: '',
         phone: '',
         email: '',
         message: '',
         agreement: false,
       })
       
       // Сброс успешного сообщения через 5 секунд
       setTimeout(() => {
         success.value = false
       }, 5000)
       
     } catch (err) {
       error.value = 'Произошла ошибка при отправке. Попробуйте еще раз.'
       console.error('EmailJS error:', err)
     } finally {
       loading.value = false
     }
   }
   </script>
   ```

## **7.4. Создание композиций (Composables)**

### **Композиция для работы с формами**

```javascript
// composables/useForm.js
export const useForm = (initialFields) => {
  const fields = reactive(initialFields)
  const errors = reactive({})
  const touched = reactive({})
  
  const validateField = (fieldName) => {
    const field = fields[fieldName]
    
    if (field.required && !field.value) {
      errors[fieldName] = 'Это поле обязательно'
      return false
    }
    
    if (field.validate) {
      const validationResult = field.validate(field.value)
      if (typeof validationResult === 'string') {
        errors[fieldName] = validationResult
        return false
      }
    }
    
    delete errors[fieldName]
    return true
  }
  
  const validateForm = () => {
    let isValid = true
    
    Object.keys(fields).forEach(fieldName => {
      const fieldValid = validateField(fieldName)
      if (!fieldValid) isValid = false
    })
    
    return isValid
  }
  
  const resetForm = () => {
    Object.keys(fields).forEach(fieldName => {
      fields[fieldName].value = ''
      delete errors[fieldName]
      touched[fieldName] = false
    })
  }
  
  const touchField = (fieldName) => {
    touched[fieldName] = true
    validateField(fieldName)
  }
  
  return {
    fields,
    errors,
    touched,
    validateField,
    validateForm,
    resetForm,
    touchField,
  }
}
```

### **Использование композиции в компоненте**

```vue
<!-- app/components/Forms/ContactFormWithComposable.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="formFields.name.value" @blur="touchField('name')" />
      <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div>
    </div>
    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import { useForm } from '~/composables/useForm'

const {
  fields: formFields,
  errors,
  touched,
  validateForm,
  touchField
} = useForm({
  name: {
    value: '',
    required: true,
    validate: (value) => value.length > 2 || 'Имя должно быть длиннее 2 символов'
  },
  email: {
    value: '',
    required: true,
    validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Некорректный email'
  }
})

const handleSubmit = () => {
  if (validateForm()) {
    // Отправка формы
    console.log('Форма валидна:', formFields)
  }
}
</script>
```


----
В следующем разделе рассмотрим "Часто задаваемые вопросы (FAQ по проекту)", где ответим на типичные вопросы, возникающие при работе с проектом, и предоставим решения для распространенных проблем.