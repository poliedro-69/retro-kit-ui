import { Code, Step } from '@/components/docs/docs-section'
import { InstallTabs } from '@/components/docs/package-manager'
import { Snippet } from '@/components/docs/snippet'
import { RetroBadge, RetroLinkButton } from '@/components/retro-ui'
import { installCommands } from '@/lib/docs'
import { site } from '@/lib/site'

const elements = site.elementsPackage
const reactKit = site.packageName
const creditHtml = `Built with ${site.productName} by <a href="${site.author.url}">${site.author.name}</a>`

const conventions = [
  'Props are plain attributes in kebab-case. Booleans are present or absent, like disabled.',
  'Events are native and bubble through the shadow root: input, change and close.',
  'Colors and fonts are CSS custom properties, so data-rt-theme and data-rt-font re-skin the elements too.',
  'Importing the package on the server is safe. The elements upgrade in the browser.',
]

const hideBeforeUpgrade = `/* Hide the unstyled markup before custom elements upgrade */
:is(rt-window, rt-dialog, rt-tabs, mac-window, mac-alert):not(:defined) {
  visibility: hidden;
}`

export function FrameworksOverview() {
  return (
    <>
      <p>
        {site.productName} ships native React components and framework-agnostic Web Components. Install <Code>{reactKit}</Code> for React, or <Code>{elements}</Code> when sharing the design system with other JavaScript applications.
      </p>
      <div className="rt-sunken overflow-x-auto bg-rt-paper">
        <table className="w-full min-w-120 text-left text-[12px]">
          <caption className="sr-only">Available packages</caption>
          <thead><tr className="border-b border-rt-shadow/50 bg-rt-face"><th scope="col" className="px-3 py-1.5 font-mono uppercase">Package</th><th scope="col" className="px-3 py-1.5 font-mono uppercase">Use case</th></tr></thead>
          <tbody>
            <tr className="border-b border-rt-shadow/30"><td className="px-3 py-1.5 font-mono">{reactKit}</td><td className="px-3 py-1.5">Native React and Next.js components.</td></tr>
            <tr><td className="px-3 py-1.5 font-mono">{elements}</td><td className="px-3 py-1.5">Web Components for any JavaScript app.</td></tr>
          </tbody>
        </table>
      </div>
      <ul className="flex flex-col gap-1.5">{conventions.map((item) => <li key={item} className="flex gap-2.5"><span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-[1px] border border-rt-line bg-rt-ok" />{item}</li>)}</ul>
      <div className="flex flex-col gap-2"><h3 className="font-mono text-[11px] font-semibold uppercase">Server rendering</h3><p>With SSR the page paints before the elements upgrade. Add this rule to your global CSS to avoid a flash of unstyled content.</p><Snippet code={hideBeforeUpgrade} label="global.css" /></div>
      <div className="flex flex-wrap items-center gap-2"><RetroLinkButton href="/elements" size="sm">Try the elements live</RetroLinkButton><RetroBadge tone="info">Windows 3.1 + Mac System 7</RetroBadge></div>
    </>
  )
}

const reactTypes = `/// <reference types="${elements}/react" />`
const reactRegister = `// components/retro-elements.tsx
'use client'

import '${elements}'
import '${elements}/themes.css'

export function RetroElements() { return null }`
const reactExample = `'use client'

import { useState } from 'react'

export function Settings() {
  const [open, setOpen] = useState(false)
  return (
    <rt-window heading="Hello.exe">
      <rt-button variant="primary" onClick={() => setOpen(true)}>Open dialog</rt-button>
      <rt-dialog heading="Confirm" open={open} onclose={() => setOpen(false)}>
        Save changes?
        <rt-button slot="actions" variant="primary" onClick={() => setOpen(false)}>OK</rt-button>
      </rt-dialog>
      <p>${creditHtml}</p>
    </rt-window>
  )
}`

export function ReactGuide() {
  return (
    <>
      <p>Use the native components from <Code>{reactKit}</Code> for React-only apps, or the Web Components from <Code>{elements}</Code> when sharing one design system across applications.</p>
      <Step n={1} title="Install the elements"><InstallTabs commands={installCommands(elements)} /></Step>
      <Step n={2} title="Add the JSX types"><p>Reference the typings in <Code>retrokit-elements.d.ts</Code>.</p><Snippet code={reactTypes} label="retrokit-elements.d.ts" /></Step>
      <Step n={3} title="Register on the client"><Snippet code={reactRegister} label="retro-elements.tsx" /></Step>
      <Step n={4} title="Build a component"><Snippet code={reactExample} label="settings.tsx" /></Step>
    </>
  )
}
