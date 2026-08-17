<script setup lang="ts">
import { useTheme } from '../../composables/useTheme';

const { theme, toggleTheme } = useTheme();

const title = computed(() => {
  return theme.value === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
});
</script>

<template>
  <button @click="toggleTheme" :title="title" aria-label="title">
    <span v-if="theme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>
