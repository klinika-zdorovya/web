import {defineContentConfig, defineCollection} from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**',
        }),

        menu: defineCollection({
            type: 'page',
            source: 'navigation/navigation.yaml',
        }),

        menu2: defineCollection({
            type: 'page',
            source: 'navigation/menu.json',
        }),
    }
});
