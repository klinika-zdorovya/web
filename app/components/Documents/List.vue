<template>
  <DocumentsGallery :imagesList="documentsCollection" />
</template>

<script setup>
const { data: documents } = await useAsyncData('documents', () => {
  return queryCollection('documents').first()
});
const documentsCollection = documents.value.meta.body;
console.log('documentsCollection', documentsCollection);
</script>
