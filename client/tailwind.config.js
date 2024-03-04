/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['../public/index.html', './src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
    theme: {
        // max-w-7xl
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            colors: {
                primary: { default: '#00B14F', hover: '#009643' },
                black: { default: '#212F3F', hover: '#161F29' },

                // Moon
                m_body: '#F3F5F7',
                m_main: '#ffffff',
                m_text: '#212F3F',

                // Dark
                d_body: '#0f172a',
                d_main: '#1e293b',
                d_text: '#e2e8f0',
            },

            backgroundImage: {
                imgLight: 'rgb(55 65 81 1)',
                imgDark: '',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
