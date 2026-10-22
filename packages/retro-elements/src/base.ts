export type PropType = 'string' | 'boolean' | 'number'
export type PropSpec = Record<string, PropType>

const kebab = (name: string) => name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

// Importing this package on the server (Next.js SSR, Nuxt, SvelteKit) must not throw.
const BaseElement: typeof HTMLElement =
  typeof HTMLElement === 'undefined' ? (class {} as unknown as typeof HTMLElement) : HTMLElement

const sheetCache = new Map<string, CSSStyleSheet>()

function adoptStyles(root: ShadowRoot, css: string) {
  const canAdopt =
    typeof CSSStyleSheet !== 'undefined' &&
    'replaceSync' in CSSStyleSheet.prototype &&
    'adoptedStyleSheets' in root
  if (canAdopt) {
    let sheet = sheetCache.get(css)
    if (!sheet) {
      sheet = new CSSStyleSheet()
      sheet.replaceSync(css)
      sheetCache.set(css, sheet)
    }
    root.adoptedStyleSheets = [sheet]
    return
  }
  const style = document.createElement('style')
  style.textContent = css
  root.prepend(style)
}

export function hasContent(nodes: Node[]) {
  return nodes.some((node) => node.nodeType === 1 || Boolean(node.textContent?.trim()))
}

export abstract class RetroElement extends BaseElement {
  static css = ''
  static props: PropSpec = {}
  static shadow = true
  static formAssociated = false

  static get observedAttributes() {
    return Object.keys(this.props).map(kebab)
  }

  protected root!: ShadowRoot | this
  protected ready = false
  protected internals: ElementInternals | null = null

  constructor() {
    super()
    const ctor = this.constructor as typeof RetroElement
    if (ctor.formAssociated && typeof this.attachInternals === 'function') {
      this.internals = this.attachInternals()
    }
  }

  protected template(): string {
    return ''
  }
  protected setup(): void {}
  protected update(): void {}

  connectedCallback() {
    const ctor = this.constructor as typeof RetroElement
    // Frameworks may set properties before the element is upgraded; replay them.
    for (const prop of Object.keys(ctor.props)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        const value = (this as never as Record<string, unknown>)[prop]
        delete (this as never as Record<string, unknown>)[prop]
        ;(this as never as Record<string, unknown>)[prop] = value
      }
    }
    if (!this.ready) {
      if (ctor.shadow) {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open', delegatesFocus: true })
        adoptStyles(root, ctor.css)
        root.innerHTML = this.template()
        this.root = root
      } else {
        this.root = this
      }
      this.ready = true
      this.setup()
    }
    this.update()
  }

  attributeChangedCallback() {
    if (this.ready) this.update()
  }

  protected $<T extends Element = HTMLElement>(selector: string) {
    return (this.root as ParentNode).querySelector(selector) as T
  }

  protected fire(type: string, init: EventInit = { bubbles: true, composed: true }) {
    this.dispatchEvent(new Event(type, init))
  }

  protected watchSlot(slot: HTMLSlotElement, wrapper: HTMLElement) {
    const sync = () => {
      wrapper.hidden = !hasContent(slot.assignedNodes({ flatten: true }))
    }
    slot.addEventListener('slotchange', sync)
    sync()
  }
}

type ElementClass = {
  new (): RetroElement
  props: PropSpec
  prototype: RetroElement
}

export function defineElement(tag: string, ctor: ElementClass) {
  for (const [prop, type] of Object.entries(ctor.props)) {
    const attr = kebab(prop)
    Object.defineProperty(ctor.prototype, prop, {
      configurable: true,
      get(this: HTMLElement) {
        if (type === 'boolean') return this.hasAttribute(attr)
        const raw = this.getAttribute(attr)
        if (type === 'number') return raw === null ? 0 : Number(raw)
        return raw ?? ''
      },
      set(this: HTMLElement, value: unknown) {
        if (type === 'boolean') this.toggleAttribute(attr, Boolean(value))
        else if (value === null || value === undefined) this.removeAttribute(attr)
        else if (this.getAttribute(attr) !== String(value)) this.setAttribute(attr, String(value))
      },
    })
  }
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
    customElements.define(tag, ctor as unknown as CustomElementConstructor)
  }
}
