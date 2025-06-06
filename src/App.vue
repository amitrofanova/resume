<script setup lang="ts">
import DescriptionBlock from './components/DescriptionBlock.vue';
import ContactsBlock from './components/ContactsBlock.vue';
import ExperienceBlock from './components/ExperienceBlock.vue';
import EducationBlock from './components/EducationBlock.vue';
import SkillsBlock from './components/SkillsBlock.vue';
import ContributionBlock from './components/ContributionBlock.vue';
import { useFetch } from './composables/useFetch.ts';
import type { ApplicantData } from './types/app.ts';

const { data, error, loading } = useFetch<ApplicantData>('/data.json');
</script>

<template>
  <main>
    <div v-if="data">
      <div class="container max-w-5xl h-vh flex">
        <section class="w-1/2 flex flex-col gap-10 p-5 bg-orange-300">
          <DescriptionBlock>
            <template #name>
              {{ data.name }}
            </template>
            <template #jobTitle>
              {{ data.jobTitle }}
            </template>
            <template #about>
              {{ data.about }}
            </template>
          </DescriptionBlock>
          <ContactsBlock :contacts="data.contacts" />
        </section>
        <section class="grow p-5 bg-gray-50">
          <ExperienceBlock :items="data.experience" />
          <EducationBlock :data="data.education" />
          <SkillsBlock :data="data.skills" />
          <ContributionBlock :data="data.contribution" />
        </section>
      </div>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
  </main>
</template>
