<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';

interface Education {
  level: string;
  university: string;
  faculty: string;
  specialisation: string;
  graduationYear: string;
  degree: string;
}

interface Props {
  data: Education;
}

defineProps<Props>();
</script>

<template>
  <BaseHeader type="h2">Образование</BaseHeader>
  <p class="text-sm">{{ data.level }}</p>
  <p class="text-lg font-bold">{{ data.university }}</p>
  <p class="text-sm">{{ data.faculty }}, {{ data.specialisation }}</p>
</template>
