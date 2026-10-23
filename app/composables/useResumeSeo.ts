import { resumes } from '~/data/resume'
import { htmlToPlainParagraph } from '~/utils/htmlToPlainParagraph'
import { siteOrigin } from '~/utils/siteOrigin'

export function useResumeSeo() {
  const resume = useResume()
  const { locale } = useI18n()
  const { app } = useRuntimeConfig()

  const title = computed(() => `${resume.value.name} — ${resume.value.role}`)
  const description = computed(() => htmlToPlainParagraph(resume.value.about))

  const pageUrl = computed(() => {
    const base = app.baseURL.endsWith('/') ? app.baseURL : `${app.baseURL}/`
    const suffix = locale.value === 'en' ? 'en' : ''
    return new URL(`${base}${suffix}`, siteOrigin).href.replace(/\/+$/, '')
  })

  const ogImage = computed(() => {
    const base = app.baseURL.endsWith('/') ? app.baseURL : `${app.baseURL}/`
    return new URL(`${base}og-${locale.value}.png`, siteOrigin).href
  })

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
