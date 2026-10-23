'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RetroBadge, RetroButton, RetroGroup, RetroTabs, RetroWindow } from '@/components/retro-ui'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'
import { ComponentTree } from './component-tree'
import { ThemePicker } from './theme-picker'
import type { CodeFile, ExplorerData } from './types'

const initialExpanded = (data: ExplorerData) => {
  const open = new Set<string>(['win31'])
  const win = data.kits[0]
  win.categories.forEach((category) => open.add(category.id))
  return open
}

function CodePanel({ usage, sources }: { usage: CodeFile; sources: CodeFile[] }) {
  const files = [usage, ...sources]
  const [active, setActive] = useState(0)
  const file = files[active] ?? usage

  return (
    <div className="rt-sunken flex min-h-0 flex-col bg-rt-paper">
      <div role="group" aria-label="Files" className="flex flex-wrap gap-1 border-b border-rt-shadow bg-rt-face p-1.5">
        {files.map((entry, index) => (
          <RetroButton
            key={entry.name}
            size="sm"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={cn(index === active && 'font-semibold underline underline-offset-2')}
          >
            {index === 0 ? 'Usage' : (entry.name.split('/').pop() ?? entry.name)}
          </RetroButton>
        ))}
      </div>
      <div className="max-h-[32rem] overflow-auto">
        <CodeBlock key={file.name} file={file} />
      </div>
    </div>
  )
}

export function ComponentExplorer({ data, initialSelectedId }: { data: ExplorerData; initialSelectedId?: string }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(() => initialExpanded(data))
  const [selectedId, setSelectedId] = useState(initialSelectedId ?? data.defaultItemId)
  const [tab, setTab] = useState('preview')

  const index = useMemo(() => {
    const map = new Map<string, { kitId: string; categoryId: string; kitName: string; categoryName: string }>()
    const items = new Map<string, (typeof data.kits)[number]['categories'][number]['items'][number]>()
    for (const kit of data.kits) {
      for (const category of kit.categories) {
        for (const item of category.items) {
          items.set(item.id, item)
          map.set(item.id, {
            kitId: kit.id,
            categoryId: category.id,
            kitName: kit.name,
            categoryName: category.name,
          })
        }
      }
    }
    return { map, items }
  }, [data])

  const item = index.items.get(selectedId) ?? index.items.values().next().value!
  const location = index.map.get(item.id)!
  const kit = data.kits.find((entry) => entry.id === location.kitId)!
  const isMac = kit.canvas === 'mac'
  const sourceFiles = item.sources.map((path) => data.sources[path]).filter(Boolean)

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function select(id: string) {
    const place = index.map.get(id)
    if (place) {
      setExpanded((current) => new Set(current).add(place.kitId).add(place.categoryId))
      setSelectedId(id)
      router.replace(`/showcase?component=${place.kitId}/${id.replace(/^(win|mac)-/, '')}`, { scroll: false })
    }
  }


  return (
    <RetroWindow
      title="Component Explorer"
      className="w-full"
      menu={<ThemePicker />}
      bodyClassName="flex flex-col"
      status={
        <>
          <span className="flex-1 truncate">
            {location.kitName} \ {location.categoryName} \ {item.name}
          </span>
          <RetroBadge tone="info">{index.items.size} components</RetroBadge>
        </>
      }
    >
      <div className="grid gap-px bg-rt-shadow lg:h-[44rem] lg:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <section aria-label="Component tree" className="flex min-h-0 flex-col bg-rt-face p-1.5 lg:overflow-hidden">
          <div className="rt-sunken min-h-0 flex-1 overflow-auto bg-rt-paper p-1 max-lg:max-h-72">
            <ComponentTree
              kits={data.kits}
              expanded={expanded}
              selectedId={item.id}
              onToggle={toggle}
              onSelect={select}
            />
          </div>
        </section>

        <section aria-labelledby="item-title" className="flex min-h-0 flex-col gap-3 bg-rt-face p-3 lg:overflow-auto">
          <header>
            <h2 id="item-title" className="font-rt-mono text-[18px] font-semibold">
              {item.name}
            </h2>
            <p className="mt-0.5 leading-snug text-rt-ink/80">{item.description}</p>
          </header>
          <RetroTabs
            value={tab}
            onValueChange={setTab}
            panelClassName="p-0"
            tabs={[
              {
                id: 'preview',
                label: 'Preview',
                content: (
                  <div
                    className={cn(
                      'rt-sunken flex min-h-80 items-center justify-center overflow-auto p-6',
                      isMac ? 'bg-mac-paper bg-[radial-gradient(var(--color-mac-ink)_0.75px,transparent_0.75px)] bg-[length:4px_4px]' : 'rt-desktop',
                    )}
                  >
                    <div key={item.id} className="flex w-full justify-center">
                      {item.preview}
                    </div>
                  </div>
                ),
              },
              {
                id: 'code',
                label: 'Code',
                content: <CodePanel key={item.id} usage={item.usage} sources={sourceFiles} />,
              },
            ]}
          />
        </section>

        <aside aria-label="Properties" className="flex min-h-0 flex-col gap-3 bg-rt-face p-3 lg:overflow-auto">
          <RetroGroup legend="Import">
            <pre className="rt-sunken overflow-x-auto bg-rt-paper p-2 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
              {item.importStatement || kit.setup || 'No import needed'}
            </pre>
          </RetroGroup>
          <RetroGroup legend="Props">
            <dl className="flex flex-col gap-2.5">
              {item.props.map((prop) => (
                <div key={prop.name}>
                  <dt className="font-mono text-[12px] font-semibold">{prop.name}</dt>
                  <dd className="text-[12px] leading-snug">
                    <span className="font-mono text-rt-accent-deep">{prop.type}</span>
                    {prop.defaultValue ? <span className="text-rt-shadow"> = {prop.defaultValue}</span> : null}
                    <span className="block text-rt-ink/80">{prop.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </RetroGroup>
        </aside>
      </div>
    </RetroWindow>
  )
}
