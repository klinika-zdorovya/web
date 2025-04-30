<template>
  <div class="p-4 md:p-6">
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Левый блок - контактная информация -->
      <div class="space-y-6">
        <h2>{{ contact.title }}</h2>
        <!-- Адрес -->
        <div class="space-y-2">
          <h3>Адрес</h3>
          <p class="">{{ contact.address }}</p>
        </div>

        <!-- Телефоны -->
        <div class="space-y-2">
          <h3>Телефон<span v-if="contact.phones.length > 1">ы</span></h3>
          <div class="space-y-1">
            <a
                v-for="(phone, index) in contact.phones"
                :key="index"
                :href="`tel:${phone}`"
                class="block hover:text-background-brand dark:hover:text-brand-ultra-light transition-colors"
            >
              {{ formatPhone(phone) }}
            </a>
          </div>
        </div>

        <!-- Время работы -->
        <div class="space-y-2">
          <h3>Режим работы</h3>
          <p>{{ contact.workingTime }}</p>
          <p>{{ contact.holidaysTime }}</p>
        </div>
      </div>

      <div class="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
        <!-- Карта -->
        <ContactsYandexMap
            :address="contact.address"
            class="h-96"
            icon="/images/logo/logo-kz.png"
            :zoom="16"
        />
      </div>
    </div>

    <!-- Дополнительная информация -->
    <div class="md:hidden space-y-4">
      <p class="text-color-typography dark:text-color-typography__dark">{{ contact.subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
const {data} = await useAsyncData('contacts', () => {
  return queryCollection('contacts').first();
});

const contact = data.value.body[0];


// Форматирование телефонных номеров
const formatPhone = (number) => {
  const cleaned = `${number}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return number;
}
</script>

<style>
/* Дополнительные стили при необходимости */
 h3 {
  @apply font-semibold text-background-brand dark:text-brand-light__dark;
}
</style>