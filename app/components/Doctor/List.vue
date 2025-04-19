<template>
  <div class="divide-y divide-[#e0e8e9]">
    <DoctorCard
        v-for="(doctor, index) in doctors"
        :key="doctor._id"
        :doctor="doctor"
        :view="view"
        :class="{ 'border-b-0': index === doctors.length - 1 }"
        class="mt-4"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  view: {
    type: String,
    default: 'extended'
  }
})

const { data: doctors } = await useAsyncData('doctors', () => {
  return queryCollection('doctors')
      .all()
})
</script>