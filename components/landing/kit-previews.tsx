import { Calculator, Clock, FolderOpen, Palette } from 'lucide-react'
import { RetroButton, RetroProgress, RetroWindow } from '@/components/retro-ui'
import { cn } from '@/lib/utils'
import { MacButton, MacWindow, macDither } from '@/components/mac-ui'

const programs = [
  { Icon: FolderOpen, label: 'Main' },
  { Icon: Calculator, label: 'Tools' },
  { Icon: Palette, label: 'Paint' },
  { Icon: Clock, label: 'Clock' },
]

export function Win31Preview({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" inert className={className}>
      <RetroWindow
        title="Program Manager"
        titleAs="p"
        menu={
          <div className="flex gap-4 px-2 py-0.5 text-[12px]">
            <span>File</span>
            <span>Options</span>
            <span>Window</span>
            <span>Help</span>
          </div>
        }
        status={<span className="flex-1">Installing RetroKit...</span>}
      >
        <div className="grid grid-cols-4 gap-2 p-3">
          {programs.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="rt-raised flex size-10 items-center justify-center">
                <Icon className="size-5 text-rt-accent-deep" />
              </span>
              <span className="text-[11px]">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center px-3 pt-1" aria-hidden="true">
          <img
            src="/retro-platformer-character.png"
            alt=""
            className="h-20 w-20 object-contain [image-rendering:pixelated] motion-safe:animate-bounce"
          />
        </div>
        <div className="flex flex-col gap-3 px-3 pb-3">
          <RetroProgress value={64} label="Install progress" />
          <div className="flex justify-end gap-2">
            <RetroButton size="sm">Cancel</RetroButton>
            <RetroButton size="sm" variant="primary">
              OK
            </RetroButton>
          </div>
        </div>
      </RetroWindow>
    </div>
  )
}

function MacCheck({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2">
      <span className="flex size-3.5 items-center justify-center border-2 border-black bg-white">
        <svg viewBox="0 0 10 10" className="size-2.5" aria-hidden="true">
          <path d="M1 1l8 8M9 1L1 9" stroke="#000" strokeWidth="1.5" />
        </svg>
      </span>
      {label}
    </p>
  )
}

export function MacPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      inert
      className={cn('border-2 border-black bg-white font-mono text-[12px] text-black shadow-[3px_3px_0_#000]', className)}
    >
      <div className="flex items-center gap-4 border-b-2 border-black px-2 py-0.5 font-semibold">
        <span className="size-3 rounded-full bg-black" />
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Special</span>
      </div>
      <div className={cn('p-4', macDither)}>
        <MacWindow title="Install Kit" bodyClassName="flex flex-col gap-3 p-3">
          <p>Copy 12 components to your project?</p>
          <MacCheck label="Include dark dither" />
          <div className="h-4 border-2 border-black p-px">
            <div className="h-full w-[60%] bg-black" />
          </div>
          <div className="flex justify-end gap-4 pr-1">
            <MacButton>Cancel</MacButton>
            <MacButton isDefault>OK</MacButton>
          </div>
        </MacWindow>
      </div>
    </div>
  )
}
