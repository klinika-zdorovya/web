<template>
  <nav class="text-sm">
    <ol class="flex flex-wrap items-center gap-2">
      <li v-for="(crumb, index) in crumbs" :key="crumb.path">
        <NuxtLink
            :to="crumb.path"
            class="text-gray-500 hover:text-blue-600 transition-colors"
            :class="{
            'text-gray-900 font-medium': index === crumbs.length - 1,
            'pointer-events-none': index === crumbs.length - 1
          }"
        >
          {{ crumb.title }}
        </NuxtLink>
        <span
            v-if="index < crumbs.length - 1"
            class="text-gray-400 mx-1"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute();
const props = defineProps({
  navigation: {
    type: Array,
    required: true,
  }
});

const crumbs = computed(() => {
  const fullPath = route.path;
  const items = getParentItems(fullPath, props.navigation);

  return [{ title: 'Главная', path: '/' }, ...items];
})

const findPathInNavigation = (path, items) => {
  for (const item of items) {
    if (item.path === path || item.path === `${path}/`) {
      return item;
    }

    if (item.children) {
      const found = findPathInNavigation(path, item.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

const getParentItems = (path, items) => {
  const parts = path.split('/').filter(p => p);
  let currentPath = '';
  const result = [];


  for (const part of parts) {
    currentPath += `/${part}`;
    const item = findPathInNavigation(currentPath, items);
    if (item) {
      result.push({
        title: item.fullTitle || item.title,
        path: item.path,
      });
    }
  }

  return result;
}


</script>