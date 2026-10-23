<script setup lang="ts">
const { t } = useI18n()
const resume = useResume()

const contactItems = computed(() => [
  {
    href: `mailto:${resume.value.contacts.email}`,
    label: resume.value.contacts.email,
    icon: 'lucide:mail',
    external: false,
  },
  {
    href: resume.value.contacts.telegram.href,
    label: resume.value.contacts.telegram.label,
    icon: 'lucide:send',
    external: true,
  },
  {
    href: resume.value.contacts.github.href,
    label: resume.value.contacts.github.label,
    icon: 'lucide:github',
    external: true,
  },
])

useHead(() => ({
  title: t('siteTitle'),
}))
</script>

<template>
  <main class="page-main page-width resume">
    <section class="hero">
      <p class="hero__role">{{ resume.role }}</p>
      <h1>{{ resume.name }}</h1>
      <ul class="contact-list">
        <li v-for="item in contactItems" :key="item.href">
          <a
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noreferrer noopener' : undefined"
          >
            <Icon class="contact-list__icon" :name="item.icon" size="1.1em" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </section>

    <section>
      <h2>{{ t('sections.about') }}</h2>
      <p v-html="resume.about" class="resume-lead" />
    </section>

    <section>
      <h2>{{ t('sections.experience') }}</h2>
      <div class="job-list">
        <ResumeJobCard
          v-for="job in resume.experience"
          :key="job.company + job.start"
          :job="job"
        />
      </div>
    </section>

    <section>
      <h2>{{ t('sections.skills') }}</h2>
      <div class="skill-grid">
        <article v-for="group in resume.skills" :key="group.title" class="skill-card">
          <h3>{{ group.title }}</h3>
          <ul class="chip-list">
            <li v-for="item in group.items" :key="item" class="chip">
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section>
      <h2>{{ t('sections.languages') }}</h2>
      <ul class="language-list">
        <li v-for="item in resume.languages" :key="item.name">
          <span>{{ item.name }}</span>
          <span class="muted">{{ item.level }}</span>
        </li>
      </ul>
    </section>

    <section>
      <h2>{{ t('sections.education') }}</h2>
      <article
        v-for="item in resume.education"
        :key="item.institution"
        class="edu-card"
      >
        <p class="muted">{{ item.year }}</p>
        <h3>{{ item.institution }}</h3>
        <p>{{ item.faculty }}</p>
        <p>{{ item.field }}</p>
      </article>
    </section>
  </main>
</template>
