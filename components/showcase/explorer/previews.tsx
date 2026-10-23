import {
  MacAccordion,
  MacAlert,
  MacBreadcrumb,
  MacButton,
  MacCheckbox,
  MacDropdownMenu,
  MacGroup,
  MacInput,
  MacLabel,
  MacListbox,
  MacMenubar,
  MacPagination,
  MacRadio,
  MacProgress,
  MacScrollArea,
  MacSeparator,
  MacSlider,
  MacTable,
  MacTextarea,
  MacTooltip,
  MacTreeView,
  MacWindow,
  macDither,
} from '@/components/mac-ui'
import type { MacTableColumn } from '@/components/mac-ui/mac-table'
import type { MacTreeNode } from '@/components/mac-ui/mac-tree'
import {
  RetroAccordion,
  RetroBadge,
  RetroBreadcrumb,
  RetroButton,
  RetroCalendar,
  RetroCheckbox,
  RetroDropdownMenu,
  RetroGroup,
  RetroInput,
  RetroLabel,
  RetroListbox,
  RetroMenubar,
  RetroPagination,
  RetroProgress,
  RetroRadio,
  RetroScrollArea,
  RetroSelect,
  RetroSeparator,
  RetroSlider,
  RetroTable,
  RetroTabs,
  RetroTextarea,
  RetroTooltip,
  RetroTreeView,
  RetroWindow,
} from '@/components/retro-ui'
import { RetroProductCard } from '@/components/retro-ui/blocks/retro-product-card'
import { RetroImageGallery } from '@/components/retro-ui/blocks/retro-image-gallery'
import type { RetroTableColumn } from '@/components/retro-ui/retro-table'
import type { RetroTreeNode } from '@/components/retro-ui/retro-tree'
import { products } from '../products'
import { DialogDemo, LinkButtonDemo, MacProgressDemo, ProgressDemo } from './demos'
import { MacToastDemo, ToastDemo } from './toast-demos'

const swatches = [
  { name: 'face', className: 'bg-rt-face' },
  { name: 'face-hi', className: 'bg-rt-face-hi' },
  { name: 'shadow', className: 'bg-rt-shadow' },
  { name: 'ink', className: 'bg-rt-ink' },
  { name: 'accent', className: 'bg-rt-accent' },
  { name: 'accent-deep', className: 'bg-rt-accent-deep' },
  { name: 'desktop', className: 'bg-rt-desktop' },
  { name: 'warn', className: 'bg-rt-warn' },
  { name: 'ok', className: 'bg-rt-ok' },
  { name: 'danger', className: 'bg-rt-danger' },
]

const fileOptions = [
  { value: 'autoexec', label: 'AUTOEXEC.BAT' },
  { value: 'config', label: 'CONFIG.SYS' },
  { value: 'command', label: 'COMMAND.COM' },
  { value: 'win', label: 'WIN.INI' },
  { value: 'system', label: 'SYSTEM.INI' },
  { value: 'progman', label: 'PROGMAN.INI', disabled: true },
  { value: 'readme', label: 'README.TXT' },
]

const loremLines = Array.from({ length: 14 }, (_, index) => `Line ${index + 1}: The quick brown fox jumps over the lazy dog.`)

type FileRow = { id: string; name: string; kind: string; size: string; modified: string }

const winFiles: FileRow[] = [
  { id: 'autoexec', name: 'AUTOEXEC.BAT', kind: 'Batch file', size: '1 KB', modified: '03/10/92' },
  { id: 'config', name: 'CONFIG.SYS', kind: 'System file', size: '2 KB', modified: '03/10/92' },
  { id: 'command', name: 'COMMAND.COM', kind: 'Application', size: '52 KB', modified: '09/30/93' },
  { id: 'win', name: 'WIN.INI', kind: 'Configuration', size: '8 KB', modified: '04/06/92' },
  { id: 'system', name: 'SYSTEM.INI', kind: 'Configuration', size: '3 KB', modified: '04/06/92' },
  { id: 'readme', name: 'README.TXT', kind: 'Text document', size: '12 KB', modified: '05/21/93' },
]

