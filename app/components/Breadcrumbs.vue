<template>
  <nav class="flex text-sm flex-col items-start justify-center">
    <h3 class="mt-0">{{ title }}</h3>
    <ol class="flex space-x-2">
      <li v-for="(crumb, index) in crumbs" :key="crumb.path">
        <NuxtLink
            :to="crumb.path"
            class="text-gray-500 hover:text-blue-600"
            :class="{ 'text-gray-900': index === crumbs.length - 1 }"
        >
          {{ crumb.title }}
        </NuxtLink>
        <span v-if="index < crumbs.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute()

const crumbs = computed(() => {
  const pathArray = route.path.split('/').filter(crumb => crumb)
  const breadcrumbs = []
  let path = ''

  pathArray.forEach((crumb, index) => {
    path += `/${crumb}`
    breadcrumbs.push({
      path,
      title: crumb.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
    })
  })

  return [{ title: 'Главная', path: '/' }, ...breadcrumbs]
})

const title = computed(() => {
  const lastElement = crumbs.value[crumbs.value.length - 1];
  return lastElement?.title || '';
})
</script>