import { resumes } from '~/data/resume'

export function useResume() {
  const { locale } = useI18n()

  return computed(() => (locale.value === 'en' ? resumes.en : resumes.ru))
}
