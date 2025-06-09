<script setup lang="ts">
import { useTheme } from '../../composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    <span v-if="theme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>
