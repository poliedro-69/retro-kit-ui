import { RetroElement, defineElement } from './base'
import { rtBase } from './css'

const focusRing = 'outline:2px solid var(--_accent);outline-offset:2px'
const glyphDown = '<svg viewBox="0 0 8 8" width="8" height="8" fill="currentColor" aria-hidden="true"><path d="M0 2h8L4 7z"/></svg>'
const glyphUp = '<svg viewBox="0 0 8 8" width="8" height="8" fill="currentColor" aria-hidden="true"><path d="M0 6h8L4 1z"/></svg>'

/* ---------------------------------- window --------------------------------- */

export class RtWindow extends RetroElement {
  static css = `${rtBase}
:host{display:block}
.win{display:flex;flex-direction:column;height:100%;padding:3px;border:1px solid var(--_line);border-radius:5px;background:var(--_face);font:13px/1.4 var(--_font);color:var(--_ink);box-shadow:inset 1px 1px 0 var(--_light),0 2px 0 rgb(0 0 0/.25),0 16px 32px -12px rgb(0 0 0/.55)}
header{display:flex;align-items:stretch;gap:3px}
.box{width:22px;height:22px;flex:none;display:flex;align-items:center;justify-content:center;padding:0;color:var(--_ink);font:inherit}
button.box{cursor:pointer;transition:background-color .1s}
button.box:hover{background-color:var(--_light)}
button.box:active{background-color:var(--_pressed);background-image:none;box-shadow:inset 1px 1px 3px rgb(0 0 0/.35)}
button.box:focus-visible{${focusRing}}
.bar{display:block;width:12px;height:3px;border:1px solid var(--_line);border-radius:1px;background:var(--_paper)}
.title{flex:1;min-width:0;height:22px;display:flex;align-items:center;padding:0 10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;border-radius:2px;color:var(--_on-accent);background-image:linear-gradient(90deg,var(--_accent-deep),var(--_accent));font:600 11px/1 var(--_mono);letter-spacing:.1em;text-transform:uppercase}
.menu{margin-top:3px}
.body{flex:1;margin-top:3px;border-top:1px solid color-mix(in srgb,var(--_shadow) 60%,transparent)}
.status{display:flex;align-items:center;gap:8px;margin-top:3px;padding:2px 8px;font-size:12px}
`
  static props = { heading: 'string' as const, closable: 'boolean' as const }
  declare heading: string
  declare closable: boolean

  protected template() {
    return `<section class="win" part="window" role="group">
<header>
<button type="button" class="box raised" part="close" aria-label="Close window"><i class="bar"></i></button>
<span class="box raised" data-static aria-hidden="true"><i class="bar"></i></span>
<div class="title" part="title" role="heading" aria-level="2"></div>
<span class="box raised" aria-hidden="true">${glyphDown}</span>
<span class="box raised" aria-hidden="true">${glyphUp}</span>
</header>
<div class="menu" hidden><slot name="menu"></slot></div>
<div class="body" part="body"><slot></slot></div>
<footer class="status sunken" part="status" hidden><slot name="status"></slot></footer>
</section>`
  }

  protected setup() {
    this.$('button.box').addEventListener('click', () => this.dispatchEvent(new Event('close')))
    this.watchSlot(this.$<HTMLSlotElement>('slot[name="menu"]'), this.$('.menu'))
    this.watchSlot(this.$<HTMLSlotElement>('slot[name="status"]'), this.$('.status'))
  }

  protected update() {
    this.$('.title').textContent = this.heading
    this.$('section').setAttribute('aria-label', this.heading)
    this.$('button.box').hidden = !this.closable
    this.$('[data-static]').hidden = this.closable
  }
}

/* ---------------------------------- button --------------------------------- */

