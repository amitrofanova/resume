<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import type { SkillItem } from '../types/models/skill.ts';

interface Props {
  data: SkillItem[];
}

defineProps<Props>();
</script>

<template>
  <BaseHeader headingLevel="h2">Навыки</BaseHeader>
  <div class="flex flex-wrap gap-2">
    <div v-for="(item, index) in data" :key="index" class="p-2 bg-orange-300">
      {{ Object.keys(item)[0] }}
    </div>
  </div>
</template>
