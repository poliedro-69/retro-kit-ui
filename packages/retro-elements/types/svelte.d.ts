// Svelte 5 typings. Add to your project with:
//   /// <reference types="@your-scope/retrokit-elements/svelte" />
import type { HTMLAttributes } from 'svelte/elements'

type Toggle = { checked?: boolean; disabled?: boolean; name?: string; value?: string }
type Field = {
  label?: string
  value?: string
  type?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
}

declare module 'svelte/elements' {
  interface SvelteHTMLElements {
    'rt-window': HTMLAttributes<HTMLElement> & { heading?: string; closable?: boolean }
    'rt-button': HTMLAttributes<HTMLElement> & {
      variant?: 'default' | 'primary'
      size?: 'md' | 'sm'
      type?: 'button' | 'submit' | 'reset'
      disabled?: boolean
    }
    'rt-input': HTMLAttributes<HTMLElement> & Field & { hint?: string }
    'rt-checkbox': HTMLAttributes<HTMLElement> & Toggle
    'rt-radio': HTMLAttributes<HTMLElement> & Toggle
    'rt-group': HTMLAttributes<HTMLElement> & { legend?: string }
    'rt-progress': HTMLAttributes<HTMLElement> & { value?: number; label?: string }
    'rt-badge': HTMLAttributes<HTMLElement> & { tone?: 'neutral' | 'info' | 'warn' | 'ok' | 'danger' }
    'rt-tabs': HTMLAttributes<HTMLElement> & { value?: string }
    'rt-tab': HTMLAttributes<HTMLElement> & { name?: string; label?: string }
    'rt-dialog': HTMLAttributes<HTMLElement> & { heading?: string; open?: boolean }
    'mac-window': HTMLAttributes<HTMLElement> & { heading?: string }
    'mac-button': HTMLAttributes<HTMLElement> & {
      'is-default'?: boolean
      type?: 'button' | 'submit' | 'reset'
      disabled?: boolean
    }
    'mac-input': HTMLAttributes<HTMLElement> & Field
    'mac-checkbox': HTMLAttributes<HTMLElement> & Toggle
    'mac-radio': HTMLAttributes<HTMLElement> & Toggle
    'mac-group': HTMLAttributes<HTMLElement> & { legend?: string }
    'mac-progress': HTMLAttributes<HTMLElement> & { value?: number; label?: string }
    'mac-alert': HTMLAttributes<HTMLElement> & { label?: string }
  }
}

export {}
