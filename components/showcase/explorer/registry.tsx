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
  scroll: 'components/retro-ui/retro-scroll.tsx',
  listbox: 'components/retro-ui/retro-listbox.tsx',
  slider: 'components/retro-ui/retro-slider.tsx',
  dropdown: 'components/retro-ui/retro-dropdown.tsx',
  menubar: 'components/retro-ui/retro-menubar.tsx',
  tabs: 'components/retro-ui/retro-tabs.tsx',
  feedback: 'components/retro-ui/retro-feedback.tsx',
  label: 'components/retro-ui/retro-label.tsx',
  tooltip: 'components/retro-ui/retro-tooltip.tsx',
  toast: 'components/retro-ui/retro-toast.tsx',
  table: 'components/retro-ui/retro-table.tsx',
  tree: 'components/retro-ui/retro-tree.tsx',
  accordion: 'components/retro-ui/retro-accordion.tsx',
  breadcrumb: 'components/retro-ui/retro-breadcrumb.tsx',
  pagination: 'components/retro-ui/retro-pagination.tsx',
  card: 'components/retro-ui/blocks/retro-product-card.tsx',
  gallery: 'components/retro-ui/blocks/retro-image-gallery.tsx',
}

const MAC_SOURCES = {
  window: 'components/mac-ui/mac-window.tsx',
  button: 'components/mac-ui/mac-button.tsx',
  fields: 'components/mac-ui/mac-fields.tsx',
  scroll: 'components/mac-ui/mac-scroll.tsx',
  listbox: 'components/mac-ui/mac-listbox.tsx',
  slider: 'components/mac-ui/mac-slider.tsx',
  dropdown: 'components/mac-ui/mac-dropdown.tsx',
  menubar: 'components/mac-ui/mac-menubar.tsx',
  feedback: 'components/mac-ui/mac-feedback.tsx',
  label: 'components/mac-ui/mac-label.tsx',
  tooltip: 'components/mac-ui/mac-tooltip.tsx',
  toast: 'components/mac-ui/mac-toast.tsx',
  table: 'components/mac-ui/mac-table.tsx',
  tree: 'components/mac-ui/mac-tree.tsx',
  accordion: 'components/mac-ui/mac-accordion.tsx',
  breadcrumb: 'components/mac-ui/mac-breadcrumb.tsx',
  pagination: 'components/mac-ui/mac-pagination.tsx',
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
      id: 'win-textarea',
      name: 'Textarea',
      description: 'Sunken multi-line field with label, hint and vertical resize.',
      exports: ['RetroTextarea'],
      from,
      preview: winPreviews.textarea,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the textarea.' },
        { name: 'hint', type: 'string', description: 'Helper text shown under the field.' },
        { name: 'rows', type: 'number', defaultValue: '4', description: 'Visible text rows.' },
        { name: '...textarea', type: 'TextareaHTMLAttributes', description: 'Any native textarea attribute.' },
      ],
      usage: `<RetroTextarea label="Notes" placeholder="Type here..." hint="Resize from the bottom edge." />`,
      sources: [WIN_SOURCES.fields],
    },
    {
      id: 'win-listbox',
      name: 'Listbox',
      description: 'Scrollable option list with single or multiple selection and full keyboard support.',
      exports: ['RetroListbox'],
      from,
      preview: winPreviews.listbox,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name, also shown above the list.' },
        { name: 'options', type: 'RetroListboxOption[]', description: 'Items with value, label and optional disabled.' },
        { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allows selecting several options.' },
        { name: 'value', type: 'string[]', description: 'Selected values for controlled usage.' },
        { name: 'defaultValue', type: 'string[]', defaultValue: '[]', description: 'Initial selection when uncontrolled.' },
        { name: 'onValueChange', type: '(value: string[]) => void', description: 'Called when the selection changes.' },
      ],
      usage: `<RetroListbox
  label="Startup files"
  multiple
  options={[
    { value: 'autoexec', label: 'AUTOEXEC.BAT' },
    { value: 'config', label: 'CONFIG.SYS' },
  ]}
  onValueChange={(values) => console.log(values)}
/>`,
      sources: [WIN_SOURCES.listbox],
    },
    {
      id: 'win-slider',
      name: 'Slider',
      description: 'Native range input with a beveled thumb and a live value readout.',
      exports: ['RetroSlider'],
      from,
      preview: winPreviews.slider,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the slider.' },
        { name: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Shows the current value.' },
        { name: 'min / max / step', type: 'number', description: 'Range limits and increment.' },
        { name: '...input', type: 'InputHTMLAttributes', description: 'Any native range input attribute.' },
      ],
      usage: `<RetroSlider label="Volume" defaultValue={60} />`,
      sources: [WIN_SOURCES.slider],
    },
    {
      id: 'win-scroll',
      name: 'Scroll Area',
      description: 'Keyboard-focusable region with classic arrow-button scrollbars.',
      exports: ['RetroScrollArea'],
      from,
      preview: winPreviews.scroll,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name of the region.' },
        { name: 'sunken', type: 'boolean', defaultValue: 'true', description: 'Draws the sunken frame.' },
        { name: 'className', type: 'string', description: 'Set a height or max-height to enable scrolling.' },
      ],
      usage: `<RetroScrollArea label="Log output" className="h-32 p-2">
  {lines.map((line) => <p key={line}>{line}</p>)}
</RetroScrollArea>`,
      sources: [WIN_SOURCES.scroll],
    },
    {
      id: 'win-dropdown',
      name: 'Dropdown Menu',
      description: 'Button-triggered menu with shortcuts, separators and arrow key navigation.',
      exports: ['RetroDropdownMenu'],
      from,
      preview: winPreviews.dropdown,
      props: [
        { name: 'label', type: 'string', description: 'Trigger text and accessible menu name.' },
        {
          name: 'items',
          type: 'RetroMenuItem[]',
          description: 'Entries with label, shortcut, disabled, onSelect, or { separator: true }.',
        },
        { name: 'align', type: "'start' | 'end'", defaultValue: "'start'", description: 'Which edge the menu aligns to.' },
      ],
      usage: `<RetroDropdownMenu
  label="Actions"
  items={[
    { label: 'New', shortcut: 'Ctrl+N', onSelect: createFile },
    { separator: true },
    { label: 'Exit', onSelect: quit },
  ]}
/>`,
      sources: [WIN_SOURCES.dropdown],
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
      id: 'win-label',
      name: 'Label',
      description: 'Standalone form label with an optional required marker.',
      exports: ['RetroLabel'],
      from,
      preview: winPreviews.label,
      props: [
        { name: 'required', type: 'boolean', description: 'Shows a red asterisk (hidden from screen readers).' },
        { name: '...label', type: 'LabelHTMLAttributes', description: 'Any native label attribute, such as htmlFor.' },
      ],
      usage: `<RetroLabel htmlFor="user" required>User name</RetroLabel>
<input id="user" className="rt-sunken bg-rt-paper px-2 py-1" />`,
      sources: [WIN_SOURCES.label],
    },
    {
      id: 'win-separator',
      name: 'Separator',
      description: 'Etched horizontal or vertical divider line.',
      exports: ['RetroSeparator'],
      from,
      preview: winPreviews.separator,
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Direction of the line.' },
        { name: 'decorative', type: 'boolean', defaultValue: 'false', description: 'Removes the separator role when it has no meaning.' },
      ],
      usage: `<RetroSeparator className="my-2" />

<div className="flex h-6 items-center gap-3">
  <span>Cut</span>
  <RetroSeparator orientation="vertical" />
  <span>Copy</span>
</div>`,
      sources: [WIN_SOURCES.label],
    },
    {
      id: 'win-tooltip',
      name: 'Tooltip',
      description: 'Pale yellow hint shown on hover or keyboard focus. Escape dismisses it.',
      exports: ['RetroTooltip', 'RetroButton'],
      from,
      preview: winPreviews.tooltip,
      props: [
        { name: 'content', type: 'ReactNode', description: 'Text shown in the tooltip.' },
        { name: 'children', type: 'ReactElement', description: 'The single element that triggers the tooltip. It receives aria-describedby.' },
        { name: 'side', type: "'top' | 'bottom'", defaultValue: "'top'", description: 'Where the tooltip appears.' },
        { name: 'delay', type: 'number', defaultValue: '400', description: 'Hover delay in milliseconds. Focus shows it instantly.' },
      ],
      usage: `<RetroTooltip content="Save the current file">
  <RetroButton>Save</RetroButton>
</RetroTooltip>`,
      sources: [WIN_SOURCES.tooltip],
    },
    {
      id: 'win-toast',
      name: 'Toast',
      description: 'Small non-modal window for notifications. Auto-dismisses and pauses on hover or focus.',
      exports: ['RetroToast', 'RetroToastRegion'],
      from,
      preview: winPreviews.toast,
      props: [
        { name: 'title', type: 'string', description: 'Text in the title bar.' },
        { name: 'tone', type: "'info' | 'ok' | 'warn' | 'danger'", defaultValue: "'info'", description: 'Title bar color. danger uses role="alert".' },
        { name: 'duration', type: 'number', defaultValue: '0', description: 'Milliseconds before onClose is called. 0 keeps it open.' },
        { name: 'onClose', type: '() => void', description: 'Shows the close button and runs on dismiss.' },
      ],
      usage: `const [open, setOpen] = useState(true)

<RetroToastRegion className="fixed right-4 bottom-4">
  {open && (
    <RetroToast title="File copied" tone="ok" duration={5000} onClose={() => setOpen(false)}>
      README.TXT was copied to A:\\.
    </RetroToast>
  )}
</RetroToastRegion>`,
      sources: [WIN_SOURCES.toast],
    },
    {
      id: 'win-table',
      name: 'Table',
      description: 'Data table with bevelled sortable headers and a selectable row.',
      exports: ['RetroTable'],
      from,
      preview: winPreviews.table,
      props: [
        { name: 'label', type: 'string', description: 'Accessible caption.' },
        { name: 'columns', type: 'RetroTableColumn<T>[]', description: 'key, header, align, sortable, render and sortValue.' },
        { name: 'rows', type: 'T[]', description: 'Row data.' },
        { name: 'getRowId', type: '(row: T) => string', defaultValue: 'row.id', description: 'Unique id for each row.' },
        { name: 'selectedId', type: 'string | null', description: 'Controlled selection. Use defaultSelectedId for uncontrolled.' },
        { name: 'onSelectedChange', type: '(id: string | null) => void', description: 'Called when a row is selected.' },
      ],
      usage: `const columns: RetroTableColumn<FileRow>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'size', header: 'Size', align: 'right', sortable: true },
]

<RetroTable label="Files" columns={columns} rows={files} className="max-h-56" />`,
      sources: [WIN_SOURCES.table],
    },
    {
      id: 'win-tree',
      name: 'Tree View',
      description: 'File Manager style tree with drive, folder and file icons and full keyboard support.',
      exports: ['RetroTreeView'],
      from,
      preview: winPreviews.tree,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name of the tree.' },
        { name: 'nodes', type: 'RetroTreeNode[]', description: 'id, label, icon and children.' },
        { name: 'defaultExpanded', type: 'string[]', description: 'Ids of the folders open on first render.' },
        { name: 'value', type: 'string', description: 'Controlled selected node. Use defaultValue for uncontrolled.' },
        { name: 'onValueChange', type: '(id: string) => void', description: 'Called when a node is selected.' },
      ],
      usage: `<RetroTreeView
  label="File Manager"
  className="h-56"
  defaultExpanded={['c']}
  nodes={[
    {
      id: 'c',
      label: 'C:\\\\',
      icon: 'drive',
      children: [
        { id: 'dos', label: 'DOS', children: [{ id: 'edit', label: 'EDIT.COM' }] },
        { id: 'autoexec', label: 'AUTOEXEC.BAT' },
      ],
    },
  ]}
/>`,
      sources: [WIN_SOURCES.tree],
    },
    {
      id: 'win-accordion',
      name: 'Accordion',
      description: 'Stacked bevelled headers that reveal sunken panels. Arrow keys move between headers.',
      exports: ['RetroAccordion'],
      from,
      preview: winPreviews.accordion,
      props: [
        { name: 'items', type: 'RetroAccordionItem[]', description: 'id, title, content and disabled.' },
        { name: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: 'Allow one or several open panels.' },
        { name: 'defaultValue', type: 'string[]', description: 'Ids of the panels open on first render.' },
      ],
      usage: `<RetroAccordion
  defaultValue={['display']}
  items={[
    { id: 'display', title: 'Display', content: <p>640 x 480, 16 colors.</p> },
    { id: 'sound', title: 'Sound', content: <p>Sound Blaster 16.</p> },
  ]}
/>`,
      sources: [WIN_SOURCES.accordion],
    },
    {
      id: 'win-breadcrumb',
      name: 'Breadcrumb',
      description: 'Path trail with backslash separators. The last item is the current page.',
      exports: ['RetroBreadcrumb'],
      from,
      preview: winPreviews.breadcrumb,
      props: [
        { name: 'items', type: 'RetroBreadcrumbItem[]', description: 'label and optional href.' },
        { name: 'label', type: 'string', defaultValue: "'Breadcrumb'", description: 'Accessible name of the nav.' },
      ],
      usage: `<RetroBreadcrumb
  items={[
    { label: 'C:', href: '#' },
    { label: 'WINDOWS', href: '#' },
    { label: 'SYSTEM' },
  ]}
/>`,
      sources: [WIN_SOURCES.breadcrumb],
    },
    {
      id: 'win-pagination',
      name: 'Pagination',
      description: 'Page buttons with ellipsis, previous and next. Works controlled or uncontrolled.',
      exports: ['RetroPagination'],
      from,
      preview: winPreviews.pagination,
      props: [
        { name: 'pageCount', type: 'number', description: 'Total number of pages.' },
        { name: 'page', type: 'number', description: 'Controlled current page. Use defaultPage for uncontrolled.' },
        { name: 'onPageChange', type: '(page: number) => void', description: 'Called with the new page.' },
        { name: 'siblings', type: 'number', defaultValue: '1', description: 'Pages shown on each side of the current one.' },
      ],
      usage: `<RetroPagination pageCount={12} defaultPage={5} />`,
      sources: [WIN_SOURCES.pagination],
    },
    {
      id: 'win-image-gallery',
      name: 'Image Gallery',
      description: 'A Windows 3.1 photo gallery with filters, thumbnails and an Unsplash-powered preview pane.',
      exports: ['RetroImageGallery', 'RetroGalleryImage'],
      from: '@/components/retro-ui/blocks/retro-image-gallery',
      preview: winPreviews.imageGallery,
      props: [
        { name: 'images', type: 'RetroGalleryImage[]', description: 'Optional images with src, alt, title and category.' },
      ],
      usage: `<RetroImageGallery
  images={[
    { src: 'https://images.unsplash.com/...', alt: 'Mountain lake', title: 'Lakeview.jpg', category: 'Nature' },
  ]}
/>`,
      sources: [WIN_SOURCES.gallery],
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
      id: 'mac-textarea',
      name: 'Textarea',
      description: 'Multi-line field with a heavy frame and vertical resize.',
      exports: ['MacTextarea'],
      from,
      preview: macPreviews.textarea,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the textarea.' },
        { name: 'rows', type: 'number', defaultValue: '4', description: 'Visible text rows.' },
        { name: '...textarea', type: 'TextareaHTMLAttributes', description: 'Any native textarea attribute.' },
      ],
      usage: `<MacTextarea label="Notes" placeholder="Type here..." />`,
      sources: [MAC_SOURCES.fields],
    },
    {
      id: 'mac-listbox',
      name: 'Listbox',
      description: 'Option list with inverted selection, single or multiple, fully keyboard operable.',
      exports: ['MacListbox'],
      from,
      preview: macPreviews.listbox,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name, also shown above the list.' },
        { name: 'options', type: 'MacListboxOption[]', description: 'Items with value, label and optional disabled.' },
        { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allows selecting several options.' },
        { name: 'value', type: 'string[]', description: 'Selected values for controlled usage.' },
        { name: 'defaultValue', type: 'string[]', defaultValue: '[]', description: 'Initial selection when uncontrolled.' },
        { name: 'onValueChange', type: '(value: string[]) => void', description: 'Called when the selection changes.' },
      ],
      usage: `<MacListbox
  label="Startup items"
  options={[
    { value: 'finder', label: 'Finder' },
    { value: 'system', label: 'System Folder' },
  ]}
/>`,
      sources: [MAC_SOURCES.listbox],
    },
    {
      id: 'mac-slider',
      name: 'Slider',
      description: 'Native range input drawn as a 1-bit track with a solid thumb.',
      exports: ['MacSlider'],
      from,
      preview: macPreviews.slider,
      props: [
        { name: 'label', type: 'string', description: 'Visible label linked to the slider.' },
        { name: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Shows the current value.' },
        { name: 'min / max / step', type: 'number', description: 'Range limits and increment.' },
        { name: '...input', type: 'InputHTMLAttributes', description: 'Any native range input attribute.' },
      ],
      usage: `<MacSlider label="Volume" defaultValue={60} />`,
      sources: [MAC_SOURCES.slider],
    },
    {
      id: 'mac-scroll',
      name: 'Scroll Area',
      description: 'Keyboard-focusable region with dithered System 7 scrollbars.',
      exports: ['MacScrollArea'],
      from,
      preview: macPreviews.scroll,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name of the region.' },
        { name: 'framed', type: 'boolean', defaultValue: 'true', description: 'Draws the black frame.' },
        { name: 'className', type: 'string', description: 'Set a height or max-height to enable scrolling.' },
      ],
      usage: `<MacScrollArea label="Log output" className="h-32 p-2">
  {lines.map((line) => <p key={line}>{line}</p>)}
</MacScrollArea>`,
      sources: [MAC_SOURCES.scroll],
    },
    {
      id: 'mac-dropdown',
      name: 'Dropdown Menu',
      description: 'Button-triggered menu with inverted highlight, shortcuts and separators.',
      exports: ['MacDropdownMenu'],
      from,
      preview: macPreviews.dropdown,
      props: [
        { name: 'label', type: 'string', description: 'Trigger text and accessible menu name.' },
        {
          name: 'items',
          type: 'MacMenuItem[]',
          description: 'Entries with label, shortcut, disabled, onSelect, or { separator: true }.',
        },
        { name: 'align', type: "'start' | 'end'", defaultValue: "'start'", description: 'Which edge the menu aligns to.' },
      ],
      usage: `<MacDropdownMenu
  label="Actions"
  items={[
    { label: 'New', shortcut: 'Cmd+N', onSelect: createFile },
    { separator: true },
    { label: 'Quit', onSelect: quit },
  ]}
/>`,
      sources: [MAC_SOURCES.dropdown],
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
    {
      id: 'mac-label',
      name: 'Label',
      description: 'Standalone form label in Monaco with an optional required marker.',
      exports: ['MacLabel'],
      from,
      preview: macPreviews.label,
      props: [
        { name: 'required', type: 'boolean', description: 'Shows an asterisk (hidden from screen readers).' },
        { name: '...label', type: 'LabelHTMLAttributes', description: 'Any native label attribute, such as htmlFor.' },
      ],
      usage: `<MacLabel htmlFor="user" required>Name</MacLabel>
<input id="user" className="border-2 border-mac-ink px-2 py-0.5" />`,
      sources: [MAC_SOURCES.label],
    },
    {
      id: 'mac-separator',
      name: 'Separator',
      description: 'Solid or dashed 2px divider, horizontal or vertical.',
      exports: ['MacSeparator'],
      from,
      preview: macPreviews.separator,
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Direction of the line.' },
        { name: 'variant', type: "'solid' | 'dashed'", defaultValue: "'solid'", description: 'Line style.' },
        { name: 'decorative', type: 'boolean', defaultValue: 'false', description: 'Removes the separator role when it has no meaning.' },
      ],
      usage: `<MacSeparator className="my-2" />
<MacSeparator variant="dashed" className="my-2" />`,
      sources: [MAC_SOURCES.label],
    },
    {
      id: 'mac-tooltip',
      name: 'Balloon Help',
      description: 'Rounded balloon shown on hover or keyboard focus, like System 7 Balloon Help.',
      exports: ['MacTooltip', 'MacButton'],
      from,
      preview: macPreviews.tooltip,
      props: [
        { name: 'content', type: 'ReactNode', description: 'Text shown in the balloon.' },
        { name: 'children', type: 'ReactElement', description: 'The single element that triggers the balloon. It receives aria-describedby.' },
        { name: 'side', type: "'top' | 'bottom'", defaultValue: "'top'", description: 'Where the balloon appears.' },
        { name: 'delay', type: 'number', defaultValue: '400', description: 'Hover delay in milliseconds. Focus shows it instantly.' },
      ],
      usage: `<MacTooltip content="Save the current document">
  <MacButton>Save</MacButton>
</MacTooltip>`,
      sources: [MAC_SOURCES.tooltip],
    },
    {
      id: 'mac-toast',
      name: 'Notification',
      description: 'Small non-modal window with a close box. Auto-dismisses and pauses on hover or focus.',
      exports: ['MacToast', 'MacToastRegion'],
      from,
      preview: macPreviews.toast,
      props: [
        { name: 'title', type: 'string', description: 'Text in the title bar.' },
        { name: 'urgent', type: 'boolean', defaultValue: 'false', description: 'Uses role="alert" instead of role="status".' },
        { name: 'duration', type: 'number', defaultValue: '0', description: 'Milliseconds before onClose is called. 0 keeps it open.' },
        { name: 'onClose', type: '() => void', description: 'Shows the close box and runs on dismiss.' },
      ],
      usage: `const [open, setOpen] = useState(true)

<MacToastRegion className="fixed right-4 bottom-4">
  {open && (
    <MacToast title="Finder" duration={5000} onClose={() => setOpen(false)}>
      Copy finished.
    </MacToast>
  )}
</MacToastRegion>`,
      sources: [MAC_SOURCES.toast],
    },
    {
      id: 'mac-table',
      name: 'Table',
      description: 'List view with sortable headers; the selected row is inverted.',
      exports: ['MacTable'],
      from,
      preview: macPreviews.table,
      props: [
        { name: 'label', type: 'string', description: 'Accessible caption.' },
        { name: 'columns', type: 'MacTableColumn<T>[]', description: 'key, header, align, sortable, render and sortValue.' },
        { name: 'rows', type: 'T[]', description: 'Row data.' },
        { name: 'getRowId', type: '(row: T) => string', defaultValue: 'row.id', description: 'Unique id for each row.' },
        { name: 'selectedId', type: 'string | null', description: 'Controlled selection. Use defaultSelectedId for uncontrolled.' },
        { name: 'onSelectedChange', type: '(id: string | null) => void', description: 'Called when a row is selected.' },
      ],
      usage: `const columns: MacTableColumn<FileRow>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'size', header: 'Size', align: 'right', sortable: true },
]

<MacTable label="Files" columns={columns} rows={files} className="max-h-56" />`,
      sources: [MAC_SOURCES.table],
    },
    {
      id: 'mac-tree',
      name: 'Tree View',
      description: 'Finder list view with disclosure triangles and full keyboard support.',
      exports: ['MacTreeView'],
      from,
      preview: macPreviews.tree,
      props: [
        { name: 'label', type: 'string', description: 'Accessible name of the tree.' },
        { name: 'nodes', type: 'MacTreeNode[]', description: 'id, label, icon and children.' },
        { name: 'defaultExpanded', type: 'string[]', description: 'Ids of the folders open on first render.' },
        { name: 'value', type: 'string', description: 'Controlled selected node. Use defaultValue for uncontrolled.' },
        { name: 'onValueChange', type: '(id: string) => void', description: 'Called when a node is selected.' },
      ],
      usage: `<MacTreeView
  label="Finder"
  className="h-56"
  defaultExpanded={['hd']}
  nodes={[
    {
      id: 'hd',
      label: 'Macintosh HD',
      icon: 'drive',
      children: [
        { id: 'system', label: 'System Folder', children: [{ id: 'finder', label: 'Finder' }] },
        { id: 'readme', label: 'Read Me' },
      ],
    },
  ]}
/>`,
      sources: [MAC_SOURCES.tree],
    },
    {
      id: 'mac-accordion',
      name: 'Disclosure',
      description: 'Outlined headers with a disclosure triangle. Arrow keys move between headers.',
      exports: ['MacAccordion'],
      from,
      preview: macPreviews.accordion,
      props: [
        { name: 'items', type: 'MacAccordionItem[]', description: 'id, title, content and disabled.' },
        { name: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: 'Allow one or several open panels.' },
        { name: 'defaultValue', type: 'string[]', description: 'Ids of the panels open on first render.' },
      ],
      usage: `<MacAccordion
  defaultValue={['general']}
  items={[
    { id: 'general', title: 'General', content: <p>Macintosh Plus, 4 MB.</p> },
    { id: 'memory', title: 'Memory', content: <p>Disk cache: 32K.</p> },
  ]}
/>`,
      sources: [MAC_SOURCES.accordion],
    },
    {
      id: 'mac-breadcrumb',
      name: 'Breadcrumb',
      description: 'Classic Mac path with colon separators. The last item is the current page.',
      exports: ['MacBreadcrumb'],
      from,
      preview: macPreviews.breadcrumb,
      props: [
        { name: 'items', type: 'MacBreadcrumbItem[]', description: 'label and optional href.' },
        { name: 'label', type: 'string', defaultValue: "'Breadcrumb'", description: 'Accessible name of the nav.' },
      ],
      usage: `<MacBreadcrumb
  items={[
    { label: 'Macintosh HD', href: '#' },
    { label: 'System Folder', href: '#' },
    { label: 'Fonts' },
  ]}
/>`,
      sources: [MAC_SOURCES.breadcrumb],
    },
    {
      id: 'mac-pagination',
      name: 'Pagination',
      description: 'Rounded page buttons with ellipsis, previous and next. Works controlled or uncontrolled.',
      exports: ['MacPagination'],
      from,
      preview: macPreviews.pagination,
      props: [
        { name: 'pageCount', type: 'number', description: 'Total number of pages.' },
        { name: 'page', type: 'number', description: 'Controlled current page. Use defaultPage for uncontrolled.' },
        { name: 'onPageChange', type: '(page: number) => void', description: 'Called with the new page.' },
        { name: 'siblings', type: 'number', defaultValue: '1', description: 'Pages shown on each side of the current one.' },
      ],
      usage: `<MacPagination pageCount={12} defaultPage={5} />`,
      sources: [MAC_SOURCES.pagination],
    },
  ]
}

