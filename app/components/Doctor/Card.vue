<template>
  <div
      :class="[
      'transition-all duration-300 transform',
      {
        'bg-background-block shadow-2xl': isOpen,
        'bg-background-content': !isOpen
      },

    ]"
      @click="toggleDescription"
  >

    <!-- Extended View -->
    <div v-if="view === 'extended'" class="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 cursor-pointer">
      <!-- Аватар -->
      <div class="lg:hidden flex flex-col items-center">
        <img
            :alt="doctorData.name"
            :src="doctorData.avatar"
            class="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover"
        >
      </div>

      <DoctorInfo :doctor="doctorData" class="md:hidden text-center"/>

      <!-- Десктопный аватар -->
      <img
          :alt="doctorData.name"
          :src="doctorData.avatar"
          class="hidden lg:block w-44 h-44 rounded-full object-cover shrink-0"
      >

      <!-- Контент -->
      <div class="flex-1">
        <!-- Десктопные заголовки -->
        <DoctorInfo :doctor="doctorData" class="hidden lg:block md:block leading-3"/>

        <!-- Контент -->
        <div class="flex-1">
          <!-- Заголовки (без изменений) -->

          <!-- Анимация для описания -->
          <transition
              name="slide"
              @enter="enter"
              @leave="leave"
              @after-enter="afterEnter"
          >
            <div v-if="isOpen" class="overflow-hidden">
              <div ref="content">
                <p class="text-gray-600 text-justify mt-4 leading-5 md:pr-12" v-html="formattedDescription"></p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Short View -->
    <div v-else-if="view === 'short' && doctorData" class="p-4 text-center">
      <NuxtLink to="/clinic/doctors">
        <img
            :alt="doctorData?.name"
            :src="doctorData?.avatar"
            class="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        >
        <p class="text-sm text-gray-600 leading-5">{{ doctorData?.positionSecond }}</p>
      </NuxtLink>
    </div>

    <!-- Avatar View -->
    <div v-else-if="view === 'avatar'" class="flex items-center p-4 gap-4">
      <img
          :alt="doctorData.name"
          :src="doctorData.avatar"
          class="w-10 h-10 rounded-full object-cover"
      >
      <span class="font-medium">{{ doctorData?.name }}</span>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watchEffect, onMounted} from 'vue';

const props = defineProps({
  doctor: {
    type: Object,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  view: {
    type: String,
    default: 'extended'
  }
})

const isOpen = ref(false);
const content = ref(null);
const doctorData = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchDoctor = async (doctorName) => {
  const queryString = `%${doctorName}%`;
  try {
    loading.value = true;
    const {data} = await useAsyncData('doctorsSingle', () => {
          return queryCollection('doctors')
              .where('name', 'LIKE', queryString)
              .first()
        }
    )
    console.log(data)
    if (data.value) {
      doctorData.value = data.value;
    } else {
      error.value = 'Врач не найден';
    }
  } catch (e) {
    error.value = e.message;
    console.error('Ошибка загрузки врача:', e);
  } finally {
    loading.value = false;
  }
};

// Реактивное обновление данных
watchEffect(async () => {
  if (props.doctor) {
    // Если передан готовый объект врача
    doctorData.value = props.doctor;
  } else if (props.name) {
    // Если передано имя для поиска
    console.log('NAME:', props.name);
    await fetchDoctor(props.name);
  }
});

// Обработка первичной загрузки
onMounted(async () => {
  if (!props.doctor && props.name) {
    await fetchDoctor(props.name);
  }
});

const toggleDescription = () => {
  if (props.view === 'extended') {
    isOpen.value = !isOpen.value;
  }
}

const formattedDescription = computed(() => {
  return doctorData.value.description
      .replace(/\\n/g, '<br><br>')
      .replace(/  /g, '&nbsp;&nbsp;');
})

// Анимационные хуки
const enter = (el) => {
  el.style.height = '0';
  requestAnimationFrame(() => {
    el.style.transition = 'height 0.3s ease-out';
    el.style.height = `${content.value.offsetHeight}px`;
  })
}

const afterEnter = (el) => {
  el.style.height = 'auto';
}

const leave = (el) => {
  el.style.height = `${el.offsetHeight}px`;

  requestAnimationFrame(() => {
    el.style.transition = 'height 0.2s ease-in';
    el.style.height = '0';
  });
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>