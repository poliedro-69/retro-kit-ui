import { Code, Step } from '@/components/docs/docs-section'
import { InstallTabs } from '@/components/docs/package-manager'
import { Snippet } from '@/components/docs/snippet'
import { RetroBadge, RetroLinkButton } from '@/components/retro-ui'
import { installCommands } from '@/lib/docs'
import { site } from '@/lib/site'

const elements = site.elementsPackage
const vue = site.vuePackage
const reactKit = site.packageName

const creditHtml = `Built with ${site.productName} by <a href="${site.author.url}">${site.author.name}</a>`

const frameworkRows = [
  { framework: 'Vue 3 / Nuxt', pkg: vue, note: 'Typed components with v-model and named slots', href: '#vue' },
  { framework: 'React / Next.js', pkg: reactKit, note: 'Native React components. Or use the Web Components below', href: '#react' },
  { framework: 'Svelte / SvelteKit', pkg: elements, note: 'Web Components with Svelte 5 typings', href: '#svelte' },
  { framework: 'Anything else', pkg: elements, note: 'Astro, Angular, Solid or plain HTML with a bundler', href: '#frameworks' },
]

const conventions = [
  'Props are plain attributes in kebab-case. Booleans are present or absent, like disabled.',
  'Events are native and bubble through the shadow root: input, change and close.',
  'Colors and fonts are CSS custom properties, so data-rt-theme and data-rt-font re-skin the elements too.',
  'Importing the package on the server is safe. The elements upgrade in the browser.',
]

const hideBeforeUpgrade = `/* Hide the unstyled markup that server rendering sends before the elements upgrade */
:is(rt-window, rt-dialog, rt-tabs, mac-window, mac-alert):not(:defined) {
  visibility: hidden;
}`

