import { RetroElement, defineElement } from './base'
import { macBase } from './css'

const ring = 'outline:2px solid var(--_ink);outline-offset:2px'

export class MacWindow extends RetroElement {
  static css = `${macBase}
:host{display:block}
.win{height:100%;border:2px solid var(--_ink);background:var(--_paper);color:var(--_ink);font:12px/1.4 var(--_mono);box-shadow:3px 3px 0 var(--_ink)}
header{display:flex;align-items:center;gap:8px;padding:4px 6px;border-bottom:2px solid var(--_ink)}
.box{flex:none;width:14px;height:14px;border:2px solid var(--_ink);background:var(--_paper)}
.stripes{flex:1;height:14px;background:repeating-linear-gradient(0deg,var(--_ink) 0 1px,transparent 1px 3px)}
.title{flex:none;padding:0 4px;background:var(--_paper);font-size:12px;font-weight:600;margin:0}
`
  static props = { heading: 'string' as const }
  declare heading: string

  protected template() {
    return `<section class="win" part="window" role="group">
<header><span class="box" aria-hidden="true"></span><span class="stripes" aria-hidden="true"></span><p class="title" part="title"></p><span class="stripes" aria-hidden="true"></span><span class="box" aria-hidden="true"></span></header>
<div part="body"><slot></slot></div>
</section>`
  }

  protected update() {
    this.$('.title').textContent = this.heading
    this.$('section').setAttribute('aria-label', this.heading)
  }
}

export class MacButton extends RetroElement {
  static css = `${macBase}
:host{display:inline-block}
:host([disabled]){pointer-events:none}
button{padding:2px 16px;border:2px solid var(--_ink);border-radius:10px;background:var(--_paper);color:var(--_ink);font:600 12px/1.4 var(--_mono);cursor:pointer;transition:background-color .1s,color .1s}
button:hover:not(:disabled){background:var(--_hover)}
button:active:not(:disabled){background:var(--_ink);color:var(--_paper)}
button:focus-visible{outline:2px solid var(--_ink);outline-offset:4px}
button:disabled{cursor:not-allowed;border-style:dashed;color:var(--_dim)}
:host([is-default]) button{box-shadow:0 0 0 2px var(--_paper),0 0 0 4px var(--_ink)}
`
  static formAssociated = true
  static props = {
    isDefault: 'boolean' as const,
    type: 'string' as const,
    disabled: 'boolean' as const,
  }
  declare isDefault: boolean
  declare type: 'button' | 'submit' | 'reset'
  declare disabled: boolean

