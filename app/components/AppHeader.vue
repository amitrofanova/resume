<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const resume = useResume()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const localeLinks = computed(() =>
  locales.value.map((item) => {
    const code = typeof item === 'string' ? item : item.code

    return {
      code,
      name: code.toUpperCase(),
      to: switchLocalePath(code),
      current: code === locale.value,
    }
  }),
)

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner page-width">
      <nav class="site-header__controls" :aria-label="t('header.language')">
        <NuxtLink
          v-for="item in localeLinks"
          :key="item.code"
          class="site-header__control"
          :to="item.to"
          :hreflang="item.code"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
      <div class="site-header__controls">
        <button
          type="button"
          class="site-header__control"
          :aria-label="isDark ? t('header.themeToLight') : t('header.themeToDark')"
          :aria-pressed="isDark"
          @click="toggleTheme"
        >
          <Icon
            v-show="isDark"
            class="site-header__icon"
            name="lucide:sun"
            size="1.1em"
          />
          <Icon
            v-show="!isDark"
            class="site-header__icon"
            name="lucide:moon"
            size="1.1em"
          />
        </button>

        <button
          type="button"
          class="site-header__control"
          disabled
          :title="t('header.downloadSoon')"
        >
          <Icon class="site-header__icon" name="lucide:file-text" size="1.1em" />
          {{ t('header.downloadTxt') }}
        </button>

        <button
          type="button"
          class="site-header__control"
          disabled
          :title="t('header.downloadSoon')"
        >
          <Icon class="site-header__icon" name="lucide:file-down" size="1.1em" />
          {{ t('header.downloadPdf') }}
        </button>
      </div>
    </div>
  </header>
</template>
