<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const resume = useResume()

const localeLinks = computed(() =>
  locales.value.map((item) => {
    const code = typeof item === 'string' ? item : item.code
    const name = typeof item === 'string' ? item : (item.name ?? item.code)

    return {
      code,
      name,
      to: switchLocalePath(code),
      current: code === locale.value,
    }
  }),
)

useHead(() => ({
  title: t('siteTitle'),
}))
</script>

<template>
  <main>
    <nav :aria-label="locale === 'ru' ? 'Язык' : 'Language'">
      <NuxtLink
        v-for="item in localeLinks"
        :key="item.code"
        :to="item.to"
        :aria-current="item.current ? 'page' : undefined"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>

    <h1>{{ resume.name }}</h1>
    <p>{{ resume.role }}</p>
    <p>{{ resume.about }}</p>
  </main>
</template>
