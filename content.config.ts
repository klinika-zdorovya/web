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
                address: z.string(),
                workingTime: z.string(),
                holidaysTime: z.string(),
                phones: z.array(z.string()),
            }),
        }),

        sliderMain: defineCollection({
            type: 'data',
            source: 'data/sliders/main.yaml',
            schema: z.object({
                header: z.string(),
                subheader: z.string(),
                text: z.string(),
                imageUrl: z.string(),
            }),
        }),

        sliderMotiv: defineCollection({
            type: 'data',
            source: 'data/sliders/motiv.yaml',
            schema: z.object({
                text: z.string(),
                imageUrl: z.string(),
            }),
        }),

        news: defineCollection({
            type: 'page',
            source: 'news/**.md',
            schema: z.object({
                date: z.string(),
                title: z.string(),
                preview: z.string(),
            }),
        }),

        reviews: defineCollection({
            type: 'page',
            source: 'reviews/**.md',
            schema: z.object({
                date: z.string(),
                author: z.string(),
                authorPhoto: z.string(),
            }),
        })
    }
});
