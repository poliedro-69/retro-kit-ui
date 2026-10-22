import {
  MacAlert,
  MacButton,
  MacCheckbox,
  MacGroup,
  MacInput,
  MacMenubar,
  MacRadio,
  MacProgress,
  MacWindow,
  macDither,
} from '@/components/mac-ui'
import {
  RetroBadge,
  RetroButton,
  RetroCheckbox,
  RetroGroup,
  RetroInput,
  RetroMenubar,
  RetroProgress,
  RetroRadio,
  RetroSelect,
  RetroTabs,
  RetroWindow,
} from '@/components/retro-ui'
import { RetroProductCard } from '@/components/retro-ui/blocks/retro-product-card'
import { products } from '../products'
import { DialogDemo, LinkButtonDemo, MacProgressDemo, ProgressDemo } from './demos'

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
}

export const macPreviews = {
  dither: (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <MacWindow title="Patterns" bodyClassName="flex gap-3 p-3 text-center">
        <div className="flex-1">
          <div className={`${macDither} h-14 border-2 border-black`} />
          <p className="mt-1">dither</p>
        </div>
        <div className="flex-1">
          <div className="h-14 border-2 border-black bg-black" />
          <p className="mt-1">black</p>
        </div>
        <div className="flex-1">
          <div className="h-14 border-2 border-black bg-white shadow-[3px_3px_0_#000]" />
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
    <div className="flex flex-wrap items-center justify-center gap-4 border-2 border-black bg-white p-4">
      <MacButton>Cancel</MacButton>
      <MacButton isDefault>OK</MacButton>
      <MacButton disabled>Disabled</MacButton>
    </div>
  ),
  input: (
    <div className="flex w-full max-w-xs flex-col gap-3 border-2 border-black bg-white p-3">
      <MacInput label="Name" placeholder="e.g. Macintosh HD" autoComplete="off" />
      <MacInput label="Disabled" disabled defaultValue="Read only" />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col border-2 border-black bg-white p-3">
      <MacCheckbox label="Include dark dither" defaultChecked />
      <MacCheckbox label="Show invisibles" />
      <MacCheckbox label="Disabled option" disabled />
    </div>
  ),
  radio: (
    <div className="flex flex-col border-2 border-black bg-white p-3">
      <MacRadio name="mac-mode" label="Easy Install" defaultChecked />
      <MacRadio name="mac-mode" label="Custom Install" />
      <MacRadio name="mac-mode" label="Read only" disabled />
    </div>
  ),
  group: (
    <div className="w-full max-w-xs border-2 border-black bg-white p-3">
      <MacGroup legend="Options">
        <MacCheckbox label="Run at startup" defaultChecked />
        <MacCheckbox label="Show tips" />
      </MacGroup>
    </div>
  ),
  menubar: (
    <div className="min-h-56 w-full max-w-md border-2 border-black bg-white shadow-[3px_3px_0_#000]">
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
