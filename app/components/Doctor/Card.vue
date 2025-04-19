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
    <div v-if="view === 'extended'" class="flex gap-6 p-6 cursor-pointer">
      <img
          :src="doctor.avatar"
          :alt="doctor.name"
          class="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shrink-0"
      >

      <div class="flex-1">
        <h2 class="text-brand-light uppercase mb-2">{{ doctor.name }}</h2>
        <h3 class="text-brand-light mb-4">{{ doctor.positionFirst }}</h3>

        <transition
            name="description"
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[500px]"
            leave-from-class="opacity-100 max-h-[500px]"
            leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="isOpen" class="overflow-hidden">
            <h3 class="font-semibold mb-2">{{ doctor.descriptionTitle }}</h3>
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