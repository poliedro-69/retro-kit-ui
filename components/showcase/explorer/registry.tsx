import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { codeToHtml } from 'shiki'
import { macPreviews, winPreviews } from './previews'
import type { CodeFile, ExplorerCategory, ExplorerData, ExplorerItem, PropDoc } from './types'

const root = process.cwd()

async function highlight(name: string, code: string, lang: 'tsx' | 'css' = 'tsx'): Promise<CodeFile> {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
  return { name, code, html }
}

type ItemDef = {
  id: string
  name: string
  description: string
  exports: string[]
  from: string
  preview: ExplorerItem['preview']
  props: PropDoc[]
  usage: string
  sources: string[]
}

const WIN_SOURCES = {
  tokens: 'app/globals.css',
  window: 'components/retro-ui/retro-window.tsx',
  dialog: 'components/retro-ui/retro-dialog.tsx',
  button: 'components/retro-ui/retro-button.tsx',
  fields: 'components/retro-ui/retro-fields.tsx',
  menubar: 'components/retro-ui/retro-menubar.tsx',
  tabs: 'components/retro-ui/retro-tabs.tsx',
  feedback: 'components/retro-ui/retro-feedback.tsx',
  card: 'components/retro-ui/blocks/retro-product-card.tsx',
}

const MAC_SOURCES = {
  window: 'components/mac-ui/mac-window.tsx',
  button: 'components/mac-ui/mac-button.tsx',
  fields: 'components/mac-ui/mac-fields.tsx',
  menubar: 'components/mac-ui/mac-menubar.tsx',
  feedback: 'components/mac-ui/mac-feedback.tsx',
}

const toggleProps: PropDoc[] = [
  { name: 'label', type: 'ReactNode', description: 'Text shown next to the control.' },
  { name: '...input', type: 'InputHTMLAttributes', description: 'Any native input attribute: checked, name, disabled...' },
]

