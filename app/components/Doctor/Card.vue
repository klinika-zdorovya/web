<template>
  <div
      :class="[
      'transition-colors duration-300',
      { 'bg-background-block': isOpen, 'bg-background-content': !isOpen },
      view === 'extended' ? 'border-b border-[#e0e8e9]' : ''
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

        <!-- Мобильное описание -->
        <transition
            name="description"
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-max"
            leave-from-class="opacity-100 max-h-max"
            leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="isOpen" class="md:hidden mt-4">
            <p class="text-gray-600 whitespace-pre-wrap">{{ doctor.description }}</p>
          </div>
        </transition>

        <!-- Десктопное описание -->
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-max"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-max"
            leave-to-class="opacity-0 max-h-0"
            name="description"
        >
          <div v-if="isOpen" class="hidden md:block mt-4">
            <p class="text-gray-600 whitespace-pre-wrap">{{ doctor.description }}</p>
          </div>
        </transition>
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
const props = defineProps({
  doctor: {
    type: Object,
    required: true
  },
  view: {
    type: String,
    default: 'extended',
    validator: (v) => ['extended', 'short', 'avatar'].includes(v)
  }
})

const isOpen = ref(false)

const toggleDescription = () => {
  if (props.view === 'extended') {
    isOpen.value = !isOpen.value
  }
}
</script>