export class RtButton extends RetroElement {
  static css = `${rtBase}
:host{display:inline-block}
:host([disabled]){pointer-events:none}
button{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:28px;padding:0 16px;color:var(--_ink);font:500 13px/1 var(--_font);cursor:pointer;user-select:none;transition:filter .1s}
button:hover:not(:disabled){filter:brightness(1.05)}
button span{display:inline-flex;align-items:center;gap:6px}
button:active:not(:disabled){background-color:var(--_pressed);background-image:none;box-shadow:inset 1px 1px 3px rgb(0 0 0/.35)}
button:active:not(:disabled) span{transform:translateY(1px)}
button:focus-visible{${focusRing}}
:host([size='sm']) button{min-height:22px;padding:0 8px;font-size:12px}
:host([variant='primary']) button:not(:disabled){color:var(--_on-accent);border-color:var(--_accent-deep);background-color:var(--_accent);background-image:linear-gradient(180deg,var(--_accent-hi),var(--_accent));box-shadow:inset 1px 1px 0 rgb(255 255 255/.35),inset -1px -1px 0 var(--_accent-deep),0 1px 2px rgb(0 0 0/.25)}
:host([variant='primary']) button:active:not(:disabled){background-color:var(--_accent-press);background-image:none;box-shadow:inset 1px 1px 3px rgb(0 0 0/.5)}
button:disabled{cursor:not-allowed;color:var(--_shadow);text-shadow:1px 1px 0 var(--_light)}
`
  static formAssociated = true
  static props = {
    variant: 'string' as const,
    size: 'string' as const,
    type: 'string' as const,
    disabled: 'boolean' as const,
  }
  declare variant: 'default' | 'primary'
  declare size: 'md' | 'sm'
  declare type: 'button' | 'submit' | 'reset'
  declare disabled: boolean

  protected template() {
    return '<button type="button" class="raised" part="button"><span><slot></slot></span></button>'
  }

  protected setup() {
    this.$('button').addEventListener('click', () => {
      if (this.disabled) return
      if (this.type === 'submit') this.internals?.form?.requestSubmit()
      else if (this.type === 'reset') this.internals?.form?.reset()
    })
  }

  protected update() {
    this.$<HTMLButtonElement>('button').disabled = this.disabled
  }
}

/* ----------------------------------- input --------------------------------- */

export class RtInput extends RetroElement {
  static css = `${rtBase}
:host{display:block}
.field{display:flex;flex-direction:column;gap:4px;font:13px/1.4 var(--_font);color:var(--_ink)}
label{font-weight:500}
input{height:28px;width:100%;padding:0 8px;color:var(--_ink);font:13px var(--_font)}
input::placeholder{color:var(--_shadow)}
input:focus-visible{outline:2px solid var(--_accent);outline-offset:1px}
input:disabled{cursor:not-allowed;color:var(--_shadow);background:var(--_face)}
.hint{margin:0;font-size:12px;color:var(--_shadow)}
`
  static formAssociated = true
  static props = {
    label: 'string' as const,
    hint: 'string' as const,
    value: 'string' as const,
    type: 'string' as const,
    name: 'string' as const,
    placeholder: 'string' as const,
    disabled: 'boolean' as const,
    required: 'boolean' as const,
    readonly: 'boolean' as const,
  }
  declare label: string
  declare hint: string
  declare value: string
  declare type: string
  declare name: string
  declare placeholder: string
  declare disabled: boolean
  declare required: boolean
  declare readonly: boolean

  protected template() {
    return `<div class="field">
<label for="control" hidden></label>
<input id="control" class="sunken" part="input" aria-describedby="hint">
<p id="hint" class="hint" hidden></p>
</div>`
  }

  protected setup() {
    const input = this.$<HTMLInputElement>('input')
    input.addEventListener('input', (event) => {
      event.stopPropagation()
      this.value = input.value
      this.fire('input')
    })
    input.addEventListener('change', () => this.fire('change', { bubbles: true }))
  }

  protected update() {
    const input = this.$<HTMLInputElement>('input')
    const label = this.$('label')
    const hint = this.$('.hint')
    label.textContent = this.label
    label.hidden = !this.label
    hint.textContent = this.hint
    hint.hidden = !this.hint
    if (input.value !== this.value) input.value = this.value
    input.type = this.type || 'text'
    input.placeholder = this.placeholder
    input.disabled = this.disabled
    input.required = this.required
    input.readOnly = this.readonly
    this.internals?.setFormValue(this.value)
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? ''
  }
}