function winDefs(): ItemDef[] {
  const from = '@/components/retro-ui'
  return [
    {
      id: 'win-tokens',
      name: 'Tokens',
      description: 'Color variables and the three bevel utilities every component is built from.',
      exports: [],
      from,
      preview: winPreviews.tokens,
      props: [
        { name: 'rt-raised', type: 'utility', description: 'Outset bevel for buttons and panels.' },
        { name: 'rt-pressed', type: 'utility', description: 'Inset bevel while a button is pressed.' },
        { name: 'rt-sunken', type: 'utility', description: 'Deep inset for fields and wells.' },
        { name: 'rt-desktop', type: 'utility', description: 'Teal desktop background.' },
      ],
      usage: `<div className="rt-desktop p-6">
  <div className="rt-raised p-3 text-rt-ink">
    <div className="rt-sunken bg-rt-paper p-2">Hello, 3.1</div>
  </div>
</div>`,
      sources: [WIN_SOURCES.tokens],
    },
    {
      id: 'win-window',
      name: 'Window',
      description: 'Title bar, optional menu bar and status bar around any content.',
      exports: ['RetroWindow'],
      from,
      preview: winPreviews.window,
      props: [
        { name: 'title', type: 'string', description: 'Text in the title bar.' },
        { name: 'menu', type: 'ReactNode', description: 'Rendered below the title bar, usually a RetroMenubar.' },
        { name: 'status', type: 'ReactNode', description: 'Rendered in the status bar at the bottom.' },
        { name: 'onClose', type: '() => void', description: 'Enables the close button when provided.' },
        { name: 'titleAs', type: "'h2' | 'h3' | 'p'", defaultValue: "'h2'", description: 'Heading level of the title.' },
        { name: 'bodyClassName', type: 'string', description: 'Classes for the content area.' },
      ],
      usage: `<RetroWindow
  title="README.TXT"
  menu={<RetroMenubar items={['File', 'Edit', 'Help']} />}
  status={<span>Ln 1, Col 1</span>}
>
  <p className="p-3">Hello from 1992.</p>
</RetroWindow>`,
      sources: [WIN_SOURCES.window],
    },
    {
      id: 'win-dialog',
      name: 'Dialog',
      description: 'Modal dialog with native focus trapping, Escape to close and action buttons.',
      exports: ['RetroDialog'],
      from,
      preview: winPreviews.dialog,
      props: [
        { name: 'open', type: 'boolean', description: 'Controls visibility.' },
        { name: 'onClose', type: '() => void', description: 'Called on Escape or when the dialog is dismissed.' },
        { name: 'title', type: 'string', description: 'Title bar text.' },
        { name: 'actions', type: 'ReactNode', description: 'Buttons shown at the bottom.' },
      ],
      usage: `const [open, setOpen] = useState(false)

<RetroDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  actions={<RetroButton variant="primary" onClick={() => setOpen(false)}>OK</RetroButton>}
>
  <p>Are you sure?</p>
</RetroDialog>`,
      sources: [WIN_SOURCES.dialog],
    },
    {
      id: 'win-button',
      name: 'Button',
      description: 'Beveled push button with a pressed state and a primary variant.',
      exports: ['RetroButton'],
      from,
      preview: winPreviews.button,
      props: [
        { name: 'variant', type: "'default' | 'primary'", defaultValue: "'default'", description: 'Visual emphasis.' },
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Button height and padding.' },
        { name: '...button', type: 'ButtonHTMLAttributes', description: 'Any native button attribute.' },
      ],
      usage: `<RetroButton variant="primary" onClick={save}>
  Save
</RetroButton>`,
      sources: [WIN_SOURCES.button],
    },
    {
      id: 'win-link-button',
      name: 'Link Button',
      description: 'An anchor styled exactly like a button, for navigation.',
      exports: ['RetroLinkButton'],
      from,
      preview: winPreviews.linkButton,
      props: [
        { name: 'variant', type: "'default' | 'primary'", defaultValue: "'default'", description: 'Visual emphasis.' },
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Button height and padding.' },
        { name: '...anchor', type: 'AnchorHTMLAttributes', description: 'Any native anchor attribute: href, target...' },
      ],
      usage: `<RetroLinkButton href="/docs" variant="primary">
  Read the docs
</RetroLinkButton>`,
      sources: [WIN_SOURCES.button],
    },
    {
      id: 'win-input',
      name: 'Input',
      description: 'Sunken text field with an associated label and optional hint.',
      exports: ['RetroInput'],
      from,
      preview: winPreviews.input,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the input.' },
        { name: 'hint', type: 'string', description: 'Helper text shown under the field.' },
        { name: '...input', type: 'InputHTMLAttributes', description: 'Any native input attribute.' },
      ],
      usage: `<RetroInput label="User name" placeholder="bill_g" />`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-select',
      name: 'Select',
      description: 'Native select with a classic drop-down arrow button.',
      exports: ['RetroSelect'],
      from,
      preview: winPreviews.select,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the select.' },
        { name: '...select', type: 'SelectHTMLAttributes', description: 'Any native select attribute.' },
      ],
      usage: `<RetroSelect label="Resolution" defaultValue="vga">
  <option value="vga">640 x 480</option>
  <option value="svga">800 x 600</option>
</RetroSelect>`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-checkbox',
      name: 'Checkbox',
      description: 'Sunken box with a check mark, built on a real checkbox input.',
      exports: ['RetroCheckbox'],
      from,
      preview: winPreviews.checkbox,
      props: toggleProps,
      usage: `<RetroCheckbox label="Create program group" defaultChecked />`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-radio',
      name: 'Radio',
      description: 'Round option button. Share a name to group options.',
      exports: ['RetroRadio'],
      from,
      preview: winPreviews.radio,
      props: toggleProps,
      usage: `<RetroRadio name="mode" label="Express" defaultChecked />
<RetroRadio name="mode" label="Custom" />`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-group',
      name: 'Group Box',
      description: 'Etched frame with a legend, a fieldset under the hood.',
      exports: ['RetroGroup'],
      from,
      preview: winPreviews.group,
      props: [
        { name: 'legend', type: 'string', description: 'Caption on the frame.' },
        { name: 'className', type: 'string', description: 'Extra classes for the fieldset.' },
      ],
      usage: `<RetroGroup legend="Options">
  <RetroCheckbox label="Run at startup" />
</RetroGroup>`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-menubar',
      name: 'Menu Bar',
      description: 'Horizontal menu items with keyboard navigation.',
      exports: ['RetroMenubar'],
      from,
      preview: winPreviews.menubar,
      props: [
        { name: 'items', type: 'string[]', description: 'Menu labels.' },
        { name: 'label', type: 'string', defaultValue: "'Menu'", description: 'Accessible name of the menu bar.' },
        { name: 'onSelect', type: '(item: string) => void', description: 'Called when an item is chosen.' },
      ],
      usage: `<RetroMenubar items={['File', 'Edit', 'Help']} onSelect={(item) => console.log(item)} />`,
      sources: [WIN_SOURCES.menubar],
    },
    {
      id: 'win-tabs',
      name: 'Tabs',
      description: 'Index-card tabs with arrow key navigation. Controlled or uncontrolled.',
      exports: ['RetroTabs'],
      from,
      preview: winPreviews.tabs,
      props: [
        { name: 'tabs', type: 'RetroTab[]', description: 'Items with id, label and content.' },
        { name: 'value', type: 'string', description: 'Active tab id for controlled usage.' },
        { name: 'onValueChange', type: '(id: string) => void', description: 'Called when the active tab changes.' },
        { name: 'panelClassName', type: 'string', description: 'Replaces the default panel classes.' },
      ],
      usage: `<RetroTabs
  tabs={[
    { id: 'general', label: 'General', content: <p>System info</p> },
    { id: 'about', label: 'About', content: <p>Version 1.0</p> },
  ]}
/>`,
      sources: [WIN_SOURCES.tabs],
    },
    {
      id: 'win-progress',
      name: 'Progress Bar',
      description: 'Segmented progress indicator with a proper progressbar role.',
      exports: ['RetroProgress'],
      from,
      preview: winPreviews.progress,
      props: [
        { name: 'value', type: 'number', description: 'Percentage from 0 to 100.' },
        { name: 'label', type: 'string', description: 'Accessible name.' },
      ],
      usage: `<RetroProgress value={60} label="Copy progress" />`,
      sources: [WIN_SOURCES.feedback],
    },
    {
      id: 'win-badge',
      name: 'Badge',
      description: 'Small status label in five tones.',
      exports: ['RetroBadge'],
      from,
      preview: winPreviews.badge,
      props: [
        {
          name: 'tone',
          type: "'neutral' | 'info' | 'ok' | 'warn' | 'danger'",
          defaultValue: "'neutral'",
          description: 'Color of the badge.',
        },
      ],
      usage: `<RetroBadge tone="ok">In stock</RetroBadge>`,
      sources: [WIN_SOURCES.feedback],
    },
    {
      id: 'win-product-card',
      name: 'Product Card',
      description: 'Ecommerce card: image, specs, options, quantity stepper and live total.',
      exports: ['RetroProductCard'],
      from: '@/components/retro-ui/blocks/retro-product-card',
      preview: winPreviews.productCard,
      props: [
        {
          name: 'product',
          type: 'RetroProduct',
          description: 'id, name, image, price, oldPrice, stock, rating, specs, options and more.',
        },
      ],
      usage: `<RetroProductCard
  product={{
    id: 'keyboard',
    fileName: 'Keyboard.exe',
    name: 'MK-101 Mechanical Keyboard',
    image: '/products/teclado.png',
    description: 'Real clicky keys.',
    price: 89.9,
    stock: 12,
    rating: 5,
    specs: [{ label: 'Keys', value: '101' }],
    optionsLabel: 'Switch',
    options: ['Clicky', 'Linear'],
  }}
/>`,
      sources: [WIN_SOURCES.card],
    },
  ]
}