const winGroups: [string, string, string[]][] = [
  ['foundations', 'Foundations', ['win-tokens', 'win-separator']],
  ['containers', 'Containers', ['win-window', 'win-dialog']],
  ['actions', 'Actions', ['win-button', 'win-link-button']],
  [
    'forms',
    'Forms',
    [
      'win-label',
      'win-input',
      'win-textarea',
      'win-select',
      'win-listbox',
      'win-slider',
      'win-checkbox',
      'win-radio',
      'win-group',
    ],
  ],
  ['data', 'Data Display', ['win-table', 'win-tree']],
  [
    'navigation',
    'Navigation',
    ['win-menubar', 'win-dropdown', 'win-tabs', 'win-scroll', 'win-accordion', 'win-breadcrumb', 'win-pagination'],
  ],
  ['feedback', 'Feedback', ['win-progress', 'win-badge', 'win-tooltip', 'win-toast']],
  ['blocks', 'Blocks', ['win-image-gallery', 'win-product-card']],
]

const macGroups: [string, string, string[]][] = [
  ['foundations', 'Foundations', ['mac-dither', 'mac-separator']],
  ['containers', 'Containers', ['mac-window', 'mac-alert']],
  ['actions', 'Actions', ['mac-button']],
  [
    'forms',
    'Forms',
    ['mac-label', 'mac-input', 'mac-textarea', 'mac-listbox', 'mac-slider', 'mac-checkbox', 'mac-radio', 'mac-group'],
  ],
  ['data', 'Data Display', ['mac-table', 'mac-tree']],
  [
    'navigation',
    'Navigation',
    ['mac-menubar', 'mac-dropdown', 'mac-scroll', 'mac-accordion', 'mac-breadcrumb', 'mac-pagination'],
  ],
  ['feedback', 'Feedback', ['mac-progress', 'mac-tooltip', 'mac-toast']],
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
