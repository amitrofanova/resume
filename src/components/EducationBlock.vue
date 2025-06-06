<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import type Education from '../types/models/education.ts';

interface Props {
  data: Education;
}

defineProps<Props>();
</script>

<template>
  <BaseHeader headingLevel="h2">Образование</BaseHeader>
  <p class="text-sm">{{ data.level }}</p>
  <p class="text-lg font-bold">{{ data.university }}</p>
  <p class="text-sm">{{ data.faculty }}, {{ data.specialisation }}</p>
</template>
