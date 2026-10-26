<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true,
  },
})

const { locale, t } = useI18n()
</script>

<template>
  <article class="job-card">
    <header class="job-card__header">
      <h3 class="job-card__role">{{ job.role }}</h3>
      <p class="job-card__company">
        <span class="job-card__name">{{ job.company }}</span> |
        <a
          class="job-card__site"
          :href="job.website.href"
          target="_blank"
          rel="noreferrer noopener"
        >
          {{ job.website.label }}
        </a>
      </p>  
      <div class="job-card__dates">
        <time :datetime="job.start">{{ formatMonth(job.start, locale) }}</time>
        –
        <time v-if="job.end" :datetime="job.end">{{ formatMonth(job.end, locale) }}</time>
        <span v-else>{{ t('present') }}</span>
      </div>
    </header>

    <ul class="job-card__highlights">
      <li v-for="item in job.highlights" :key="item">
        {{ item }}
      </li>
    </ul>

    <ul class="chip-list" :aria-label="t('sections.stack')">
      <li v-for="item in job.stack" :key="item" class="chip">
        {{ item }}
      </li>
    </ul>
  </article>
</template>
