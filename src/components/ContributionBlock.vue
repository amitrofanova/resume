<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';

interface Props {
  data: string[];
}

defineProps<Props>();
</script>

<template>
  <BaseHeader type="h2">Дополнительный вклад</BaseHeader>
  <p v-for="(item, index) in data" :key="index">
    {{ item }}
  </p>
</template>
