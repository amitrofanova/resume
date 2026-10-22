import { resumeEn } from './resume.en'
import { resumeRu } from './resume.ru'
import type { Resume } from './types'

export const resumes = {
  ru: resumeRu,
  en: resumeEn,
} as const satisfies Record<'ru' | 'en', Resume>
