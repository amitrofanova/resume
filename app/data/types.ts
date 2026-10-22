export type ContactLink = {
  label: string
  href: string
}

export type Contacts = {
  email: string
  telegram: ContactLink
  github: ContactLink
}

export type Job = {
  company: string
  role: string
  start: string
  end: string | null
  highlights: string[]
  stack: string[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type Education = {
  institution: string
  faculty: string
  field: string
  year: string
}

export type SpokenLanguage = {
  name: string
  level: string
}

export type Resume = {
  name: string
  role: string
  about: string
  contacts: Contacts
  experience: Job[]
  skills: SkillGroup[]
  languages: SpokenLanguage[]
  education: Education[]
}
