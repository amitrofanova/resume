<script setup lang="ts">
interface Props {
  data: string[];
}

defineProps<Props>();
</script>

<template>
  <BaseHeader headingLevel="h2">Дополнительный вклад</BaseHeader>
  <p v-for="(item, index) in data" :key="index">
    {{ item }}
  </p>
</template>