function macDefs(): ItemDef[] {
  const from = '@/components/mac-ui'
  return [
    {
      id: 'mac-dither',
      name: 'Dither & Shadow',
      description: 'The 1-bit building blocks: a dither pattern, solid black and a hard drop shadow.',
      exports: ['macDither'],
      from,
      preview: macPreviews.dither,
      props: [{ name: 'macDither', type: 'string', description: 'Tailwind classes that paint a 50% dither pattern.' }],
      usage: `<div className={\`\${macDither} h-14 border-2 border-mac-ink\`} />`,
      sources: [MAC_SOURCES.window],
    },
    {
      id: 'mac-window',
      name: 'Window',
      description: 'System 7 window with close box, striped title bar and zoom box.',
      exports: ['MacWindow'],
      from,
      preview: macPreviews.window,
      props: [
        { name: 'title', type: 'string', description: 'Text centered in the title bar.' },
        { name: 'titleAs', type: "'h3' | 'p'", defaultValue: "'p'", description: 'Element used for the title.' },
        { name: 'bodyClassName', type: 'string', description: 'Classes for the content area.' },
      ],
      usage: `<MacWindow title="Untitled" bodyClassName="p-3">
  <p>Black and white.</p>
</MacWindow>`,
      sources: [MAC_SOURCES.window],
    },
    {
      id: 'mac-alert',
      name: 'Alert',
      description: 'Double-bordered alert box with caution icon and action buttons.',
      exports: ['MacAlert'],
      from,
      preview: macPreviews.alert,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name of the alert.' },
        { name: 'actions', type: 'ReactNode', description: 'Buttons aligned to the right.' },
      ],
      usage: `<MacAlert label="Disk error" actions={<MacButton isDefault>Restart</MacButton>}>
  Sorry, a system error occurred.
</MacAlert>`,
      sources: [MAC_SOURCES.feedback],
    },
    {
      id: 'mac-button',
      name: 'Button',
      description: 'Rounded push button. The default button gets the heavy outline.',
      exports: ['MacButton'],
      from,
      preview: macPreviews.button,
      props: [
        { name: 'isDefault', type: 'boolean', defaultValue: 'false', description: 'Adds the default-button ring.' },
        { name: '...button', type: 'ButtonHTMLAttributes', description: 'Any native button attribute.' },
      ],
      usage: `<MacButton isDefault onClick={save}>OK</MacButton>`,
      sources: [MAC_SOURCES.button],
    },
    {
      id: 'mac-input',
      name: 'Input',
      description: 'Plain one-pixel-frame text field with a bold label.',
      exports: ['MacInput'],
      from,
      preview: macPreviews.input,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the input.' },
        { name: '...input', type: 'InputHTMLAttributes', description: 'Any native input attribute.' },
      ],
      usage: `<MacInput label="Name" placeholder="Macintosh HD" />`,
      sources: [MAC_SOURCES.fields],
    },
    {
      id: 'mac-checkbox',
      name: 'Checkbox',
      description: 'Square box that fills with an X when checked.',
      exports: ['MacCheckbox'],
      from,
      preview: macPreviews.checkbox,
      props: toggleProps,
      usage: `<MacCheckbox label="Show invisibles" />`,
      sources: [MAC_SOURCES.fields],
    },
    {
      id: 'mac-radio',
      name: 'Radio',
      description: 'Round button with a solid black dot.',
      exports: ['MacRadio'],
      from,
      preview: macPreviews.radio,
      props: toggleProps,
      usage: `<MacRadio name="install" label="Easy Install" defaultChecked />`,
      sources: [MAC_SOURCES.fields],
    },
    {
      id: 'mac-group',
      name: 'Group Box',
      description: 'Outlined fieldset with a legend.',
      exports: ['MacGroup'],
      from,
      preview: macPreviews.group,
      props: [{ name: 'legend', type: 'string', description: 'Caption on the frame.' }],
      usage: `<MacGroup legend="Options">
  <MacCheckbox label="Run at startup" />
</MacGroup>`,
      sources: [MAC_SOURCES.fields],
    },
    {
      id: 'mac-menubar',
      name: 'Menu Bar',
      description: 'Pull-down menus with the inverted highlight, closing on Escape or outside click.',
      exports: ['MacMenubar', 'type MacMenu'],
      from,
      preview: macPreviews.menubar,
      props: [
        { name: 'menus', type: 'MacMenu[]', description: 'Array of { label, items }.' },
        { name: 'label', type: 'string', defaultValue: "'Menu'", description: 'Accessible name of the menu bar.' },
        { name: 'onSelect', type: '(menu: string, item: string) => void', description: 'Called when an item is chosen.' },
      ],
      usage: `<MacMenubar
  menus={[
    { label: 'File', items: ['New', 'Open...', 'Quit'] },
    { label: 'Edit', items: ['Undo', 'Copy', 'Paste'] },
  ]}
/>`,
      sources: [MAC_SOURCES.menubar],
    },
    {
      id: 'mac-progress',
      name: 'Progress Bar',
      description: 'Outlined bar filled with solid black.',
      exports: ['MacProgress'],
      from,
      preview: macPreviews.progress,
      props: [
        { name: 'value', type: 'number', description: 'Percentage from 0 to 100.' },
        { name: 'label', type: 'string', description: 'Accessible name.' },
      ],
      usage: `<MacProgress value={60} label="Copy progress" />`,
      sources: [MAC_SOURCES.feedback],
    },
  ]
}