/* ------------------------------ checkbox & radio --------------------------- */

const toggleCss = `${rtBase}
:host{display:block}
:host([disabled]) label{cursor:not-allowed;color:var(--_shadow)}
label{display:flex;align-items:center;gap:8px;padding:2px 0;cursor:pointer;font:13px/1.4 var(--_font);color:var(--_ink)}
input:focus-visible + .box{outline:2px solid var(--_accent);outline-offset:2px}
.box{display:flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px}
.mark{transform:scale(0);transition:transform .1s}
input:checked + .box .mark{transform:scale(1)}
`

export class RtCheckbox extends RetroElement {
  static css = `${toggleCss}
svg{width:10px;height:10px;fill:none;stroke:var(--_ink);stroke-width:1.8}
`
  static formAssociated = true
  static props = {
    checked: 'boolean' as const,
    disabled: 'boolean' as const,
    name: 'string' as const,
    value: 'string' as const,
  }
  declare checked: boolean
  declare disabled: boolean
  declare name: string
  declare value: string

  protected template() {
    return `<label><input type="checkbox" class="sr-only"><span class="box sunken" aria-hidden="true"><svg class="mark" viewBox="0 0 10 10"><path d="M1.5 5.2 4 7.7 8.5 2.5" stroke-linecap="square"/></svg></span><span><slot></slot></span></label>`
  }

  protected setup() {
    const input = this.$<HTMLInputElement>('input')
    input.addEventListener('input', (event) => event.stopPropagation())
    input.addEventListener('change', () => {
      this.checked = input.checked
      this.fire('change')
    })
  }

  protected update() {
    const input = this.$<HTMLInputElement>('input')
    input.checked = this.checked
    input.disabled = this.disabled
    this.internals?.setFormValue(this.checked ? this.value || 'on' : null)
  }

  formResetCallback() {
    this.checked = false
  }
}

export class RtRadio extends RetroElement {
  static css = `${toggleCss}
.box{border-radius:50%}
i{display:block;width:7px;height:7px;border-radius:50%;background:var(--_ink)}
`
  static formAssociated = true
  static props = {
    checked: 'boolean' as const,
    disabled: 'boolean' as const,
    name: 'string' as const,
    value: 'string' as const,
  }
  declare checked: boolean
  declare disabled: boolean
  declare name: string
  declare value: string

  protected template() {
    return `<label><input type="radio" class="sr-only"><span class="box sunken" aria-hidden="true"><i class="mark"></i></span><span><slot></slot></span></label>`
  }

  protected setup() {
    const input = this.$<HTMLInputElement>('input')
    input.addEventListener('input', (event) => event.stopPropagation())
    input.addEventListener('change', () => {
      if (!input.checked) return
      this.checked = true
      this.uncheckSiblings()
      this.fire('change')
    })
  }

  private uncheckSiblings() {
    if (!this.name) return
    const scope = (this.getRootNode() as Document | ShadowRoot).querySelectorAll<RtRadio>('rt-radio')
    scope.forEach((radio) => {
      if (radio !== this && radio.name === this.name && radio.closest('form') === this.closest('form')) {
        radio.checked = false
      }
    })
  }

  protected update() {
    const input = this.$<HTMLInputElement>('input')
    input.checked = this.checked
    input.disabled = this.disabled
    this.internals?.setFormValue(this.checked ? this.value || 'on' : null)
  }

  formResetCallback() {
    this.checked = false
  }
}

/* ----------------------------------- group --------------------------------- */

