<template>
  <div class="flex-1">
    <ul>
      <LeftPanelNavigationItem
          v-for="link in displayedMenu"
          :key="link.path"
          :item="link"
          @item-clicked="clickOnItem"
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

const emit = defineEmits(['close-menu']);

const displayedMenu = computed(() => {
  return navigation.filter(item => !item.hideInMenu)
});

const clickOnItem = () => {
  emit('close-menu');
}

</script>

<style scoped>

</style>