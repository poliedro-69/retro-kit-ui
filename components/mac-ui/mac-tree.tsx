'use client'

import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type MacTreeNode = {
  id: string
  label: string
  icon?: 'drive' | 'folder' | 'file'
  children?: MacTreeNode[]
}

type FlatItem = {
  node: MacTreeNode
  level: number
  parentId: string | null
  setSize: number
  position: number
}

function flatten(nodes: MacTreeNode[], expanded: Set<string>, level = 1, parentId: string | null = null): FlatItem[] {
  return nodes.flatMap((node, index) => {
    const item: FlatItem = { node, level, parentId, setSize: nodes.length, position: index + 1 }
    const showChildren = Boolean(node.children?.length) && expanded.has(node.id)
    return showChildren ? [item, ...flatten(node.children ?? [], expanded, level + 1, node.id)] : [item]
  })
}

function NodeIcon({ icon }: { icon: 'drive' | 'folder' | 'file' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3">
      {icon === 'file' ? (
        <>
          <path d="M3.5 1.5h6l3 3v10h-9z" />
          <path d="M9.5 1.5v3h3" />
        </>
      ) : icon === 'drive' ? (
        <>
          <rect x="1.5" y="4.5" width="13" height="7" />
          <path d="M3.5 9h5" />
        </>
      ) : (
        <path d="M1.5 3.5h5l1.5 1.5h6.5v8.5h-13z" strokeLinejoin="round" />
      )}
    </svg>
  )
}

type MacTreeViewProps = {
  label: string
  nodes: MacTreeNode[]
  defaultExpanded?: string[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  className?: string
}

export function MacTreeView({
  label,
  nodes,
  defaultExpanded = [],
  value,
  defaultValue,
  onValueChange,
  className,
}: MacTreeViewProps) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded))
  const [innerSelected, setInnerSelected] = useState<string | undefined>(defaultValue)
  const [focusId, setFocusId] = useState<string | undefined>(defaultValue)
  const itemRefs = useRef(new Map<string, HTMLLIElement>())

  const selected = value ?? innerSelected
  const items = flatten(nodes, expanded)
  const tabbableId = items.some((item) => item.node.id === focusId) ? focusId : items[0]?.node.id

  function setOpen(id: string, open: boolean) {
    setExpanded((current) => {
      const next = new Set(current)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function focusItem(id: string | undefined) {
    if (!id) return
    setFocusId(id)
    itemRefs.current.get(id)?.focus()
  }

  function activate(item: FlatItem) {
    setInnerSelected(item.node.id)
    onValueChange?.(item.node.id)
    if (item.node.children?.length) setOpen(item.node.id, !expanded.has(item.node.id))
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const index = items.findIndex((item) => item.node.id === tabbableId)
    const current = items[index]
    if (!current) return
    const hasChildren = Boolean(current.node.children?.length)
    const isOpen = expanded.has(current.node.id)

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusItem(items[index + 1]?.node.id)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusItem(items[index - 1]?.node.id)
        break
      case 'ArrowRight':
        event.preventDefault()
        if (hasChildren && !isOpen) setOpen(current.node.id, true)
        else if (hasChildren) focusItem(items[index + 1]?.node.id)
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (hasChildren && isOpen) setOpen(current.node.id, false)
        else focusItem(current.parentId ?? undefined)
        break
      case 'Home':
        event.preventDefault()
        focusItem(items[0]?.node.id)
        break
      case 'End':
        event.preventDefault()
        focusItem(items[items.length - 1]?.node.id)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        activate(current)
        break
    }
  }

  return (
    <ul
      role="tree"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('overflow-auto border-2 border-mac-ink bg-mac-paper py-1 font-rt-mono text-[12px] text-mac-ink', className)}
    >
      {items.map((item) => {
        const { node } = item
        const hasChildren = Boolean(node.children?.length)
        const isOpen = expanded.has(node.id)
        const isSelected = selected === node.id
        return (
          <li
            key={node.id}
            ref={(element) => {
              if (element) itemRefs.current.set(node.id, element)
              else itemRefs.current.delete(node.id)
            }}
            role="treeitem"
            aria-level={item.level}
            aria-setsize={item.setSize}
            aria-posinset={item.position}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-selected={isSelected}
            tabIndex={tabbableId === node.id ? 0 : -1}
            onClick={() => {
              focusItem(node.id)
              activate(item)
            }}
            style={{ paddingLeft: (item.level - 1) * 16 + 6 }}
            className={cn(
              'flex cursor-default items-center gap-1.5 py-0.5 pr-2 select-none outline-none',
              'focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-dotted focus-visible:outline-current',
              isSelected ? 'bg-mac-ink text-mac-paper' : 'hover:bg-mac-hover',
            )}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 8 8"
              className={cn('size-2 shrink-0 fill-current', !hasChildren && 'invisible', isOpen && 'rotate-90')}
            >
              <path d="M1.5 0.5v7L7 4z" />
            </svg>
            <NodeIcon icon={node.icon ?? (hasChildren ? 'folder' : 'file')} />
            <span className="truncate">{node.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
