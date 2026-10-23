export function htmlToPlainParagraph(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .split(/\n+/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .find(Boolean) ?? ''
}