const winColumns: RetroTableColumn<FileRow>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'kind', header: 'Type', sortable: true },
  { key: 'size', header: 'Size', align: 'right', sortable: true },
  { key: 'modified', header: 'Modified', sortable: true },
]

const macFiles: FileRow[] = [
  { id: 'readme', name: 'Read Me', kind: 'SimpleText document', size: '4K', modified: 'Mon, Jun 3, 1991' },
  { id: 'finder', name: 'Finder', kind: 'application', size: '168K', modified: 'Wed, May 15, 1991' },
  { id: 'system', name: 'System', kind: 'System file', size: '1,024K', modified: 'Wed, May 15, 1991' },
  { id: 'trash', name: 'Trash', kind: 'folder', size: '--', modified: 'Fri, Jun 14, 1991' },
  { id: 'clock', name: 'Alarm Clock', kind: 'desk accessory', size: '12K', modified: 'Tue, Apr 2, 1991' },
]

const macColumns: MacTableColumn<FileRow>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'kind', header: 'Kind', sortable: true },
  { key: 'size', header: 'Size', align: 'right', sortable: true },
  { key: 'modified', header: 'Last Modified', sortable: true },
]

const winTree: RetroTreeNode[] = [
  {
    id: 'c',
    label: 'C:\\',
    icon: 'drive',
    children: [
      {
        id: 'dos',
        label: 'DOS',
        children: [
          { id: 'format', label: 'FORMAT.COM' },
          { id: 'edit', label: 'EDIT.COM' },
        ],
      },
      {
        id: 'windows',
        label: 'WINDOWS',
        children: [
          { id: 'system-dir', label: 'SYSTEM', children: [{ id: 'vga', label: 'VGA.DRV' }] },
          { id: 'win-ini', label: 'WIN.INI' },
        ],
      },
      { id: 'autoexec', label: 'AUTOEXEC.BAT' },
    ],
  },
  { id: 'a', label: 'A:\\', icon: 'drive' },
]

const macTree: MacTreeNode[] = [
  {
    id: 'hd',
    label: 'Macintosh HD',
    icon: 'drive',
    children: [
      {
        id: 'system-folder',
        label: 'System Folder',
        children: [
          { id: 'finder', label: 'Finder' },
          { id: 'system', label: 'System' },
          { id: 'fonts', label: 'Fonts', children: [{ id: 'chicago', label: 'Chicago' }] },
        ],
      },
      { id: 'documents', label: 'Documents', children: [{ id: 'letter', label: 'Letter' }] },
      { id: 'readme', label: 'Read Me' },
    ],
  },
  { id: 'floppy', label: 'Untitled', icon: 'drive' },
]

