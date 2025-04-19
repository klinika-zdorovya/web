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
    <div v-if="view === 'extended'" class="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 cursor-pointer">
      <!-- Аватар -->
      <div class="md:hidden flex justify-center">
        <img
            :alt="doctor.name"
            :src="doctor.avatar"
            class="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover"
        >
      </div>

      <DoctorInfo :doctor="doctor" class="md:hidden text-center"/>

      <!-- Десктопный аватар -->
      <img
          :alt="doctor.name"
          :src="doctor.avatar"
          class="hidden md:block w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shrink-0"
      >

      <!-- Контент -->
      <div class="flex-1">
        <!-- Десктопные заголовки -->
        <DoctorInfo :doctor="doctor" class="hidden md:block leading-3"/>

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
    <div v-else-if="view === 'short'" class="p-4 text-center">
      <img
          :src="doctor.avatar"
          :alt="doctor.name"
          class="w-24 h-24 rounded-full object-cover mx-auto mb-4"
      >
      <p class="text-sm text-gray-600">{{ doctor.positionSecond }}</p>
    </div>

    <!-- Avatar View -->
    <div v-else-if="view === 'avatar'" class="flex items-center p-4 gap-4">
      <img
          :src="doctor.avatar"
          :alt="doctor.name"
          class="w-10 h-10 rounded-full object-cover"
      >
      <span class="font-medium">{{ doctor.name }}</span>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  doctor: Object,
  view: String,
})

const isOpen = ref(false);
const content = ref(null);

const toggleDescription = () => {
  if (props.view === 'extended') {
    isOpen.value = !isOpen.value;
  }
}

const formattedDescription = computed(() => {
  return props.doctor.description
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