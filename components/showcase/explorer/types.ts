import type { ReactNode } from 'react'

export type CodeFile = { name: string; code: string; html: string }

export type PropDoc = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export type ExplorerItem = {
  id: string
  name: string
  description: string
  importStatement: string
  preview: ReactNode
  props: PropDoc[]
  usage: CodeFile
  sources: string[]
}

export type ExplorerCategory = {
  id: string
  name: string
  items: ExplorerItem[]
}

export type ExplorerKit = {
  id: string
  name: string
  description: string
  setup: string
  canvas: 'win' | 'mac'
  categories: ExplorerCategory[]
}

export type ExplorerData = {
  kits: ExplorerKit[]
  sources: Record<string, CodeFile>
  defaultItemId: string
}
