export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
  ],
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/resume/',
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    disableTransition: true,
  },
  i18n: {
    baseUrl: 'https://amitrofanova.github.io',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
  icon: {
    mode: 'svg',
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: [
        'lucide:sun',
        'lucide:moon',
        'lucide:file-down',
        'lucide:mail',
        'lucide:send',
        'lucide:github',
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
