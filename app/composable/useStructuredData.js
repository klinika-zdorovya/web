// composables/useStructuredData.js
export const useStructuredData = () => {
    const route = useRoute();
    const config = useRuntimeConfig();

    const siteUrl = computed(() => config.public.siteUrl || 'https://klinika-zdorovya.ru');
    const isHomePage = computed(() => route.path === '/');

    const generateOrganizationData = () => {
        const data = {
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            '@id': `${siteUrl.value}/#organization`,
            'name': 'Клиника "Передовые технологии здоровья"',
            'description': 'Современная клиника мануальной терапии и реабилитации в Санкт-Петербурге',
            'url': siteUrl.value,
            'logo': `${siteUrl.value}/images/logo/logo.png`,
            'telephone': '+7 (921) 904-27-67',
            'email': 'info@klinika-zdorovya.ru',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Литейный пр., д. 43',
                'addressLocality': 'Санкт-Петербург',
                'postalCode': '191014',
                'addressCountry': 'RU'
            },
            'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '59.939326',
                'longitude': '30.347718'
            },
            'openingHoursSpecification': [
                {
                    '@type': 'OpeningHoursSpecification',
                    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    'opens': '10:00',
                    'closes': '20:00'
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    'dayOfWeek': 'Saturday',
                    'opens': '10:00',
                    'closes': '18:00'
                }
            ],
            'priceRange': '₽₽',
            'medicalSpecialty': [
                'Мануальная терапия',
                'Лечебная физкультура',
                'Неврология',
                'Реабилитация'
            ]
        };

        if (isHomePage.value) {
            data['@type'] = ['MedicalOrganization', 'LocalBusiness'];
            data.founder = {
                '@type': 'Person',
                'name': 'Родичкин Павел Васильевич',
                'jobTitle': 'Главный врач, доктор медицинских наук',
                'url': `${siteUrl.value}/clinic/doctors`
            };
        }

        return data;
    };

    const generateBreadcrumbData = () => {
        if (isHomePage.value) return null;

        const pathSegments = route.path.split('/').filter(segment => segment);
        const breadcrumbItems = [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Главная',
                'item': siteUrl.value
            }
        ];

        let currentUrl = siteUrl.value;
        pathSegments.forEach((segment, index) => {
            currentUrl += `/${segment}`;
            const position = index + 2;
            const name = getBreadcrumbName(segment);

            if (name && !isNaN(segment) && segment !== 'list') {
                breadcrumbItems.push({
                    '@type': 'ListItem',
                    'position': position,
                    'name': name,
                    'item': currentUrl
                });
            }
        });

        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbItems
        };
    };

    const getBreadcrumbName = (segment) => {
        const segmentMap = {
            'clinic': 'Клиника',
            'about': 'О клинике',
            'doctors': 'Наши специалисты',
            // ... остальные маппинги
        };

        return segmentMap[segment] || segment.replace(/-/g, ' ');
    };

    const getAllStructuredData = () => {
        const data = [generateOrganizationData()];

        const breadcrumbData = generateBreadcrumbData();
        if (breadcrumbData) {
            data.push(breadcrumbData);
        }

        return data;
    };

    return {
        getAllStructuredData
    };
};