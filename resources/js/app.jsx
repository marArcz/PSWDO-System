import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/custom.css';
import '../css/nav-control.css';
import '../css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title?title + ' - ' : ''} ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