  protected template() {
    return '<button type="button" part="button"><slot></slot></button>'
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

export class MacInput extends RetroElement {
  static css = `${macBase}
:host{display:block}
.field{display:flex;flex-direction:column;gap:4px;font:12px/1.4 var(--_mono);color:var(--_ink)}
label{font-weight:600}
input{height:24px;width:100%;padding:0 6px;border:2px solid var(--_ink);border-radius:0;background:var(--_paper);color:var(--_ink);font:12px var(--_mono)}
input::placeholder{color:var(--_dim)}
input:focus-visible{${ring}}
input:disabled{border-style:dashed;color:var(--_dim)}
`
  static formAssociated = true
  static props = {
    label: 'string' as const,
    value: 'string' as const,
    type: 'string' as const,
    name: 'string' as const,
    placeholder: 'string' as const,
    disabled: 'boolean' as const,
    required: 'boolean' as const,
    readonly: 'boolean' as const,
  }
  declare label: string
  declare value: string
  declare type: string
  declare name: string
  declare placeholder: string
  declare disabled: boolean
  declare required: boolean
  declare readonly: boolean

  protected template() {
    return `<div class="field"><label for="control" hidden></label><input id="control" part="input"></div>`
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
    label.textContent = this.label
    label.hidden = !this.label
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

const toggleCss = `${macBase}
:host{display:block}
:host([disabled]) label{cursor:not-allowed;color:var(--_dim)}
label{display:flex;align-items:center;gap:8px;padding:2px 0;cursor:pointer;font:12px/1.4 var(--_mono);color:var(--_ink)}
input:focus-visible + .box{${ring}}
input:disabled + .box{border-style:dashed}
.box{display:flex;align-items:center;justify-content:center;flex:none;width:14px;height:14px;border:2px solid var(--_ink);background:var(--_paper)}
.mark{transform:scale(0)}
input:checked + .box .mark{transform:scale(1)}
`

export class MacCheckbox extends RetroElement {
  static css = `${toggleCss}
svg{width:10px;height:10px;stroke:var(--_ink);stroke-width:1.5}
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
    return `<label><input type="checkbox" class="sr-only"><span class="box" aria-hidden="true"><svg class="mark" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1L1 9"/></svg></span><span><slot></slot></span></label>`
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

export class MacRadio extends RetroElement {
  static css = `${toggleCss}
.box{border-radius:50%}
i{display:block;width:6px;height:6px;border-radius:50%;background:var(--_ink)}
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
    return `<label><input type="radio" class="sr-only"><span class="box" aria-hidden="true"><i class="mark"></i></span><span><slot></slot></span></label>`
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
    const scope = (this.getRootNode() as Document | ShadowRoot).querySelectorAll<MacRadio>('mac-radio')
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

export class MacGroup extends RetroElement {
  static css = `${macBase}
:host{display:block}
fieldset{margin:0;min-width:0;padding:4px 12px 8px;border:2px solid var(--_ink);color:var(--_ink);font:12px/1.4 var(--_mono)}
legend{padding:0 6px;background:var(--_paper);font-weight:600}
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

export class MacProgress extends RetroElement {
  static css = `${macBase}
:host{display:block}
.track{height:16px;padding:1px;border:2px solid var(--_ink);background:var(--_paper)}
.fill{height:100%;background:var(--_ink)}
`
  static props = { value: 'number' as const, label: 'string' as const }
  declare value: number
  declare label: string

  protected template() {
    return '<div class="track" part="track" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="fill" part="fill"></div></div>'
  }
  protected update() {
    const clamped = Math.min(100, Math.max(0, this.value))
    const track = this.$('.track')
    track.setAttribute('aria-valuenow', String(Math.round(clamped)))
    track.setAttribute('aria-label', this.label)
    this.$('.fill').style.width = `${clamped}%`
  }
}

export class MacAlert extends RetroElement {
  static css = `${macBase}
:host{display:block}
.alert{padding:2px;border:2px solid var(--_ink);background:var(--_paper);box-shadow:3px 3px 0 var(--_ink)}
.inner{padding:12px;border:2px solid var(--_ink);color:var(--_ink);font:12px/1.4 var(--_mono)}
.row{display:flex;gap:12px}
svg{flex:none;width:32px;height:32px}
.actions{display:flex;justify-content:flex-end;gap:16px;margin-top:12px;padding-right:4px}
`
  static props = { label: 'string' as const }
  declare label: string

  protected template() {
    return `<div class="alert" part="alert" role="alertdialog"><div class="inner"><div class="row">
<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 30 28H2Z" fill="var(--_paper)" stroke="var(--_ink)" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 12v8M16 23.5v1" stroke="var(--_ink)" stroke-width="3"/></svg>
<div><slot></slot></div></div>
<div class="actions" hidden><slot name="actions"></slot></div></div></div>`
  }

  protected setup() {
    this.watchSlot(this.$<HTMLSlotElement>('slot[name="actions"]'), this.$('.actions'))
  }

  protected update() {
    this.$('.alert').setAttribute('aria-label', this.label)
  }
}

export const macElements = {
  'mac-window': MacWindow,
  'mac-button': MacButton,
  'mac-input': MacInput,
  'mac-checkbox': MacCheckbox,
  'mac-radio': MacRadio,
  'mac-group': MacGroup,
  'mac-progress': MacProgress,
  'mac-alert': MacAlert,
} as const

for (const [tag, ctor] of Object.entries(macElements)) defineElement(tag, ctor)
