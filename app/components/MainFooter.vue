<template>
  <!-- Футер -->
  <footer class="bg-background-brand-dark text-white mt-auto relative">
    <div class="switcher hidden md:block absolute  w-6 h-6 right-4 top-6">
      <ThemeSwitcher />
    </div>
    <div class="container mx-auto px-4 py-4">
      <div class="text-center text-xs md:hidden">
        © 2011-{{ new Date().getFullYear() }} Клиника Здоровья. Все права защищены.
        <div class="switcher absolute  w-6 h-6 right-2 top-4">
          <ThemeSwitcher />
        </div>
      </div>
      <div class="text-center text-[10px] hidden md:flex justify-around leading-4 text-justify uppercase ">
        <div>
          <div class="">2011-{{ new Date().getFullYear() }} Клиника Здоровья. Все права защищены.</div>
          <div class="">
            <NuxtLink to="/clinic/documents">
              Лицензии и сертификаты
            </NuxtLink>
          </div>
        </div>
        <div>
          <div class="">191014, Санкт-Петербург Литейный пр., д. 43</div>
          <div class="">понедельник – суббота с 10.00 до 20.00</div>
          <div class="text-brand-ultra-light">Воскресение – выходной день</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
</script>