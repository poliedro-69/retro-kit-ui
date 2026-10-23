// Generates packages/retro-ui from the components in this repo (single source of truth).
// Run: node scripts/sync-package.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkgDir = join(root, 'packages/retro-ui')
const srcDir = join(pkgDir, 'src')
const author = JSON.parse(readFileSync(join(root, 'author.json'), 'utf8'))

const kits = [
  { from: 'components/retro-ui', to: 'windows' },
  { from: 'components/mac-ui', to: 'mac' },
]

rmSync(srcDir, { recursive: true, force: true })

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

// Adds explicit .js extensions so the output works in strict ESM resolvers.
function fixImports(file, code) {
  return code.replace(/from '(\.{1,2}\/[^']+)'/g, (_, spec) => {
    const abs = resolve(dirname(file), spec)
    if (existsSync(abs) && statSync(abs).isDirectory()) return `from '${spec}/index.js'`
    return `from '${spec}.js'`
  })
}

function copyKit(fromDir, toDir) {
  for (const entry of readdirSync(fromDir, { withFileTypes: true })) {
    if (entry.isDirectory()) continue // blocks/ ships through the shadcn registry only
    const source = join(fromDir, entry.name)
    const target = join(toDir, entry.name)
    const code = readFileSync(source, 'utf8').replace(/'@\/lib\/utils'/g, "'../lib/utils'")
    write(target, fixImports(source, code))
  }
}

for (const kit of kits) {
  copyKit(join(root, kit.from), join(srcDir, kit.to))
}

write(
  join(srcDir, 'lib/utils.ts'),
  `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
)

write(join(srcDir, 'index.ts'), "export * from './windows/index.js'\nexport * from './mac/index.js'\n")

const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const pkg = {
  name: author.packageName,
  version: '0.1.0',
  description: `Free Windows 3.1 and Mac System 7 inspired React + Tailwind CSS components. Built with ${author.productName} by ${author.name}.`,
  keywords: ['react', 'tailwindcss', 'ui', 'retro', 'windows-3.1', 'system-7', 'components'],
  license: 'SEE LICENSE IN LICENSE',
  author: `${author.name} <${author.email}> (${author.url})`,
  homepage: author.siteUrl,
  repository: { type: 'git', url: `git+${author.repository}.git` },
  type: 'module',
  sideEffects: ['**/*.css'],
  files: ['dist', 'styles.css', 'themes.css', 'LICENSE', 'README.md'],
  exports: {
    '.': { types: './dist/index.d.ts', default: './dist/index.js' },
    './windows': { types: './dist/windows/index.d.ts', default: './dist/windows/index.js' },
    './mac': { types: './dist/mac/index.d.ts', default: './dist/mac/index.js' },
    './styles.css': './styles.css',
    './themes.css': './themes.css',
  },
  scripts: { build: 'tsc -p tsconfig.json', prepublishOnly: 'pnpm run build' },
  dependencies: {
    clsx: rootPkg.dependencies.clsx,
    'tailwind-merge': rootPkg.dependencies['tailwind-merge'],
  },
  peerDependencies: {
    react: '^18 || ^19',
    'react-dom': '^18 || ^19',
    tailwindcss: '^4',
  },
  publishConfig: { access: 'public' },
}
write(join(pkgDir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)

const template = readFileSync(join(root, 'license/LICENSE.template'), 'utf8')
const license = template
  .replaceAll('{{year}}', String(author.year))
  .replaceAll('{{name}}', author.name)
  .replaceAll('{{url}}', author.url)
  .replaceAll('{{product}}', author.productName)
write(join(root, 'LICENSE'), license)
write(join(pkgDir, 'LICENSE'), license)

console.log(`Synced ${author.packageName} -> packages/retro-ui`)

// Web Components + framework wrappers share the author data, license and themes.
const elementsName = `${author.packageName}-elements`
const siblings = [{ dir: 'retro-elements', suffix: 'elements' }]

const previousElementsName = JSON.parse(
  readFileSync(join(root, 'packages/retro-elements/package.json'), 'utf8'),
).name

// Source and typings import the elements package by name; keep them in step with author.json.
function renameInFiles(files, from, to) {
  if (from === to) return
  for (const file of files) {
    if (!existsSync(file)) continue
    const code = readFileSync(file, 'utf8')
    if (code.includes(from)) writeFileSync(file, code.replaceAll(from, to))
  }
}
renameInFiles(
  [join(root, 'packages/retro-elements/types/react.d.ts')],
  previousElementsName,
  elementsName,
)

for (const { dir, suffix } of siblings) {
  const target = join(root, 'packages', dir)
  const file = join(target, 'package.json')
  const manifest = JSON.parse(readFileSync(file, 'utf8'))
  manifest.name = `${author.packageName}-${suffix}`
  manifest.author = `${author.name} <${author.email}> (${author.url})`
  manifest.homepage = author.siteUrl
  manifest.repository = { type: 'git', url: `git+${author.repository}.git`, directory: `packages/${dir}` }
  manifest.scripts = { ...manifest.scripts, prepublishOnly: 'pnpm run build' }
  const oldDependency = Object.keys(manifest.dependencies ?? {}).find((name) => name.endsWith('-elements'))
  if (oldDependency) {
    delete manifest.dependencies[oldDependency]
    manifest.dependencies[elementsName] = 'workspace:*'
  }
  write(file, `${JSON.stringify(manifest, null, 2)}\n`)
  write(join(target, 'LICENSE'), license)
}

const tokens = {
  '{{elementsPackage}}': elementsName,
  '{{reactPackage}}': author.packageName,
  '{{product}}': author.productName,
  '{{siteUrl}}': author.siteUrl,
  '{{year}}': String(author.year),
  '{{authorName}}': author.name,
  '{{authorUrl}}': author.url,
  '{{creditHtml}}': `Built with ${author.productName} by <a href="${author.url}">${author.name}</a>`,
  '{{creditMarkdown}}': `Built with ${author.productName} by [${author.name}](${author.url})`,
}
function renderReadme(templateName) {
  let text = readFileSync(join(root, 'license', templateName), 'utf8')
  for (const [token, value] of Object.entries(tokens)) text = text.replaceAll(token, value)
  return text
}
write(join(root, 'packages/retro-elements/README.md'), renderReadme('README.elements.template.md'))
write(
  join(root, 'packages/retro-elements/themes.css'),
  readFileSync(join(pkgDir, 'themes.css'), 'utf8'),
)
console.log('Synced elements manifest, LICENSE and themes.css')
