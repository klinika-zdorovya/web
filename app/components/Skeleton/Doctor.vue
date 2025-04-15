<template>
  <div :class="{'border-b': view==='extended'}" class="my-4">
    <!-- Extended View -->
    <div v-if="view === 'extended'" class="flex gap-4 p-4 animate-pulse">
      <div class="min-w-[96px]">
        <div class="w-32 h-32 rounded-full bg-gray-200"></div>
      </div>

      <div class="w-full space-y-4 ml-4">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Brief View -->
    <div v-else class="p-4 animate-pulse">
      <div class="flex flex-col items-center space-y-3">
        <div class="w-24 h-24 rounded-full bg-gray-200"></div>
        <div class="w-full space-y-2">
          <div class="h-4 bg-gray-200 rounded mx-auto w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded mx-auto w-2/3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  view: {
    type: String,
    default: 'extended',
    validator(value) {
      return ['extended', 'brief'].includes(value)
    }
  }
})
</script>