import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/fonts/Figtree/static/Figtree-Regular.ttf'
            ],
            refresh: true,
        }),
        react({
            input: [
                'resources/fonts/Figtree/static/Figtree-Regular.ttf'
            ],
        }),
    ],
});
