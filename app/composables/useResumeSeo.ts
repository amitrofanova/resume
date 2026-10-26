import { resumes } from '~/data/resume'

export function useResumeSeo() {
  const resume = useResume()
  const { locale, baseUrl } = useI18n()

  const title = computed(() => `${resume.value.name} — ${resume.value.role}`)
  const description = computed(() => resume.value.about[0] ?? '')

  const pageUrl = computed(() => {
    const suffix = locale.value === 'en' ? 'en' : ''
    return new URL(suffix, baseUrl.value).href.replace(/\/+$/, '')
  })

  const ogImage = computed(
    () => new URL(`og-${locale.value}.png`, baseUrl.value).href,
  )

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: pageUrl,
    ogImage,
    ogImageType: 'image/png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: title,
  })

  useHead(() => ({
    script: [
      {
        key: 'person-jsonld',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: resume.value.name,
          alternateName: locale.value === 'en' ? resumes.ru.name : resumes.en.name,
          jobTitle: resume.value.role,
          description: description.value,
          url: pageUrl.value,
          email: resume.value.contacts.email,
          sameAs: [
            resume.value.contacts.github.href,
            resume.value.contacts.telegram.href,
          ],
        }),
      },
    ],
  }))
}
