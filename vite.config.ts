import path from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'import.meta.env.VITE_APP_BASENAME': JSON.stringify(process.env.VITE_APP_BASENAME),
    },
})