export function FrameworksOverview() {
  return (
    <>
      <p>
        {site.productName} ships its kits as framework-agnostic Web Components. Install{' '}
        <Code>{elements}</Code> once and use it anywhere, or pick a wrapper that feels native in your framework.
      </p>
      <div className="rt-sunken overflow-x-auto bg-rt-paper">
        <table className="w-full min-w-120 text-left text-[12px]">
          <caption className="sr-only">Packages by framework</caption>
          <thead>
            <tr className="border-b border-rt-shadow/50 bg-rt-face">
              <th scope="col" className="px-3 py-1.5 font-mono tracking-widest uppercase">Framework</th>
              <th scope="col" className="px-3 py-1.5 font-mono tracking-widest uppercase">Package</th>
              <th scope="col" className="px-3 py-1.5 font-mono tracking-widest uppercase">Notes</th>
            </tr>
          </thead>
          <tbody>
            {frameworkRows.map((row) => (
              <tr key={row.framework} className="border-b border-rt-shadow/30 align-top last:border-0">
                <td className="px-3 py-1.5 font-medium">
                  <a
                    href={row.href}
                    className="text-rt-accent underline underline-offset-2 hover:text-rt-accent-deep"
                  >
                    {row.framework}
                  </a>
                </td>
                <td className="px-3 py-1.5 font-mono break-all">{row.pkg}</td>
                <td className="px-3 py-1.5">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="mb-2 font-mono text-[11px] font-semibold tracking-widest uppercase">How the elements behave</h3>
        <ul className="flex flex-col gap-1.5">
          {conventions.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-[1px] border border-rt-line bg-rt-ok" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-mono text-[11px] font-semibold tracking-widest uppercase">Server rendering</h3>
        <p>
          With SSR the page paints before the elements upgrade. Add this rule to your global CSS to avoid a flash of
          unstyled content.
        </p>
        <Snippet code={hideBeforeUpgrade} label="global.css" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <RetroLinkButton href="/elements" size="sm">
          Try the elements live
        </RetroLinkButton>
        <RetroBadge tone="info">Windows 3.1 + Mac System 7</RetroBadge>
      </div>
    </>
  )
}

const vueMain = `// main.ts
import { createApp } from 'vue'
import RetroKit from '${vue}'
import '${elements}/themes.css' // optional: color + font themes
import App from './App.vue'

createApp(App).use(RetroKit).mount('#app')`

const vueLocal = `<script setup lang="ts">
import { RtWindow, RtButton, MacWindow } from '${vue}'
</script>`

const vueApp = `<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const subscribed = ref(true)
const plan = ref('pro')
const tab = ref('general')
const open = ref(false)
</script>

<template>
  <RtWindow heading="Hello.exe">
    <template #status>Ready</template>

    <RtInput v-model="name" label="Your name" placeholder="Ada Lovelace" />
    <RtCheckbox v-model="subscribed">Subscribe to updates</RtCheckbox>

    <RtGroup legend="Plan">
      <RtRadio v-model="plan" value="free">Free</RtRadio>
      <RtRadio v-model="plan" value="pro">Pro</RtRadio>
    </RtGroup>

    <RtTabs v-model="tab">
      <RtTab name="general" label="General">General settings</RtTab>
      <RtTab name="about" label="About">About this app</RtTab>
    </RtTabs>

    <RtButton variant="primary" @click="open = true">Open dialog</RtButton>

    <RtDialog heading="Confirm" :open="open" @close="open = false">
      Save changes for {{ name || 'nobody' }}?
      <template #actions>
        <RtButton variant="primary" @click="open = false">OK</RtButton>
      </template>
    </RtDialog>

    <p>${creditHtml}</p>
  </RtWindow>
</template>`

const vueRawTags = `// vite.config.ts: only needed if you write <rt-window> tags yourself
import vue from '@vitejs/plugin-vue'
import { isRetroElement } from '${vue}'

export default {
  plugins: [vue({ template: { compilerOptions: { isCustomElement: isRetroElement } } })],
}`

const nuxtPlugin = `// plugins/retrokit.ts
import RetroKit from '${vue}'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(RetroKit)
})`

const nuxtConfig = `// nuxt.config.ts
export default defineNuxtConfig({
  css: ['${elements}/themes.css'],
})`

export function VueGuide() {
  return (
    <>
      <p>
        <Code>{vue}</Code> wraps the Web Components as Vue 3 components. You get <Code>v-model</Code>, typed props and
        named slots, and no custom element config.
      </p>
      <Step n={1} title="Install">
        <InstallTabs commands={installCommands(vue)} />
        <p className="text-[12px] text-rt-ink/80">
          Requires Vue 3.4 or newer. <Code>{elements}</Code> is installed with it.
        </p>
      </Step>
      <Step n={2} title="Register the components">
        <p>Register everything globally with the plugin, or import only what you need in a component.</p>
        <Snippet code={vueMain} label="main.ts" />
        <Snippet code={vueLocal} label="Local import" />
      </Step>
      <Step n={3} title="Use them with v-model and slots">
        <Snippet code={vueApp} label="App.vue" />
        <p className="text-[12px] text-rt-ink/80">
          Slots: <Code>menu</Code> and <Code>status</Code> on <Code>RtWindow</Code>, <Code>actions</Code> on{' '}
          <Code>RtDialog</Code> and <Code>MacAlert</Code>. The <Code>close</Code> event of windows and dialogs reaches
          Vue as <Code>@close</Code>.
        </p>
      </Step>
      <Step n={4} title="Nuxt">
        <p>
          Register the plugin for both server and client. The package is safe to import during SSR, so no{' '}
          <Code>.client</Code> suffix or <Code>ClientOnly</Code> wrapper is needed.
        </p>
        <Snippet code={nuxtPlugin} label="plugins/retrokit.ts" />
        <Snippet code={nuxtConfig} label="nuxt.config.ts" />
      </Step>
      <Step n={5} title="Optional: raw tags in templates">
        <p>
          To write <Code>{'<rt-window>'}</Code> directly instead of the wrappers, tell the Vue compiler they are custom
          elements.
        </p>
        <Snippet code={vueRawTags} label="vite.config.ts" />
      </Step>
    </>
  )
}

const reactTypes = `/// <reference types="${elements}/react" />`

const reactRegister = `// components/retro-elements.tsx
'use client'

import '${elements}'
import '${elements}/themes.css' // optional: color + font themes

export function RetroElements() {
  return null
}`

const reactLayout = `// app/layout.tsx
import { RetroElements } from '@/components/retro-elements'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-rt-theme="navy" data-rt-font="plex">
      <body>
        <RetroElements />
        {children}
      </body>
    </html>
  )
}`

const reactHook = `// hooks/use-element-event.ts
import { useEffect, type RefObject } from 'react'

export function useElementEvent(
  ref: RefObject<HTMLElement | null>,
  type: string,
  listener: (event: Event) => void,
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.addEventListener(type, listener)
    return () => node.removeEventListener(type, listener)
  }, [ref, type, listener])
}`

const reactExample = `'use client'

import { useRef, useState } from 'react'
import { useElementEvent } from '@/hooks/use-element-event'

export function Settings() {
  const nameRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  useElementEvent(nameRef, 'input', (event) => setName((event.target as HTMLInputElement).value))
  useElementEvent(dialogRef, 'close', () => setOpen(false))

  return (
    <rt-window heading="Hello.exe">
      <rt-input ref={nameRef} label="Your name" placeholder="Ada Lovelace" />
      <rt-button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </rt-button>

      <rt-dialog ref={dialogRef} heading="Confirm" open={open}>
        Save changes for {name || 'nobody'}?
        <rt-button slot="actions" variant="primary" onClick={() => setOpen(false)}>
          OK
        </rt-button>
      </rt-dialog>

      <p>${creditHtml}</p>
    </rt-window>
  )
}`

export function ReactGuide() {
  return (
    <>
      <p>
        There are two ways to use the kits in React. The native components from <Code>{reactKit}</Code> are covered in
        the npm section above and are the better fit for a React-only app. The Web Components below suit teams that
        share one design system across React, Vue and Svelte.
      </p>
      <Step n={1} title="Install the elements">
        <InstallTabs commands={installCommands(elements)} />
      </Step>
      <Step n={2} title="Add the JSX types">
        <p>
          Reference the typings once, for example in <Code>retrokit-elements.d.ts</Code> at the project root. They
          cover every <Code>rt-*</Code> and <Code>mac-*</Code> tag for React 19.
        </p>
        <Snippet code={reactTypes} label="retrokit-elements.d.ts" />
      </Step>
      <Step n={3} title="Register on the client">
        <p>
          Importing the package defines the custom elements. Do it in a Client Component and render it once in the
          root layout.
        </p>
        <Snippet code={reactRegister} label="retro-elements.tsx" />
        <Snippet code={reactLayout} label="layout.tsx" />
      </Step>
      <Step n={4} title="Listen to events">
        <p>
          Custom events are not part of React&apos;s synthetic system. A small hook attaches the listener to the element.
        </p>
        <Snippet code={reactHook} label="use-element-event.ts" />
      </Step>
      <Step n={5} title="Build a component">
        <Snippet code={reactExample} label="settings.tsx" />
        <p className="text-[12px] text-rt-ink/80">
          React 19 sets props such as <Code>open</Code> as properties on custom elements. On React 18 every prop
          becomes a string attribute, so toggle booleans with <Code>{"open={open ? '' : undefined}"}</Code>.
        </p>
      </Step>
    </>
  )
}

const svelteTypes = `// src/retrokit.d.ts
/// <reference types="${elements}/svelte" />`

const svelteLayout = `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '${elements}'
  import '${elements}/themes.css' // optional: color + font themes

  let { children } = $props()
</script>

{@render children()}`

const svelteApp = `<script lang="ts">
  let name = $state('')
  let subscribed = $state(true)
  let plan = $state('pro')
  let open = $state(false)
</script>

<rt-window heading="Hello.exe">
  <rt-input
    label="Your name"
    placeholder="Ada Lovelace"
    value={name}
    oninput={(event) => (name = (event.currentTarget as HTMLInputElement).value)}
  ></rt-input>

  <rt-checkbox
    checked={subscribed}
    onchange={(event) => (subscribed = (event.currentTarget as HTMLInputElement).checked)}
  >
    Subscribe to updates
  </rt-checkbox>

  <rt-group legend="Plan">
    {#each ['free', 'pro'] as option}
      <rt-radio value={option} checked={plan === option} onchange={() => (plan = option)}>
        {option}
      </rt-radio>
    {/each}
  </rt-group>

  <rt-button variant="primary" onclick={() => (open = true)}>Open dialog</rt-button>

  <rt-dialog heading="Confirm" {open} onclose={() => (open = false)}>
    Save changes for {name || 'nobody'}?
    <rt-button slot="actions" variant="primary" onclick={() => (open = false)}>OK</rt-button>
  </rt-dialog>

  <p>${creditHtml}</p>
</rt-window>`

export function SvelteGuide() {
  return (
    <>
      <p>
        Svelte talks to custom elements natively, so <Code>{elements}</Code> works as is. You get typed tags in Svelte
        5 and no wrapper layer.
      </p>
      <Step n={1} title="Install">
        <InstallTabs commands={installCommands(elements)} />
      </Step>
      <Step n={2} title="Add the typings">
        <p>
          Reference the Svelte typings once so <Code>{'<rt-window>'}</Code> and the other tags are known to{' '}
          <Code>svelte-check</Code>.
        </p>
        <Snippet code={svelteTypes} label="retrokit.d.ts" />
      </Step>
      <Step n={3} title="Register in the root layout">
        <p>
          The import is safe during SSR, so SvelteKit needs no <Code>browser</Code> check or dynamic import.
        </p>
        <Snippet code={svelteLayout} label="+layout.svelte" />
      </Step>
      <Step n={4} title="Use the elements">
        <Snippet code={svelteApp} label="+page.svelte" />
        <p className="text-[12px] text-rt-ink/80">
          Pass the value down with a prop and read it back from the native event. <Code>bind:value</Code> is not
          available on custom elements. In Svelte 4 use <Code>on:input</Code> and <Code>on:change</Code> instead of the
          <Code>oninput</Code> and <Code>onchange</Code> attributes.
        </p>
      </Step>
    </>
  )
}