export const winPreviews = {
  tokens: (
    <div className="flex w-full max-w-md flex-col gap-4">
      <RetroWindow title="Palette" titleAs="p">
        <ul className="grid grid-cols-5 gap-x-2 gap-y-3 p-3">
          {swatches.map((swatch) => (
            <li key={swatch.name} className="flex flex-col items-center gap-1 text-[11px]">
              <span className={`${swatch.className} size-9 border border-rt-line`} />
              {swatch.name}
            </li>
          ))}
        </ul>
      </RetroWindow>
      <RetroWindow title="Bevels" titleAs="p">
        <div className="flex gap-3 p-3 text-center text-[12px]">
          <div className="rt-raised flex-1 py-4">rt-raised</div>
          <div className="rt-pressed flex-1 py-4">rt-pressed</div>
          <div className="rt-sunken flex-1 py-4">rt-sunken</div>
        </div>
      </RetroWindow>
    </div>
  ),
  window: (
    <RetroWindow
      title="README.TXT"
      className="w-full max-w-md"
      menu={<RetroMenubar items={['File', 'Edit', 'Search', 'Help']} />}
      status={
        <>
          <span className="flex-1">Ln 1, Col 1</span>
          <RetroBadge tone="info">INS</RetroBadge>
        </>
      }
    >
      <div className="p-2">
        <div className="rt-sunken h-32 p-2 font-mono text-[12px] leading-relaxed">
          Welcome to RetroKit.
          <br />
          Windows 3.1 structure, modern finish.
          <br />
          <br />
          C:\&gt;_
        </div>
      </div>
    </RetroWindow>
  ),
  dialog: <DialogDemo />,
  button: (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RetroButton>Default</RetroButton>
      <RetroButton variant="primary">Primary</RetroButton>
      <RetroButton size="sm">Small</RetroButton>
      <RetroButton disabled>Disabled</RetroButton>
    </div>
  ),
  linkButton: <LinkButtonDemo />,
  input: (
    <div className="rt-raised flex w-full max-w-xs flex-col gap-3 p-3">
      <RetroInput label="User name" placeholder="e.g. bill_g" autoComplete="off" />
      <RetroInput label="Directory" defaultValue="C:\WINDOWS" hint="Install path" className="font-mono" />
      <RetroInput label="Disabled" disabled defaultValue="Read only" />
    </div>
  ),
  select: (
    <div className="rt-raised w-full max-w-xs p-3">
      <RetroSelect label="Resolution" defaultValue="vga">
        <option value="vga">640 x 480, 16 colors</option>
        <option value="svga">800 x 600, 256 colors</option>
        <option value="xga">1024 x 768, 256 colors</option>
      </RetroSelect>
    </div>
  ),
  textarea: (
    <div className="rt-raised w-full max-w-sm p-3">
      <RetroTextarea label="Notes" placeholder="Type here..." hint="Resize from the bottom edge." />
    </div>
  ),
  listbox: (
    <div className="rt-raised grid w-full max-w-md gap-4 p-3 sm:grid-cols-2">
      <RetroListbox label="Single selection" options={fileOptions} defaultValue={['config']} />
      <RetroListbox label="Multiple selection" options={fileOptions} multiple defaultValue={['autoexec', 'win']} />
    </div>
  ),
  slider: (
    <div className="rt-raised flex w-full max-w-xs flex-col gap-4 p-3">
      <RetroSlider label="Volume" defaultValue={60} />
      <RetroSlider label="Mouse speed" min={1} max={10} defaultValue={4} />
      <RetroSlider label="Disabled" disabled defaultValue={30} />
    </div>
  ),
  scroll: (
    <div className="rt-raised w-full max-w-sm p-3">
      <RetroScrollArea label="Log output" className="h-32 bg-rt-paper p-2 font-mono">
        {loremLines.map((line) => (
          <p key={line} className="whitespace-nowrap">
            {line}
          </p>
        ))}
      </RetroScrollArea>
    </div>
  ),
  dropdown: (
    <div className="rt-raised min-h-56 w-full max-w-sm p-3">
      <RetroDropdownMenu
        label="Actions"
        items={[
          { label: 'New', shortcut: 'Ctrl+N' },
          { label: 'Open...', shortcut: 'Ctrl+O' },
          { label: 'Save', shortcut: 'Ctrl+S' },
          { separator: true },
          { label: 'Print', disabled: true },
          { separator: true },
          { label: 'Exit', shortcut: 'Alt+F4' },
        ]}
      />
    </div>
  ),
  label: (
    <div className="rt-raised flex w-full max-w-xs flex-col gap-1 p-3">
      <RetroLabel htmlFor="rt-label-demo" required>
        User name
      </RetroLabel>
      <input
        id="rt-label-demo"
        type="text"
        defaultValue="Administrator"
        className="rt-sunken bg-rt-paper px-2 py-1 text-[13px] text-rt-ink outline-none"
      />
    </div>
  ),
  separator: (
    <div className="rt-raised flex w-full max-w-xs flex-col gap-2 p-3 text-[13px] text-rt-ink">
      <span>Program Manager</span>
      <RetroSeparator />
      <div className="flex h-6 items-center gap-3">
        <span>Cut</span>
        <RetroSeparator orientation="vertical" />
        <span>Copy</span>
        <RetroSeparator orientation="vertical" />
        <span>Paste</span>
      </div>
    </div>
  ),
  tooltip: (
    <div className="rt-raised flex min-h-40 w-full max-w-sm flex-wrap items-center justify-center gap-4 p-3">
      <RetroTooltip content="Save the current file">
        <RetroButton>Save</RetroButton>
      </RetroTooltip>
      <RetroTooltip content="Open the file manager" side="bottom">
        <RetroButton>Open</RetroButton>
      </RetroTooltip>
    </div>
  ),
  toast: <ToastDemo />,
  table: (
    <div className="w-full max-w-lg">
      <RetroTable label="Files" columns={winColumns} rows={winFiles} defaultSelectedId="win" className="max-h-56" />
    </div>
  ),
  tree: (
    <RetroTreeView
      label="File Manager"
      nodes={winTree}
      defaultExpanded={['c', 'windows']}
      defaultValue="win-ini"
      className="h-56 w-full max-w-xs"
    />
  ),
  accordion: (
    <div className="w-full max-w-sm">
      <RetroAccordion
        defaultValue={['display']}
        items={[
          { id: 'display', title: 'Display', content: <p>640 x 480, 16 colors. Super VGA driver.</p> },
          { id: 'sound', title: 'Sound', content: <p>Sound Blaster 16 on IRQ 5.</p> },
          { id: 'network', title: 'Network', content: <p>Not installed.</p>, disabled: true },
        ]}
      />
    </div>
  ),
  breadcrumb: (
    <div className="rt-raised p-3">
      <RetroBreadcrumb
        items={[
          { label: 'C:', href: '#' },
          { label: 'WINDOWS', href: '#' },
          { label: 'SYSTEM' },
        ]}
      />
    </div>
  ),
  pagination: (
    <div className="rt-raised p-3">
      <RetroPagination pageCount={12} defaultPage={5} />
    </div>
  ),
  calendar: <RetroCalendar defaultValue={new Date(1993, 5, 15)} />,
  checkbox: (
    <div className="rt-raised flex flex-col p-3">
      <RetroCheckbox label="Create program group" defaultChecked />
      <RetroCheckbox label="Install screen saver" />
      <RetroCheckbox label="Disabled option" disabled />
    </div>
  ),
  radio: (
    <div className="rt-raised flex flex-col p-3">
      <RetroRadio name="win-mode" label="Express install" defaultChecked />
      <RetroRadio name="win-mode" label="Custom" />
      <RetroRadio name="win-mode" label="Read only" disabled />
    </div>
  ),
  group: (
    <div className="rt-raised w-full max-w-xs p-3">
      <RetroGroup legend="Options">
        <RetroCheckbox label="Run at startup" defaultChecked />
        <RetroCheckbox label="Show tips" />
      </RetroGroup>
    </div>
  ),
  menubar: (
    <div className="rt-raised w-full max-w-sm p-1">
      <RetroMenubar items={['File', 'Edit', 'View', 'Window', 'Help']} />
    </div>
  ),
  tabs: (
    <div className="w-full max-w-sm">
      <RetroTabs
        tabs={[
          {
            id: 'general',
            label: 'General',
            content: (
              <div className="flex flex-col gap-2">
                <p className="leading-snug">Operating system: RetroKit 3.1. Available memory: 640 KB.</p>
                <div className="flex gap-1.5">
                  <RetroBadge tone="ok">Stable</RetroBadge>
                  <RetroBadge tone="info">386 mode</RetroBadge>
                </div>
              </div>
            ),
          },
          {
            id: 'theme',
            label: 'Theme',
            content: <p className="leading-snug">Beveled borders with soft gradients and accessible focus states.</p>,
          },
          {
            id: 'about',
            label: 'About',
            content: <p className="leading-snug">Built with React and Tailwind CSS. Pure CSS, no images.</p>,
          },
        ]}
      />
    </div>
  ),
  progress: <ProgressDemo />,
  badge: (
    <div className="rt-raised flex flex-wrap justify-center gap-2 p-3">
      <RetroBadge>Neutral</RetroBadge>
      <RetroBadge tone="info">Info</RetroBadge>
      <RetroBadge tone="ok">OK</RetroBadge>
      <RetroBadge tone="warn">Warning</RetroBadge>
      <RetroBadge tone="danger">Error</RetroBadge>
    </div>
  ),
  productCard: <RetroProductCard product={products[0]} />,
  imageGallery: <RetroImageGallery />,
}

