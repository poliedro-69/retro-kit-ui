import type { Metadata } from 'next'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { DocsNav } from '@/components/docs/docs-nav'
import { Code, DocsSection, Step } from '@/components/docs/docs-section'
import { InstallTabs, PackageManagerProvider } from '@/components/docs/package-manager'
import { Snippet } from '@/components/docs/snippet'
import { RETRO_FONTS, RETRO_THEMES, RetroBadge, RetroLinkButton, RetroTabs } from '@/components/retro-ui'
import { installCommands, registryUrl, shadcnAddCommands, shadcnInitCommands } from '@/lib/docs'
import { credit, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `Installation - ${site.productName}`,
  description: `Install ${site.productName} with npm, pnpm, yarn or bun, or copy the components with the shadcn registry. Includes Tailwind CSS v4 setup, fonts, themes and a minimal example.`,
}

const pkg = site.packageName

const tailwindCss = `/* app/globals.css */
@import 'tailwindcss';
@import '${pkg}/styles.css';
@import '${pkg}/themes.css'; /* optional: color + font themes */

/* Tailwind skips node_modules, so point it at the kit.
   Adjust the path so it goes from this file to node_modules. */
@source '../node_modules/${pkg}/dist';`

const fontsNext = `// app/layout.tsx
import { IBM_Plex_Mono, IBM_Plex_Sans, Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-sans' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-plex-mono' })
const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt323' })
const pressStart = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-press-start' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={\`\${plexSans.variable} \${plexMono.variable} \${vt323.variable} \${pressStart.variable}\`}
    >
      <body>{children}</body>
    </html>
  )
}`

const fontsPlain = `<!-- index.html: any way of loading the fonts works -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&family=VT323&family=Press+Start+2P&display=swap"
  rel="stylesheet"
/>

/* Optional: map your own variables. The kit falls back to the font names. */
:root {
  --font-plex-sans: 'IBM Plex Sans';
  --font-plex-mono: 'IBM Plex Mono';
  --font-vt323: 'VT323';
  --font-press-start: 'Press Start 2P';
}`

const themesAttributes = `<html lang="en" data-rt-theme="phosphor" data-rt-font="pixel">`

const themesComponent = `import { RetroTheme, RetroWindow } from '${pkg}/windows'

export function Terminal() {
  return (
    <RetroTheme theme="phosphor" font="pixel">
      <RetroWindow title="Terminal.exe">...</RetroWindow>
    </RetroTheme>
  )
}`

const cnHelper = `// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

const exampleBody = (importFrom: string, macFrom: string) => `import { RetroButton, RetroTheme, RetroWindow } from '${importFrom}'
import { MacButton, MacWindow } from '${macFrom}'

