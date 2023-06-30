// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt', 
        'nuxt-icon', 
        '@nuxtjs/color-mode',
        '@nuxtjs/supabase',
    ],
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    css: [
       '@/assets/css/main.css'
    ],
})