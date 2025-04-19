import {defineContentConfig, defineCollection, z} from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**',
        }),

        menu: defineCollection({
            type: 'page',
            source: 'data/navigation/navigation.yaml',
        }),

        doctors: defineCollection({
            type: 'data',
            source: 'data/doctors/**.json',
            schema: z.object({
                name: z.string(),
                positionFirst: z.string(),
                positionSecond: z.string(),
                avatar: z.string(),
                description: z.string(),
                descriptionTitle: z.string(),
            })
        }),
    }
});
