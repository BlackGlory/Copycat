import { createDOMParser } from 'extra-dom'
import { IURLConfig } from '@src/contract.js'
import { formatURL } from '@utils/format-url.js'

export function formatURLsInHTML(
  html: string
, baseUrl: string
, config: IURLConfig
): string {
  const parser = createDOMParser()
  const document = parser.parseFromString(html, 'text/html')

  for (const element of document.querySelectorAll('[href]')) {
    const url = element.getAttribute('href')
    if (url) {
      element.setAttribute('href', formatURL(url, baseUrl, config))
    }
  }

  for (const element of document.querySelectorAll('[src]')) {
    const url = element.getAttribute('src')
    if (url) {
      element.setAttribute('src', formatURL(url, baseUrl, config))
    }
  }

  return document.body.innerHTML
}
