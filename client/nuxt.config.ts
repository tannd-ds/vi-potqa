// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-icon',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    css: [
       '@/assets/css/main.css'
    ],
})

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
