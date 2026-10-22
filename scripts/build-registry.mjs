// Generates registry.json for the shadcn CLI, then builds public/r/*.json.
// Run: node scripts/build-registry.mjs
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const author = JSON.parse(readFileSync(join(root, 'author.json'), 'utf8'))

function parseTokens(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const declarations = (body) =>
    body
      .split(';')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(':')
        return [line.slice(0, index).trim(), line.slice(index + 1).replace(/\s+/g, ' ').trim()]
      })

  const theme = {}
  for (const match of clean.matchAll(/@theme\s*\{([^}]*)\}/g)) {
    for (const [prop, value] of declarations(match[1])) theme[prop.replace(/^--/, '')] = value
  }

  const css_ = {}
  for (const match of clean.matchAll(/@utility\s+([\w-]+)\s*\{([^}]*)\}/g)) {
    css_[`@utility ${match[1]}`] = Object.fromEntries(declarations(match[2]))
  }
  return { theme, utilities: css_ }
}

function parseThemes(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const blocks = {}
  for (const match of clean.matchAll(/(\[data-rt-[^\]]+\])\s*\{([^}]*)\}/g)) {
    blocks[match[1]] = Object.fromEntries(
      match[2]
        .split(';')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const index = line.indexOf(':')
          return [line.slice(0, index).trim(), line.slice(index + 1).replace(/\s+/g, ' ').trim()]
        }),
    )
  }
  return blocks
}

const tokens = parseTokens(readFileSync(join(root, 'packages/retro-ui/styles.css'), 'utf8'))
const themeBlocks = parseThemes(readFileSync(join(root, 'packages/retro-ui/themes.css'), 'utf8'))
const pick = (predicate) => Object.fromEntries(Object.entries(tokens.theme).filter(([key]) => predicate(key)))
const retroTheme = pick((key) => !key.startsWith('color-mac'))
const macTheme = pick((key) => key.startsWith('color-mac') || key === 'font-rt-mono')

function filesIn(dir, type) {
  return readdirSync(join(root, dir), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => ({ path: `${dir}/${entry.name}`, type, target: `${dir}/${entry.name}` }))
}

const meta = { author: `${author.name} (${author.url})`, license: 'MIT with Attribution' }

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'retrokit',
  homepage: author.siteUrl,
  items: [
    {
      name: 'retro-ui',
      type: 'registry:component',
      title: 'Windows 3.1 Kit',
      description: 'Windows 3.1 structure with a modern finish: window, button, fields, menubar, tabs, feedback and dialog.',
      dependencies: ['clsx', 'tailwind-merge'],
      files: filesIn('components/retro-ui', 'registry:component'),
      cssVars: { theme: retroTheme },
      css: tokens.utilities,
      meta,
    },
    {
      name: 'mac-ui',
      type: 'registry:component',
      title: 'Mac System 7 Kit',
      description: 'Mac System 7 inspired window, button, fields, menubar and feedback components.',
      dependencies: ['clsx', 'tailwind-merge'],
      files: filesIn('components/mac-ui', 'registry:component'),
      cssVars: { theme: macTheme },
      meta,
    },
    {
      name: 'retro-themes',
      type: 'registry:style',
      title: 'RetroKit themes',
      description:
        'Six color themes (Classic Navy, Hot Dog Stand, Phosphor Green, Amber Terminal, Rose, Dark) and four font themes (IBM Plex, Pixel, System, Mono). Set data-rt-theme and data-rt-font on any element, or use <RetroTheme>.',
      registryDependencies: [`${author.siteUrl}/r/retro-ui.json`],
      css: themeBlocks,
      meta,
    },
    {
      name: 'retro-product-card',
      type: 'registry:block',
      title: 'Retro product card',
      description: 'E-commerce product card built with the Windows 3.1 Kit. Uses next/image.',
      registryDependencies: [`${author.siteUrl}/r/retro-ui.json`],
      files: filesIn('components/retro-ui/blocks', 'registry:component'),
      meta,
    },
  ],
}

writeFileSync(join(root, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`)
console.log('Wrote registry.json')

execFileSync('pnpm', ['exec', 'shadcn', 'build', '--output', 'public/r'], { cwd: root, stdio: 'inherit' })