const winGroups: [string, string, string[]][] = [
  ['foundations', 'Foundations', ['win-tokens']],
  ['containers', 'Containers', ['win-window', 'win-dialog']],
  ['actions', 'Actions', ['win-button', 'win-link-button']],
  ['forms', 'Forms', ['win-input', 'win-select', 'win-checkbox', 'win-radio', 'win-group']],
  ['navigation', 'Navigation', ['win-menubar', 'win-tabs']],
  ['feedback', 'Feedback', ['win-progress', 'win-badge']],
  ['blocks', 'Blocks', ['win-product-card']],
]

const macGroups: [string, string, string[]][] = [
  ['foundations', 'Foundations', ['mac-dither']],
  ['containers', 'Containers', ['mac-window', 'mac-alert']],
  ['actions', 'Actions', ['mac-button']],
  ['forms', 'Forms', ['mac-input', 'mac-checkbox', 'mac-radio', 'mac-group']],
  ['navigation', 'Navigation', ['mac-menubar']],
  ['feedback', 'Feedback', ['mac-progress']],
]

async function buildCategories(
  kit: string,
  defs: ItemDef[],
  groups: [string, string, string[]][],
): Promise<ExplorerCategory[]> {
  const byId = new Map(defs.map((def) => [def.id, def]))
  return Promise.all(
    groups.map(async ([id, name, ids]) => ({
      id: `${kit}-${id}`,
      name,
      items: await Promise.all(
        ids.map(async (itemId) => {
          const def = byId.get(itemId)!
          const imports = def.exports.length ? `import { ${def.exports.join(', ')} } from '${def.from}'\n\n` : ''
          const usage = await highlight('usage.tsx', `${imports}${def.usage}`)
          return {
            id: def.id,
            name: def.name,
            description: def.description,
            importStatement: imports.trim(),
            preview: def.preview,
            props: def.props,
            usage,
            sources: def.sources,
          } satisfies ExplorerItem
        }),
      ),
    })),
  )
}

export async function getExplorerData(): Promise<ExplorerData> {
  const win = winDefs()
  const mac = macDefs()
  const paths = [...new Set([...win, ...mac].flatMap((def) => def.sources))]

  const entries = await Promise.all(
    paths.map(async (file) => {
      const code = await readFile(path.join(root, file), 'utf8')
      const lang = file.endsWith('.css') ? 'css' : 'tsx'
      return [file, await highlight(file, code, lang)] as const
    }),
  )

  const [winCategories, macCategories] = await Promise.all([
    buildCategories('win', win, winGroups),
    buildCategories('mac', mac, macGroups),
  ])

  return {
    defaultItemId: 'win-product-card',
    sources: Object.fromEntries(entries),
    kits: [
      {
        id: 'win31',
        name: 'Windows 3.1 Kit',
        description: 'Beveled chrome, teal desktop, modern gradients.',
        setup: 'app/globals.css',
        canvas: 'win',
        categories: winCategories,
      },
      {
        id: 'system7',
        name: 'Mac System 7 Kit',
        description: '1-bit black and white, dither and hard shadows.',
        setup: '',
        canvas: 'mac',
        categories: macCategories,
      },
    ],
  }
}
