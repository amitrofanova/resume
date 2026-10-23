<script setup lang="ts">
const i18nHead = useLocaleHead({ lang: true, dir: true, seo: true })
const { app } = useRuntimeConfig()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${app.baseURL}favicon.ico` },
    ...(i18nHead.value.link ?? []),
  ],
  meta: [...(i18nHead.value.meta ?? [])],
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