export class RtGroup extends RetroElement {
  static css = `${rtBase}
:host{display:block}
fieldset{margin:0;min-width:0;padding:4px 12px 10px;border:1px solid var(--_shadow);border-radius:3px;color:var(--_ink);font:13px/1.4 var(--_font);box-shadow:1px 1px 0 var(--_light),inset 1px 1px 0 var(--_light)}
legend{padding:0 6px;font-size:12px;font-weight:600;letter-spacing:.025em}
`
  static props = { legend: 'string' as const }
  declare legend: string

  protected template() {
    return '<fieldset part="group"><legend></legend><slot></slot></fieldset>'
  }
  protected update() {
    this.$('legend').textContent = this.legend
  }
}

/* ------------------------------ progress & badge --------------------------- */

export class RtProgress extends RetroElement {
  static css = `${rtBase}
:host{display:block}
.track{height:22px;padding:2px}
.fill{height:100%;transition:width .2s;background:repeating-linear-gradient(90deg,var(--_accent) 0 9px,transparent 9px 12px)}
`
  static props = { value: 'number' as const, label: 'string' as const }
  declare value: number
  declare label: string

  protected template() {
    return '<div class="track sunken" part="track" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="fill" part="fill"></div></div>'
  }
  protected update() {
    const clamped = Math.min(100, Math.max(0, this.value))
    const track = this.$('.track')
    track.setAttribute('aria-valuenow', String(Math.round(clamped)))
    track.setAttribute('aria-label', this.label)
    this.$('.fill').style.width = `${clamped}%`
  }
}

export class RtBadge extends RetroElement {
  static css = `${rtBase}
:host{display:inline-flex}
.badge{display:inline-flex;align-items:center;padding:1px 6px;border:1px solid var(--_line);border-radius:2px;background:var(--_face);color:var(--_ink);font:600 11px/1.4 var(--_mono);letter-spacing:.025em;text-transform:uppercase;box-shadow:1px 1px 0 rgb(0 0 0/.35)}
:host([tone='info']) .badge{background:var(--_accent);color:var(--_on-accent)}
:host([tone='warn']) .badge{background:var(--_warn);color:var(--_ink)}
:host([tone='ok']) .badge{background:var(--_ok);color:var(--_on-accent)}
:host([tone='danger']) .badge{background:var(--_danger);color:var(--_on-accent)}
`
  static props = { tone: 'string' as const }
  declare tone: 'neutral' | 'info' | 'warn' | 'ok' | 'danger'

  protected template() {
    return '<span class="badge" part="badge"><slot></slot></span>'
  }
}

/* ------------------------------------ tabs --------------------------------- */

export class RtTab extends RetroElement {
  static shadow = false
  static props = { name: 'string' as const, label: 'string' as const, selected: 'boolean' as const }
  declare name: string
  declare label: string
  declare selected: boolean

  protected update() {
    // ElementInternals keeps the role out of the DOM so SSR-hydrated frameworks see no mismatch.
    if (this.internals) this.internals.role = 'tabpanel'
    ;(this.parentElement as RtTabs | null)?.refresh?.()
  }
}

export class RtTabs extends RetroElement {
  static css = `${rtBase}
:host{display:block}
.tabs{display:flex;flex-direction:column;font:13px/1.4 var(--_font);color:var(--_ink)}
.list{display:flex;align-items:flex-end;gap:2px;padding:0 4px}
.tab{position:relative;height:26px;padding:0 14px;border-bottom-left-radius:0;border-bottom-right-radius:0;color:color-mix(in srgb,var(--_ink) 75%,transparent);font:500 13px var(--_font);cursor:pointer;transition:filter .1s}
.tab:hover{filter:brightness(1.05)}
.tab:focus-visible{outline:2px solid var(--_accent);outline-offset:-4px}
.tab[aria-selected='true']{z-index:1;height:30px;margin-bottom:-1px;border-bottom-color:var(--_face);background:var(--_face);color:var(--_ink)}
::slotted(rt-tab){display:none;padding:12px;border:1px solid var(--_line);border-radius:3px;background-color:var(--_face);background-image:linear-gradient(180deg,var(--_face-hi),var(--_face));box-shadow:inset 1px 1px 0 var(--_light),inset -1px -1px 0 var(--_shadow),0 1px 2px rgb(0 0 0/.18)}
::slotted(rt-tab[selected]){display:block}
`
  static props = { value: 'string' as const }
  declare value: string

