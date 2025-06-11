<script setup lang="ts">
import DescriptionBlock from './components/DescriptionBlock.vue';
import ContactsBlock from './components/ContactsBlock.vue';
import ExperienceBlock from './components/ExperienceBlock.vue';
import EducationBlock from './components/EducationBlock.vue';
import SkillsBlock from './components/SkillsBlock.vue';
import ContributionBlock from './components/ContributionBlock.vue';
import ThemeToggle from './components/ui/ThemeToggle.vue';
import { useFetch } from './composables/useFetch.ts';

const baseUrl = import.meta.env.BASE_URL;

const { data, error, loading } = useFetch(`${baseUrl}data.json`);
</script>

<template>
  <main>
    <div v-if="data">
      <div class="container relative max-w-5xl h-vh md:flex">
        <header class="absolute left-0 right-0 h-10 flex justify-end items-end pr-5">
          <ThemeToggle />
        </header>
        <section class="md:w-1/2 flex flex-col gap-10 p-5 bg-surface text-text">
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
        <section class="grow p-5 pb-20 bg-bg text-text border-r border-[var(--color-surface)]">
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
