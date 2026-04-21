import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                capabilities: resolve(__dirname, 'capabilities.html'),
                work: resolve(__dirname, 'work.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
})
