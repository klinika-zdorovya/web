/** @type {import('tailwindcss').Config} */
export default {
    content: [
        'components/**/*.{vue,js}',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'composables/**/*.{js,ts}',
        'plugins/**/*.{js,ts}',
        'App.{js,ts,vue}',
        'app.{js,ts,vue}'
    ],
    theme: {
        extend: {
            colors: {
                /*'background__dark': '#20201F',*/

                // Light
                'background': '#F3F8F8',
                'background-content': '#FAFAFA',
                'background-block': '#EFF4F4',
                'background-block-hover': '#e7eded',
                'divider': '#e0e8e9',
                'divider-green': '#27b379',
                'color-typography': '#434343',

                // Dark theme variants
                'background__dark': '#1a1f24',        // Тёмный фон (аналог светлого #F3F8F8)
                'background-content__dark': '#252e32',// Контентная область (немного светлее фона)
                'background-block__dark': '#2d383c',  // Блоки (контрастнее основного фона)
                'background-block-hover__dark': '#344148', // Ховер (ярче базового блока)
                'divider__dark': '#3a454b',           // Разделители (видимый на тёмном фоне)
                'color-typography__dark': '#e6edf3',   // Светлый текст (хорошая читаемость)

                // // Brand green colors (light theme)
                'background-brand-green': '#1baf72',
                'background-brand-green-hover': '#1ba86e',

                // Brand green colors (dark theme)
                'background-brand-green__dark': '#15412f',       // Основной зелёный
                'background-brand-green-hover__dark': '#01331e',  // Ховер-состояние

                // Light
                'background-brand': '#144044',
                'background-brand-dark': '#092325',



                // Dark
                // Brand backgrounds (dark theme)
                'background-brand__dark': '#1E3A3F',       // Основной брендовый фон
                'background-brand-dark__dark': '#0F292D',  // Углубленный вариант

                // Light
                // тексты меню, заголовков, тайтлов
                'brand-light': '#174f54',
                'brand-ultra-light': '#C2F8E2',

                // Новые тёмные варианты
                // Dark
                'brand-light__dark': '#5EC8B8',         // Акцентный бирюзовый (вместо тёмного #174f54)
                'brand-ultra-light__dark': '#A3E4D6',   // Мягкий неоново-бирюзовый (аналог #C2F8E2 для темно

            },

            fontFamily: {
                'spb': ['Petersburg Cyrillic', 'sans-serif'],
                'proxima-nova': ['Proxima Nova', 'sans-serif'],
            },
            fontWeight: {
                light: 300,
                normal: 400,
                bold: 700,
                extrabold: 800,
                black: 900
            },
            fontSize: {
                'xxs': '0.5rem',
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'highlight': '1.5rem',
                'h1': '1.5rem',
                'h2': '1.75rem',
                'h3': '1.5rem',
                'h4': '1.5rem',
                'h5': '1.25rem',
                'highlight_sm': '1.25rem',
                'h1_sm': '1.25rem',
                'h2_sm': '1.5rem',
                'h3_sm': '1.25rem',
                'h4_sm': '1.25rem',
                'h5_sm': '1rem'
            },
            lineHeight: {
                'xxs': '0.75rem',
                'xs': '1rem',
                'sm': '1.25rem',
                'base': '1.35rem',
                'lg': '1.45rem',
                'highlight': '1.5rem',
                'h1': '1.5rem',
                'h2': '1.75rem',
                'h3': '1.5rem',
                'h4': '1.5rem',
                'h5': '1.25rem',
                'highlight_sm': '1.25rem',
                'h1_sm': '1.75rem',
                'h2_sm': '1.5rem',
                'h3_sm': '1.25rem',
                'h4_sm': '1.25rem',
                'h5_sm': '1rem',
            },
            padding: {
                'section_x_sm': '1.5rem',
                'section_x': '5rem',
                'section_y_sm': '3rem',
                'section_y': '5rem'
            },
            spacing: {
                'nav': '4rem',
                'section_x': '5rem',
                '256': '64rem', // 1024px для отступа меню
            },
            height: {
                'screen-16': 'calc(100vh - 4rem)',
                'screen-80': 'calc(100vh - 80px)'
            },
            screens: {
                '3xl': '1600px',
            },
            maxWidth: {
                'screen-3xl': '1600px',
            },
            transitionProperty: {
                'transform': 'transform'
            },
        },
    },
    plugins: [],
}

