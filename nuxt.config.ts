export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  ssr: true,
  app: {
    baseURL: '/resume/',
  },
  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
