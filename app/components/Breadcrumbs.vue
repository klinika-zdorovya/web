<template>
  <nav class="text-sm flex flex-col justify-center text-gray-200 uppercase leading-tight">
    <h1 class="">{{ crumbs[crumbs.length - 1].title }}</h1>
    <ol class="flex flex-wrap items-center gap-2 line-clamp-1 whitespace-nowrap">
      <li v-for="(crumb, index) in crumbs" :key="crumb.path">
        <NuxtLink
            :to="crumb.path"
            class="text-xs hover:text-color-typography__dark/80 transition-colors"

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
  let items = getParentItems(fullPath, props.navigation);

  // ручной маппинг для исключений
  if (items && items.length) {
    items.map((item) => {
      if (item.path === '/news/') {
        item.path = '/news/list/'
      }

      return item;
    });
  }

  // убираем дубли по полю path
  const seenPaths = new Set();
  items = items.filter(item => {
    if (seenPaths.has(item.path)) return false;
    seenPaths.add(item.path);
    return true;
  });

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