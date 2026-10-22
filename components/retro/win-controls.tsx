import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type WinButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDefault?: boolean
}

export function WinButton({ isDefault, className, children, type = 'button', ...props }: WinButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'win-raised inline-flex min-h-6.5 items-center justify-center gap-1.5 px-3 font-win text-[13px] text-black',
        'active:win-pressed active:[&>span]:translate-x-px active:[&>span]:translate-y-px',
        'focus-visible:outline-1 focus-visible:-outline-offset-5 focus-visible:outline-dotted focus-visible:outline-black',
        'disabled:text-win-shadow disabled:[text-shadow:1px_1px_0_#fff]',
        isDefault && 'outline outline-2 outline-black -outline-offset-1',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}

type WinRadioProps = {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: (value: string) => void
}

export function WinRadio({ name, value, label, checked, onChange }: WinRadioProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-0.5 has-focus-visible:outline-1 has-focus-visible:outline-dotted has-focus-visible:outline-black">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="win-sunken flex h-3.25 w-3.25 shrink-0 items-center justify-center rounded-full bg-white"
      >
        {checked ? <span className="h-1.5 w-1.5 rounded-full bg-black" /> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

type WinCheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function WinCheckbox({ label, checked, onChange }: WinCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-0.5 has-focus-visible:outline-1 has-focus-visible:outline-dotted has-focus-visible:outline-black">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="win-sunken flex h-3.25 w-3.25 shrink-0 items-center justify-center bg-white text-[11px] leading-none font-bold"
      >
        {checked ? 'X' : ''}
      </span>
      <span>{label}</span>
    </label>
  )
}

type WinGroupProps = {
  legend: string
  children: React.ReactNode
  className?: string
}

export function WinGroup({ legend, children, className }: WinGroupProps) {
  return (
    <fieldset
      className={cn(
        'relative border border-win-shadow px-2.5 pt-3 pb-2 shadow-[1px_1px_0_#fff,inset_1px_1px_0_#fff]',
        className,
      )}
    >
      <legend className="bg-win-face px-1">{legend}</legend>
      {children}
    </fieldset>
  )
}