  protected template() {
    return '<div class="tabs"><div class="list" role="tablist" part="tablist"></div><slot></slot></div>'
  }

  protected setup() {
    this.$('slot').addEventListener('slotchange', () => this.refresh())
    const list = this.$('.list')
    list.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-name]')
      if (button) this.select(button.dataset.name!)
    })
    list.addEventListener('keydown', (event) => {
      const key = (event as KeyboardEvent).key
      const step = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0
      if (!step) return
      event.preventDefault()
      const panels = this.panels()
      const index = panels.findIndex((panel) => panel.selected)
      const next = panels[(index + step + panels.length) % panels.length]
      this.select(next.name)
      this.$<HTMLButtonElement>(`button[data-name="${CSS.escape(next.name)}"]`)?.focus()
    })
  }

  private panels() {
    return Array.from(this.children).filter((el): el is RtTab => el.localName === 'rt-tab')
  }

  private select(name: string) {
    if (name === this.value) return
    this.value = name
    this.fire('change')
  }

  refresh() {
    if (!this.ready) return
    const panels = this.panels()
    if (!panels.length) return
    const active = panels.some((panel) => panel.name === this.value) ? this.value : panels[0].name
    const list = this.$('.list')
    list.replaceChildren(
      ...panels.map((panel) => {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'tab raised'
        button.setAttribute('role', 'tab')
        button.dataset.name = panel.name
        button.textContent = panel.label
        const selected = panel.name === active
        button.setAttribute('aria-selected', String(selected))
        button.tabIndex = selected ? 0 : -1
        return button
      }),
    )
    panels.forEach((panel) => panel.toggleAttribute('selected', panel.name === active))
  }

  protected update() {
    this.refresh()
  }
}

/* ----------------------------------- dialog -------------------------------- */

export class RtDialog extends RetroElement {
  static css = `${rtBase}
:host{display:contents}
dialog{width:min(92vw,26rem);margin:auto;padding:0;border:0;overflow:visible;background:transparent;color:var(--_ink)}
dialog::backdrop{background:rgb(0 0 0/.45);backdrop-filter:blur(2px)}
.content{display:flex;gap:12px;padding:16px}
.actions{display:flex;justify-content:center;gap:8px;padding:0 16px 16px}
`
  static props = { heading: 'string' as const, open: 'boolean' as const }
  declare heading: string
  declare open: boolean

  protected template() {
    return `<dialog part="dialog"><rt-window closable><div class="content"><slot></slot></div><div class="actions" hidden><slot name="actions"></slot></div></rt-window></dialog>`
  }

  protected setup() {
    const dialog = this.$<HTMLDialogElement>('dialog')
    this.$('rt-window').addEventListener('close', () => {
      this.open = false
    })
    dialog.addEventListener('close', () => {
      if (this.open) this.open = false
      this.dispatchEvent(new Event('close'))
    })
    this.watchSlot(this.$<HTMLSlotElement>('slot[name="actions"]'), this.$('.actions'))
  }

  protected update() {
    const dialog = this.$<HTMLDialogElement>('dialog')
    ;(this.$('rt-window') as RtWindow).heading = this.heading
    if (this.open && !dialog.open) dialog.showModal()
    if (!this.open && dialog.open) dialog.close()
  }
}

export const windowsElements = {
  'rt-window': RtWindow,
  'rt-button': RtButton,
  'rt-input': RtInput,
  'rt-checkbox': RtCheckbox,
  'rt-radio': RtRadio,
  'rt-group': RtGroup,
  'rt-progress': RtProgress,
  'rt-badge': RtBadge,
  'rt-tab': RtTab,
  'rt-tabs': RtTabs,
  'rt-dialog': RtDialog,
} as const

for (const [tag, ctor] of Object.entries(windowsElements)) defineElement(tag, ctor)
