import { defineComponent, h } from 'vue'
import type { ComponentObjectPropsOptions, PropType, VNodeChild } from 'vue'

export type FieldKind = 'none' | 'text' | 'checked' | 'radio' | 'tabs'

const kebab = (name: string) => name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

type PropKind = 'string' | 'boolean' | 'number'
type PropMap = Record<string, PropKind>

const propType = { string: String, boolean: Boolean, number: Number } as const

export function createWrapper(options: {
  name: string
  tag: string
  props?: PropMap
  slots?: string[]
  model?: FieldKind
}) {
  const { name, tag, props = {}, slots: namedSlots = [], model = 'none' } = options

  const vueProps: Record<string, unknown> = {}
  for (const [key, kind] of Object.entries(props)) {
    vueProps[key] = { type: propType[kind], default: undefined }
  }
  if (model !== 'none') {
    vueProps.modelValue = {
      type: [String, Boolean, Number] as PropType<string | boolean | number>,
      default: undefined,
    }
  }

  return defineComponent({
    name,
    props: vueProps as ComponentObjectPropsOptions,
    emits: model === 'none' ? [] : ['update:modelValue'],
    setup(rawProps, { slots, emit }) {
      return () => {
        const p = rawProps as Record<string, unknown>
        const attrs: Record<string, unknown> = {}
        for (const [key, kind] of Object.entries(props)) {
          const value = p[key]
          if (kind === 'boolean') attrs[kebab(key)] = value ? '' : undefined
          else if (value !== undefined) attrs[kebab(key)] = value
        }

        const events: Record<string, (event: Event) => void> = {}
        const model_ = p.modelValue

        if (model === 'text') {
          if (model_ !== undefined) attrs.value = model_
          events.onInput = (event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
        } else if (model === 'checked') {
          if (model_ !== undefined) attrs.checked = model_ ? '' : undefined
          events.onChange = (event) => emit('update:modelValue', (event.target as HTMLInputElement).checked)
        } else if (model === 'radio') {
          if (model_ !== undefined) attrs.checked = model_ === p.value ? '' : undefined
          events.onChange = (event) => {
            const target = event.target as HTMLInputElement
            if (target.checked) emit('update:modelValue', target.value)
          }
        } else if (model === 'tabs') {
          if (model_ !== undefined) attrs.value = model_
          events.onChange = (event) => emit('update:modelValue', (event.target as HTMLElement & { value: string }).value)
        }

        const children: VNodeChild[] = [...(slots.default?.() ?? [])]
        for (const slotName of namedSlots) {
          const content = slots[slotName]?.()
          if (content) {
            children.push(h('span', { slot: slotName, style: 'display:contents' }, content))
          }
        }
        return h(tag, { ...attrs, ...events }, children)
      }
    },
  })
}
