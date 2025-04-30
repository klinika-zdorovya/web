<!-- components/YandexMap.vue -->
<template>
  <div class="relative">
    <!-- Контейнер для карты -->
    <div ref="mapContainer" class="h-full w-full rounded-xl overflow-hidden"></div>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
      <div class="text-center space-y-2">
        <span class="text-sm text-gray-500">Загрузка карты...</span>
      </div>
    </div>

    <!-- Сообщение об ошибке -->
    <div v-if="error" class="absolute inset-0 bg-red-50 flex items-center justify-center p-4">
      <div class="text-center text-red-600">
        <p class="text-sm">Не удалось загрузить карту</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  address: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '/images/logos/logo.png'
  },
  zoom: {
    type: Number,
    default: 15
  }
});

const { $ymaps } = useNuxtApp();
const mapContainer = ref(null);
const loading = ref(true);
const error = ref(false);
let map = null;

// Инициализация карты
const initMap = async () => {
  try {
    const res = await $ymaps.geocode(props.address);
    const geoObject = res.geoObjects.get(0);

    if (!geoObject) {
      throw new Error('Адрес не найден');
    }

    map = new $ymaps.Map(mapContainer.value, {
      center: geoObject.geometry.getCoordinates(),
      zoom: props.zoom,
      controls: ['zoomControl', 'fullscreenControl']
    });

    try {
      const myPlacemark = new $ymaps.Placemark(geoObject.geometry.getCoordinates(), {
        hintContent: `Клиника здоровья, <br />${props.address}`,
      }, {
        iconLayout: 'default#image',
        iconImageHref: props.icon,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20]
      });
      map.geoObjects.add(myPlacemark);
    } catch (error) {
      console.error('Ошибка при создании пина:', error);
    }
  } catch (err) {
    error.value = true;
    console.error('YandexMap error:', err);
  } finally {
    loading.value = false;
  }
};

// Очистка ресурсов
const cleanup = () => {
  if (map) {
    map.destroy();
    map = null;
  }
};

onMounted(initMap);
onUnmounted(cleanup);
</script>