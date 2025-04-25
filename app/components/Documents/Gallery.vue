<template>
  <!-- Grid Section -->
  <div class="flex flex-wrap gap-4 p-4">
    <div
        v-for="(image, index) in imagesList"
        :key="index"
        class="w-full md:w-[225px] md:h-[309px] cursor-pointer transition-transform duration-300 hover:scale-105"
        @click="openModal(index)"
    >
      <img
          :src="image.url"
          :alt="image.title"
          class="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>

  <!-- Modal -->
  <Transition name="fade">
    <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center z-30"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm " @click.self="closeModal"></div>

      <!-- Main Modal Content -->
      <div class="relative">
        <!-- Close Button -->
          <RoundButton
              class="absolute top-5 right-5 text-background-brand-dark text-3xl z-[50]"
              @click="closeModal"
          >
            &times;
          </RoundButton>

        <!-- Image Container -->
        <div class="relative ">
          <!-- Navigation Arrows Container -->
          <div class="absolute inset-0 flex items-center justify-between pointer-events-none z-40">
            <!-- Left Arrow Zone -->
            <div
                class="h-full w-1/2 flex items-center pl-2 pr-10 pointer-events-auto cursor-pointer"
                @click.stop="prevImage"
            >
              <RoundButton>&larr;</RoundButton>
            </div>

            <!-- Right Arrow Zone -->
            <div
                class="h-full w-1/2 flex items-center justify-end pr-2 pl-10 pointer-events-auto cursor-pointer"
                @click.stop="nextImage"
            >
              <RoundButton >&rarr;</RoundButton>
            </div>
          </div>

          <!-- Image Content -->
          <Transition :name="transitionDirection" mode="out-in">
            <div
                :key="currentIndex"
                class="relative bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                  :src="currentImage.url"
                  :alt="currentImage.title"
                  class="max-h-[95vh] object-contain mx-auto"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import RoundButton from "~/components/RoundButton.vue";


const props = defineProps({
  imagesList: {
    type: Array,
    required: true,
    default: () => []
  }
})

const isOpen = ref(false)
const currentIndex = ref(0)
const transitionDirection = ref('slide-next')

const currentImage = computed(() => props.imagesList[currentIndex.value])

function openModal(index) {
  currentIndex.value = index
  isOpen.value = true
  document.body.classList.add('overflow-hidden')
}

function closeModal() {
  isOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

function prevImage() {
  transitionDirection.value = 'slide-prev'
  currentIndex.value = (currentIndex.value - 1 + props.imagesList.length) % props.imagesList.length
}

function nextImage() {
  transitionDirection.value = 'slide-next'
  currentIndex.value = (currentIndex.value + 1) % props.imagesList.length
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.3s ease;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>