export const macPreviews = {
  dither: (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <MacWindow title="Patterns" bodyClassName="flex gap-3 p-3 text-center">
        <div className="flex-1">
          <div className={`${macDither} h-14 border-2 border-mac-ink`} />
          <p className="mt-1">dither</p>
        </div>
        <div className="flex-1">
          <div className="h-14 border-2 border-mac-ink bg-mac-ink" />
          <p className="mt-1">black</p>
        </div>
        <div className="flex-1">
          <div className="h-14 border-2 border-mac-ink bg-mac-paper shadow-[3px_3px_0_var(--color-mac-ink)]" />
          <p className="mt-1">shadow</p>
        </div>
      </MacWindow>
    </div>
  ),
  window: (
    <MacWindow title="Untitled" className="w-full max-w-sm" bodyClassName="p-3 leading-relaxed">
      <p>Black and white, one pixel at a time.</p>
      <p className="mt-2">Close box on the left, zoom box on the right.</p>
    </MacWindow>
  ),
  alert: (
    <MacAlert
      label="Disk error"
      className="w-full max-w-sm"
      actions={
        <>
          <MacButton>Cancel</MacButton>
          <MacButton isDefault>Restart</MacButton>
        </>
      }
    >
      Sorry, a system error occurred. Do you want to restart the computer?
    </MacAlert>
  ),
  button: (
    <div className="flex flex-wrap items-center justify-center gap-4 border-2 border-mac-ink bg-mac-paper p-4">
      <MacButton>Cancel</MacButton>
      <MacButton isDefault>OK</MacButton>
      <MacButton disabled>Disabled</MacButton>
    </div>
  ),
  input: (
    <div className="flex w-full max-w-xs flex-col gap-3 border-2 border-mac-ink bg-mac-paper p-3">
      <MacInput label="Name" placeholder="e.g. Macintosh HD" autoComplete="off" />
      <MacInput label="Disabled" disabled defaultValue="Read only" />
    </div>
  ),
  textarea: (
    <div className="w-full max-w-sm border-2 border-mac-ink bg-mac-paper p-3">
      <MacTextarea label="Notes" placeholder="Type here..." />
    </div>
  ),
  listbox: (
    <div className="grid w-full max-w-md gap-4 border-2 border-mac-ink bg-mac-paper p-3 sm:grid-cols-2">
      <MacListbox label="Single selection" options={fileOptions} defaultValue={['config']} />
      <MacListbox label="Multiple selection" options={fileOptions} multiple defaultValue={['autoexec', 'win']} />
    </div>
  ),
  slider: (
    <div className="flex w-full max-w-xs flex-col gap-4 border-2 border-mac-ink bg-mac-paper p-3">
      <MacSlider label="Volume" defaultValue={60} />
      <MacSlider label="Mouse speed" min={1} max={10} defaultValue={4} />
      <MacSlider label="Disabled" disabled defaultValue={30} />
    </div>
  ),
  scroll: (
    <div className="w-full max-w-sm border-2 border-mac-ink bg-mac-paper p-3">
      <MacScrollArea label="Log output" className="h-32 p-2">
        {loremLines.map((line) => (
          <p key={line} className="whitespace-nowrap">
            {line}
          </p>
        ))}
      </MacScrollArea>
    </div>
  ),
  dropdown: (
    <div className="min-h-56 w-full max-w-sm border-2 border-mac-ink bg-mac-paper p-3">
      <MacDropdownMenu
        label="Actions"
        items={[
          { label: 'New', shortcut: 'Cmd+N' },
          { label: 'Open...', shortcut: 'Cmd+O' },
          { label: 'Save', shortcut: 'Cmd+S' },
          { separator: true },
          { label: 'Print', disabled: true },
          { separator: true },
          { label: 'Quit', shortcut: 'Cmd+Q' },
        ]}
      />
    </div>
  ),
  label: (
    <div className="flex w-full max-w-xs flex-col gap-1 border-2 border-mac-ink bg-mac-paper p-3">
      <MacLabel htmlFor="mac-label-demo" required>
        Name
      </MacLabel>
      <input
        id="mac-label-demo"
        type="text"
        defaultValue="Startup Disk"
        className="border-2 border-mac-ink bg-mac-paper px-2 py-0.5 text-[13px] text-mac-ink outline-none"
      />
    </div>
  ),
  separator: (
    <div className="flex w-full max-w-xs flex-col gap-2 border-2 border-mac-ink bg-mac-paper p-3 text-[13px] text-mac-ink">
      <span>Finder</span>
      <MacSeparator />
      <span>Special</span>
      <MacSeparator variant="dashed" />
      <div className="flex h-6 items-center gap-3">
        <span>Cut</span>
        <MacSeparator orientation="vertical" />
        <span>Copy</span>
      </div>
    </div>
  ),
  tooltip: (
    <div className="flex min-h-40 w-full max-w-sm flex-wrap items-center justify-center gap-4 border-2 border-mac-ink bg-mac-paper p-3">
      <MacTooltip content="Save the current document">
        <MacButton>Save</MacButton>
      </MacTooltip>
      <MacTooltip content="Open a document" side="bottom">
        <MacButton>Open</MacButton>
      </MacTooltip>
    </div>
  ),
  toast: <MacToastDemo />,
  table: (
    <div className="w-full max-w-lg">
      <MacTable label="Files" columns={macColumns} rows={macFiles} defaultSelectedId="finder" className="max-h-56" />
    </div>
  ),
  tree: (
    <MacTreeView
      label="Finder"
      nodes={macTree}
      defaultExpanded={['hd', 'system-folder']}
      defaultValue="finder"
      className="h-56 w-full max-w-xs"
    />
  ),
  accordion: (
    <div className="w-full max-w-sm">
      <MacAccordion
        defaultValue={['general']}
        items={[
          { id: 'general', title: 'General', content: <p>Macintosh Plus, 4 MB of memory.</p> },
          { id: 'memory', title: 'Memory', content: <p>Disk cache: 32K.</p> },
          { id: 'sharing', title: 'Sharing', content: <p>File sharing is off.</p>, disabled: true },
        ]}
      />
    </div>
  ),
  breadcrumb: (
    <div className="border-2 border-mac-ink bg-mac-paper p-3">
      <MacBreadcrumb
        items={[
          { label: 'Macintosh HD', href: '#' },
          { label: 'System Folder', href: '#' },
          { label: 'Fonts' },
        ]}
      />
    </div>
  ),
  pagination: (
    <div className="border-2 border-mac-ink bg-mac-paper p-3">
      <MacPagination pageCount={12} defaultPage={5} />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col border-2 border-mac-ink bg-mac-paper p-3">
      <MacCheckbox label="Include dark dither" defaultChecked />
      <MacCheckbox label="Show invisibles" />
      <MacCheckbox label="Disabled option" disabled />
    </div>
  ),
  radio: (
    <div className="flex flex-col border-2 border-mac-ink bg-mac-paper p-3">
      <MacRadio name="mac-mode" label="Easy Install" defaultChecked />
      <MacRadio name="mac-mode" label="Custom Install" />
      <MacRadio name="mac-mode" label="Read only" disabled />
    </div>
  ),
  group: (
    <div className="w-full max-w-xs border-2 border-mac-ink bg-mac-paper p-3">
      <MacGroup legend="Options">
        <MacCheckbox label="Run at startup" defaultChecked />
        <MacCheckbox label="Show tips" />
      </MacGroup>
    </div>
  ),
  menubar: (
    <div className="min-h-56 w-full max-w-md border-2 border-mac-ink bg-mac-paper shadow-[3px_3px_0_var(--color-mac-ink)]">
      <MacMenubar
        menus={[
          { label: 'File', items: ['New', 'Open...', 'Close', 'Quit'] },
          { label: 'Edit', items: ['Undo', 'Cut', 'Copy', 'Paste'] },
          { label: 'View', items: ['by Icon', 'by Name', 'by Date'] },
          { label: 'Special', items: ['Clean Up', 'Empty Trash', 'Restart', 'Shut Down'] },
        ]}
      />
    </div>
  ),
  progress: <MacProgressDemo />,
  progressStatic: <MacProgress value={60} label="Progress" className="w-64" />,
}
