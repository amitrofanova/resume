<script setup lang="ts">
import type ExperienceItem from '../types/models/experience.ts';

interface Props {
  items: ExperienceItem[];
}

defineProps<Props>();

const getStaskString = (stackArray: string[]) => stackArray.join(', ');
</script>

<template>
  <section>
    <BaseHeader headingLevel="h2">Опыт работы</BaseHeader>
    <section v-for="item in items" :key="item.jobTitle" class="grid gap-2">
      <h3 class="mt-4 text-lg font-bold">{{ item.jobTitle }}</h3>
      <div>
        <span class="italic">{{ item.companyName }}</span>
        &nbsp;|&nbsp;
        <a
          :href="item.companyWebsite"
          :aria-label="`Сайт компании ${item.companyName}`"
          target="_blank"
          class="text-sm text-gray-400 underline hover:no-underline"
        >
          {{ item.companyWebsite }}
        </a>
      </div>
      <p class="text-xs">{{ item.beginDate }} - {{ item.endDate }}</p>
      <ul class="list-disc list-inside">
        <li v-for="task in item.tasks" :key="task" class="text-sm">{{ task }}</li>
      </ul>
      <div v-if="item.stack?.length">
        <strong class="text-md underline">Стек:</strong>
        {{ getStaskString(item.stack) }}
      </div>
    </section>
  </section>
</template>
