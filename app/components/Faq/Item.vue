<template>
  <div class="w-full lg:grid lg:grid-cols-2 lg:gap-8 pt-2">
    <!-- Question Block -->
    <div class="w-full lg:w-auto lg:mb-0 mx-auto lg:mx-0">
      <div class="w-full inline-block md:mt-5">
        <DateName :date="faq.date" :name="faq.name" />
        <p class="mt-2 text-color-typography text-sm leading-5">{{ faq.question }}</p>
      </div>
    </div>

    <!-- Answer Block -->
    <div class="w-full lg:w-auto mx-auto lg:mx-0">
      <div class="w-full inline-block bg-background-block p-4 rounded-lg ">
        <div class="flex lg:block ">
          <DoctorCard
              :name="faq.doctorName"
              view="avatar"
              class="justify-start"
          />
        </div>
        <p class="mt-4 text-background-brand-green text-sm leading-5 font-semibold" v-html="format.nl2br(faq.answer)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useFormatText} from "~/composable/nl2br.js";

const format = useFormatText();

defineProps({
  faq: {
    type: Object,
    required: true
  }
})
</script>