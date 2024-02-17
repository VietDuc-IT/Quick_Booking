/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['../public/index.html', './src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
    theme: {
        extend: {
            colors: {
                primary3: '#6ee7b7',
                primary: '#10b981',
                primary6: '#059669',
                primary7: '#047857',
                // moon
                m_body: '#1e293b',
                m_body2: '#f3f4f6',
                m_main: '#fafafa',
                m_text: '#374151',
                // dark
                d_body: '#0f172a',
                d_main: '#1e293b',
                d_text: '#f1f5f9',
                d_border: '#64748b',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
