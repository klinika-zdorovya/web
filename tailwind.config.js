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

                'background': '#F3F8F8',
                'background-content': '#FAFAFA',


                'background-brand': '#144044',
                'background-brand-dark': '#092325',
                'background-block': '#EFF4F4',
                'background-block-hover': '#e7eded',

                'background-brand-green': '#1baf72',
                'background-brand-green-hover': '#1ba86e',

                // тексты меню, заголовков, тайтлов
                'brand-light': '#174f54',
                'brand-ultra-light': '#C2F8E2',

                'divider': '#e0e8e9',
                'divider-green': '#27b379',



                'color-typography': '#434343',

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
                'highlight': '5rem',
                'h1': '2rem',
                'h2': '3rem',
                'h3': '2rem',
                'h4': '1.5rem',
                'h5': '1.25rem',
                'highlight_sm': '3.5rem',
                'h1_sm': '1.75rem',
                'h2_sm': '2.25rem',
                'h3_sm': '1.75rem',
                'h4_sm': '1.5rem',
                'h5_sm': '1.25rem'
            },
            lineHeight: {
                'xxs': '0.75rem',
                'xs': '1rem',
                'sm': '1.25rem',
                'base': '1.35rem',
                'lg': '1.45rem',
                'highlight': '5.5rem',
                'h1': '2rem',
                'h2': '1.75rem',
                'h3': '2.25rem',
                'h4': '1.75rem',
                'h5': '1.5rem',
                'highlight_sm': '3.75rem',
                'h1_sm': '1.75rem',
                'h2_sm': '1.5rem',
                'h3_sm': '2rem',
                'h4_sm': '1.75rem',
                'h5_sm': '1.5rem',
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

