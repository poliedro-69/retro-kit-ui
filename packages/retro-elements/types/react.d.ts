// JSX typings for React 19 / Next.js. Add to your project with:
//   /// <reference types="@your-scope/retrokit-elements/react" />
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type Base = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
type El<P = object> = Base & P
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

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'rt-window': El<{ heading?: string; closable?: boolean }>
      'rt-button': El<{
        variant?: 'default' | 'primary'
        size?: 'md' | 'sm'
        type?: 'button' | 'submit' | 'reset'
        disabled?: boolean
      }>
      'rt-input': El<Field & { hint?: string }>
      'rt-checkbox': El<Toggle>
      'rt-radio': El<Toggle>
      'rt-group': El<{ legend?: string }>
      'rt-progress': El<{ value?: number; label?: string }>
      'rt-badge': El<{ tone?: 'neutral' | 'info' | 'warn' | 'ok' | 'danger' }>
      'rt-tabs': El<{ value?: string }>
      'rt-tab': El<{ name?: string; label?: string }>
      'rt-dialog': El<{ heading?: string; open?: boolean }>
      'mac-window': El<{ heading?: string }>
      'mac-button': El<{ 'is-default'?: boolean; type?: 'button' | 'submit' | 'reset'; disabled?: boolean }>
      'mac-input': El<Field>
      'mac-checkbox': El<Toggle>
      'mac-radio': El<Toggle>
      'mac-group': El<{ legend?: string }>
      'mac-progress': El<{ value?: number; label?: string }>
      'mac-alert': El<{ label?: string }>
    }
  }
}

export {}
