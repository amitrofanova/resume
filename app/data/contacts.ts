import type { Contacts } from './types'

export const contacts = {
  email: 'mittralena@yandex.ru',
  telegram: {
    label: '@lucubratiuncula',
    href: 'https://t.me/lucubratiuncula',
  },
  github: {
    label: 'github.com/amitrofanova',
    href: 'https://github.com/amitrofanova',
  },
} as const satisfies Contacts
