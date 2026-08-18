<script setup lang="ts">
import DescriptionBlock from './components/DescriptionBlock.vue';
import ContactsBlock from './components/ContactsBlock.vue';
import ExperienceBlock from './components/ExperienceBlock.vue';
import EducationBlock from './components/EducationBlock.vue';
import SkillsBlock from './components/SkillsBlock.vue';
import ContributionBlock from './components/ContributionBlock.vue';
import { useFetch } from './composables/useFetch.ts';

const baseUrl = import.meta.env.BASE_URL;

const { data, error, loading } = useFetch(`${baseUrl}data.json`);
</script>

<template>
  <div v-if="data" class="container relative max-w-5xl h-vh">
    <header
      class="app-header absolute left-0 right-0 h-10 flex justify-end items-center pr-5 print:hidden"
    >
      <DownloadPdf />
      <ThemeToggle />
    </header>
    <main class="md:flex">
      <div class="md:w-1/2 flex flex-col gap-10 p-5 bg-surface text-text">
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
      </div>
      <div class="grow p-5 pb-20 bg-bg text-text border-r border-[var(--color-surface)]">
        <ExperienceBlock :items="data.experience" />
        <EducationBlock :data="data.education" />
        <SkillsBlock :data="data.skills" />
        <ContributionBlock :data="data.contribution" />
      </div>
    </main>
  </div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="loading">Loading...</div>
</template>

<style>
@media print {
  @page {
    size: A4 landscape;
    margin: 10mm;
  }

  html,
  body {
    background: #fff;
  }

  /* Keep the chosen colors/backgrounds in the printed output. */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .app-header {
    display: none !important;
  }

  /* Use the full printable width instead of the on-screen max-width. */
  .container {
    display: flex !important;
    max-width: none !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /*
   * The responsive `md:flex` utility depends on the viewport width, which is
   * usually below the `md` breakpoint while printing, so force the 2-column
   * layout here.
   */
  main {
    display: flex !important;
    width: 100%;
    align-items: stretch;
  }

  main > div:first-child {
    flex: 0 0 40%;
    width: 40%;
  }

  main > div:last-child {
    flex: 1 1 auto;
    padding-bottom: 1.25rem;
  }

  h1,
  h2,
  h3 {
    break-after: avoid;
  }
}
</style>
