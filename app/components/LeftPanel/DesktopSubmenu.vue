<template>
  <div
      v-show="isOpen"
      class="desktop-menu absolute left-full top-0 ml-0 shadow-lg rounded-r-lg p-0"
      @mouseleave="close"
  >
    <ul class="w-[350px]">
      <li v-for="child in children"
          :key="child.path"
          class="my-0 py-2 px-8 border-b border-divider-green bg-background-brand-green hover:bg-background-brand-green-hover"
      >
        <NuxtLink
            :to="child.path"
            class="block text-xs text-white
            uppercase font"
        >
          {{ child.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  children: Array
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
<style>
.desktop-menu::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 12px;
  width: 12px;
  height: 12px;
  background: #1baf72;
  border-left: 1px solid #1baf72;
  border-top: 1px solid #1baf72;
  transform: rotate(-45deg);
  z-index: 1;
}

.desktop-menu {
  margin-top: -1px;
}
</style>