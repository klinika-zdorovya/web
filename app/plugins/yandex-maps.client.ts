// plugins/yandex-maps.client.ts
export default defineNuxtPlugin({
    name: 'yandex-maps',
    parallel: true,
    async setup(nuxtApp) {
        const config = useRuntimeConfig();

        await loadYandexMaps(config.public.yandexMapsApiKey);

        return {
            provide: {
                ymaps: window.ymaps
            }
        };
    }
});

async function loadYandexMaps(apiKey: string) {
    if (window.ymaps) return;

    return new Promise((resolve, reject) => {
        window.ymapsReady = resolve;

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU&onload=ymapsReady`;
        script.async = true;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}