export default function Page() {
  return (
    <RetroTheme theme="navy" font="plex" className="rt-desktop min-h-screen p-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <RetroWindow title="Hello.exe" status={<span className="flex-1">Ready</span>}>
          <div className="flex flex-col items-start gap-3 p-4">
            <p>Welcome to the 90s.</p>
            <RetroButton variant="primary">OK</RetroButton>
          </div>
        </RetroWindow>

        <MacWindow title="Untitled">
          <div className="p-4">
            <MacButton>Cancel</MacButton>
          </div>
        </MacWindow>

        <p className="text-center text-sm text-white">
          Built with ${site.productName} by{' '}
          <a href="${site.author.url}" className="underline">${site.author.name}</a>
        </p>
      </div>
    </RetroTheme>
  )
}`

const requirements = [
  'React 18 or 19',
  'Tailwind CSS v4 (CSS-first config with @import and @theme)',
  'Any bundler or framework. Examples use the Next.js App Router',
]

function MethodCard({ title, badge, points, href }: { title: string; badge: string; points: string[]; href: string }) {
  return (
    <section aria-label={title} className="rt-sunken flex flex-col gap-3 bg-rt-paper p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-mono text-[12px] font-semibold tracking-widest uppercase">{title}</h3>
        <RetroBadge tone="info">{badge}</RetroBadge>
      </div>
      <ul className="flex flex-1 flex-col gap-1.5">
        {points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-[1px] border border-rt-line bg-rt-ok" />
            {point}
          </li>
        ))}
      </ul>
      <RetroLinkButton href={href} size="sm" className="self-start">
        Go to steps
      </RetroLinkButton>
    </section>
  )
}

export default function DocsPage() {
  return (
    <div id="top" className="rt-desktop min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-white">
          <RetroBadge>Docs</RetroBadge>
          <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Install {site.productName}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-white/90">
            Two ways to get the kits: install the npm package, or copy the source into your project with the shadcn
            registry. Pick your package manager once and every command on this page follows.
          </p>
        </div>

        <PackageManagerProvider>
          <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <DocsNav />
            <div className="flex min-w-0 flex-col gap-6">
              <DocsSection id="overview" title="1. Overview" status="Pick a method">
                <div className="grid gap-4 sm:grid-cols-2">
                  <MethodCard
                    title="npm package"
                    badge="Quick start"
                    href="#npm"
                    points={[
                      'One dependency, updated with semver',
                      'Import from the /windows and /mac entry points',
                      'Best when you want the kit as it ships',
                    ]}
                  />
                  <MethodCard
                    title="shadcn registry"
                    badge="Own the code"
                    href="#shadcn"
                    points={[
                      'Components are copied into your repo',
                      'Edit every file, restyle freely',
                      'Tokens are added to your CSS for you',
                    ]}
                  />
                </div>
                <div>
                  <h3 className="mb-2 font-mono text-[11px] font-semibold tracking-widest uppercase">Requirements</h3>
                  <ul className="flex flex-col gap-1.5">
                    {requirements.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-2 shrink-0 rounded-[1px] border border-rt-line bg-rt-warn"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </DocsSection>

              <DocsSection id="npm" title="2. Install with npm" status={pkg}>
                <Step n={1} title="Add the package">
                  <InstallTabs commands={installCommands(pkg)} />
                  <p className="text-[12px] text-rt-ink/80">
                    Peer dependencies are <Code>react</Code>, <Code>react-dom</Code> and <Code>tailwindcss</Code> v4.
                  </p>
                </Step>
                <Step n={2} title="Set up Tailwind CSS">
                  <p>
                    Import the tokens and tell Tailwind to scan the package, because it ignores{' '}
                    <Code>node_modules</Code> by default.
                  </p>
                  <Snippet code={tailwindCss} label="globals.css" />
                </Step>
                <Step n={3} title="Import the components">
                  <Snippet
                    label="page.tsx"
                    code={`import { RetroWindow, RetroButton } from '${pkg}/windows'\nimport { MacWindow, MacButton } from '${pkg}/mac'`}
                  />
                  <p className="text-[12px] text-rt-ink/80">
                    Entry points: <Code>{pkg}</Code> (both kits), <Code>/windows</Code>, <Code>/mac</Code>,{' '}
                    <Code>/styles.css</Code> and <Code>/themes.css</Code>.
                  </p>
                </Step>
              </DocsSection>

              <DocsSection id="shadcn" title="3. Install with shadcn" status="Copy the source">
                <Step n={1} title="Start from a shadcn project">
                  <p>
                    The components use the <Code>cn</Code> helper from <Code>@/lib/utils</Code>. If your project is not
                    set up yet, run init, or add the helper yourself.
                  </p>
                  <InstallTabs commands={shadcnInitCommands()} />
                  <Snippet code={cnHelper} label="lib/utils.ts" />
                  <p className="text-[12px] text-rt-ink/80">
                    Also needs <Code>clsx</Code> and <Code>tailwind-merge</Code>. The registry installs them for you.
                  </p>
                </Step>
                <Step n={2} title="Add the Windows 3.1 kit">
                  <InstallTabs commands={shadcnAddCommands('retro-ui')} />
                </Step>
                <Step n={3} title="Add the Mac System 7 kit">
                  <InstallTabs commands={shadcnAddCommands('mac-ui')} />
                </Step>
                <Step n={4} title="Optional: themes and product card">
                  <InstallTabs commands={shadcnAddCommands('retro-themes', 'retro-product-card')} />
                  <p className="text-[12px] text-rt-ink/80">
                    The CLI writes components to <Code>components/retro-ui</Code> and <Code>components/mac-ui</Code> and
                    appends the color tokens, utilities and theme rules to your global CSS. Registry index:{' '}
                    <Code>{registryUrl('registry')}</Code>
                  </p>
                </Step>
              </DocsSection>

              <DocsSection id="fonts" title="4. Fonts" status={`${RETRO_FONTS.length} font sets`}>
                <p>
                  The kits read four CSS variables and fall back to the font names. Load the fonts with{' '}
                  <Code>next/font</Code> or any other method. Skip the pixel fonts if you only use the default set.
                </p>
                <RetroTabs
                  panelClassName="rt-raised rounded-[3px] p-2"
                  tabs={[
                    { id: 'next', label: 'Next.js', content: <Snippet code={fontsNext} label="layout.tsx" /> },
                    { id: 'html', label: 'Plain HTML / Vite', content: <Snippet code={fontsPlain} label="index.html" /> },
                  ]}
                />
                <div className="rt-sunken overflow-x-auto bg-rt-paper">
                  <table className="w-full min-w-96 text-left text-[12px]">
                    <caption className="sr-only">Font sets</caption>
                    <thead>
                      <tr className="border-b border-rt-shadow/50 bg-rt-face">
                        <th scope="col" className="px-3 py-1.5 font-mono tracking-widest uppercase">data-rt-font</th>
                        <th scope="col" className="px-3 py-1.5 font-mono tracking-widest uppercase">Look</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RETRO_FONTS.map((font) => (
                        <tr key={font.id} className="border-b border-rt-shadow/30 last:border-0">
                          <td className="px-3 py-1.5 font-mono">{font.id}</td>
                          <td className="px-3 py-1.5">{font.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DocsSection>

              <DocsSection id="themes" title="5. Themes" status={`${RETRO_THEMES.length} color themes`}>
                <p>
                  Colors and fonts are independent. Set <Code>data-rt-theme</Code> and <Code>data-rt-font</Code> on{' '}
                  <Code>{'<html>'}</Code> for the whole app, or wrap a subtree in <Code>RetroTheme</Code>. Try them
                  live in the{' '}
                  <a href="/showcase" className="text-rt-accent underline underline-offset-2 hover:text-rt-accent-deep">
                    component explorer
                  </a>
                  .
                </p>
                <RetroTabs
                  panelClassName="rt-raised rounded-[3px] p-2"
                  tabs={[
                    { id: 'attrs', label: 'HTML attributes', content: <Snippet code={themesAttributes} label="layout.tsx" /> },
                    { id: 'component', label: 'RetroTheme', content: <Snippet code={themesComponent} label="terminal.tsx" /> },
                  ]}
                />
                <ul className="grid gap-2 sm:grid-cols-2" aria-label="Color themes">
                  {RETRO_THEMES.map((theme) => (
                    <li key={theme.id} className="rt-sunken flex items-center gap-3 bg-rt-paper px-3 py-2">
                      <span className="flex shrink-0 overflow-hidden rounded-[2px] border border-rt-line" aria-hidden="true">
                        {theme.swatch.map((color) => (
                          <span key={color} className="size-5" style={{ backgroundColor: color }} />
                        ))}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-medium">{theme.name}</span>
                        <span className="font-mono text-[11px] text-rt-ink/70">data-rt-theme=&quot;{theme.id}&quot;</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </DocsSection>

              <DocsSection id="example" title="6. Minimal example" status="Copy, paste, run">
                <p>A complete page using both kits, a theme and the required credit.</p>
                <RetroTabs
                  panelClassName="rt-raised rounded-[3px] p-2"
                  tabs={[
                    {
                      id: 'npm',
                      label: 'npm package',
                      content: <Snippet code={exampleBody(`${pkg}/windows`, `${pkg}/mac`)} label="app/page.tsx" />,
                    },
                    {
                      id: 'shadcn',
                      label: 'shadcn registry',
                      content: (
                        <Snippet code={exampleBody('@/components/retro-ui', '@/components/mac-ui')} label="app/page.tsx" />
                      ),
                    },
                  ]}
                />
              </DocsSection>

              <DocsSection id="attribution" title="7. Attribution" status="Required">
                <p>
                  {site.productName} is free for personal and commercial work under MIT with an attribution clause. Show
                  this credit somewhere users can see it, with the link to {site.author.name}:
                </p>
                <Snippet code={credit.jsx} label="React" />
                <Snippet code={credit.html} label="HTML" />
                <div>
                  <RetroLinkButton href="/license" size="sm">
                    Read the full license
                  </RetroLinkButton>
                </div>
              </DocsSection>
            </div>
          </div>
        </PackageManagerProvider>
      </main>
      <SiteFooter />
    </div>
  )
}
