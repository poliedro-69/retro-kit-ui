import author from '../author.json'

export const site = {
  productName: author.productName,
  siteUrl: author.siteUrl,
  packageName: author.packageName,
  repository: author.repository,
  author: { name: author.name, url: author.url, email: author.email },
  year: author.year,
}

export const credit = {
  text: `Built with ${site.productName} by ${site.author.name}`,
  html: `Built with ${site.productName} by <a href="${site.author.url}">${site.author.name}</a>`,
  markdown: `Built with ${site.productName} by [${site.author.name}](${site.author.url})`,
  jsx: `<p>
  Built with ${site.productName} by{' '}
  <a href="${site.author.url}" target="_blank" rel="noopener">
    ${site.author.name}
  </a>
</p>`,
}
