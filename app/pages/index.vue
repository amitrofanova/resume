<script setup lang="ts">
const { t } = useI18n()
const resume = useResume()

useHead(() => ({
  title: t('siteTitle'),
}))
</script>

<template>
  <main class="page-main page-width">
    <h1>{{ resume.name }}</h1>
    <p>{{ resume.role }}</p>
    <p>{{ resume.about }}</p>
  </main>
</template>
