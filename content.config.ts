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

        faq: defineCollection({
            type: 'data',
            source: 'data/faq/**.json',
            schema: z.object({
                date: z.string(),
                name: z.string(),
                question: z.string(),
                avatar: z.string(),
                answer: z.string(),
                doctorName: z.string(),
            })
        }),

        pricelist: defineCollection({
            type: 'page',
            source: 'data/pricelist/pricelist.yaml',
        }),

        documents: defineCollection({
            type: 'data',
            source: 'data/documents/documents.yaml',
            schema: z.object({
                title: z.string(),
                url: z.string(),
            }),
        }),

        products: defineCollection({
            type: 'data',
            source: 'data/products/**.md',
            schema: z.object({
                title: z.string(),
                imageUrl: z.string(),
                description: z.string(),
            }),
        }),

        contacts: defineCollection({
            type: 'page',
            source: 'data/contacts/contacts.yaml',
            schema: z.object({
                title: z.string(),
                subtitle: z.string(),
                description: z.string(),
                address: z.string(),
                coords: z.string(),
                workingTime: z.string(),
                holidaysTime: z.string(),
                phones: z.array(z.string()),
            }),
        }),
    }
});
