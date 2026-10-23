export function formatMonth(yearMonth: string, locale: string) {
  const [year, month] = yearMonth.split('-').map(Number)

  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1))
}
