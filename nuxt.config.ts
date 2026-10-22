export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  ssr: true,
  app: {
    baseURL: '/resume/',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
