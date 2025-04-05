<template>
  <li>
    <NuxtLink
        :to="item.path"
        class="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
        :class="{
        'bg-blue-100 font-semibold': $route.path === item.path,
        'pl-8': level > 0
      }"
    >
      {{ item.title }}
    </NuxtLink>

    <ul v-if="item.children" class="space-y-2 mt-2">
      <NavigationItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :level="level + 1"
      />
    </ul>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})
</script>