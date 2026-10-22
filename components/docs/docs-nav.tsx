import { RetroWindow } from '@/components/retro-ui'

export const docsSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'npm', label: 'Install with npm' },
  { id: 'shadcn', label: 'Install with shadcn' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'vue', label: 'Vue and Nuxt' },
  { id: 'react', label: 'React and Next.js' },
  { id: 'svelte', label: 'Svelte and SvelteKit' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'themes', label: 'Themes' },
  { id: 'example', label: 'Minimal example' },
  { id: 'attribution', label: 'Attribution' },
]

export function DocsNav() {
  return (
    <aside aria-label="Documentation" className="lg:sticky lg:top-16 lg:self-start">
      <RetroWindow title="Contents.hlp" titleAs="p" status={<span className="flex-1">{docsSections.length} topics</span>}>
        <nav aria-label="On this page" className="rt-sunken m-2 bg-rt-paper p-1">
          <ol className="flex flex-col">
            {docsSections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-2 px-2 py-1 text-[13px] hover:bg-rt-accent hover:text-rt-on-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rt-accent"
                >
                  <span aria-hidden="true" className="w-4 shrink-0 font-mono text-[11px] leading-5 opacity-70">
                    {index + 1}.
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </RetroWindow>
    </aside>
  )
}
