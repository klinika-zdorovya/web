<template>
  <div class="flex-1">
    <ul>
      <LeftPanelNavigationItem
          v-for="link in navigation"
          :key="link.path"
          :item="link"
          class="ml-0"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
const {navigation} = defineProps({
  navigation: {
    type: Array,
    default: [],
  }
})

onMounted(()=> {
  console.log('#', navigation)
})
</script>

<style scoped>

</style>