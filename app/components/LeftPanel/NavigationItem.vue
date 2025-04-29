<template>
  <li
      class="relative border-b border-divider dark:border-divider__dark
      transition uppercase font-semibold
      text-xs text-brand-light dark:text-brand-light__dark
      bg-background-block hover:bg-background-block-hover
      dark:bg-background-block__dark dark:hover:bg-background-block-hover__dark"
      @mouseenter="desktopHover"
      @mouseleave="desktopLeave"
      @click="desktopLeave"
  >
    <div class="flex items-center justify-between">
      <NuxtLink
          :to="item.path"
          :class="{'pl-8': level > 0 }"
          class="block px-8 py-3 rounded-sm flex-1 leading-tight"
          @click="mobileClick"
      >
        {{ item.title }}
      </NuxtLink>
      <button
          v-if="item.children"
          class="p-2 md:hidden"
          @click="toggleMobile"
      >
        <svg
            class="w-4 h-4 transform transition-transform"
            :class="{ 'rotate-90': isOpenMobile }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Mobile submenu -->
    <transition
        enter-active-class="transition-[max-height] duration-300 ease-in"
        leave-active-class="transition-[max-height] duration-200 ease-out"
        enter-from-class="max-h-0"
        enter-to-class="max-h-[1000px]"
        leave-from-class="max-h-[1000px]"
        leave-to-class="max-h-0"
    >
      <ul
          v-if="item.children && isOpenMobile"
          class="pl-4 md:hidden"
      >
        <NavigationItem
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :level="level + 1"
            @click="emitCloseMenu"
        />
      </ul>
    </transition>

    <!-- Desktop submenu -->
    <LeftPanelDesktopSubmenu
        v-if="item.children"
        :is-open="isOpenDesktop"
        :children="item.children"
        @close="closeDesktop"
    />
  </li>
</template>

<script setup>
import {ref, inject, watch} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const emit = defineEmits(['item-clicked']);

const props = defineProps({
  item: Object,
  level: Number
});

const isMobile = inject('isMobile');
const isOpenMobile = ref(false);
const isOpenDesktop = ref(false);

const {openItem, setOpenItem} = inject('mobileMenuState');

const mobileClick = (event) => {
  if (props.item.children && isMobile.value) {
    event.preventDefault();
    toggleMobile();
  } else if (!props.item.children) {
    emitCloseMenu();
  }
}

const emitCloseMenu = () => {
  emit('item-clicked');
}

const toggleMobile = () => {
  const newState = !isOpenMobile.value;
  setOpenItem(newState ? props.item.path : null);
}

const desktopHover = () => {
  if (!isMobile?.value && props.item.children) {
    isOpenDesktop.value = true;
  }
}

const desktopLeave = () => {
  if (!isMobile?.value) {
    isOpenDesktop.value = false;
  }
}

const closeDesktop = () => {
  isOpenDesktop.value = false;
}

watch(openItem, (newPath) => {
  isOpenMobile.value = newPath === props.item.path;
})
</script>
