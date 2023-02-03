import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        proxy: {
            "/api": {
            target: "http://fleetapi-th.cartrack.com",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`
        },
    },
})