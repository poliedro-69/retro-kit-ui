import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rt-accent'

type RetroInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
}

export function RetroInput({ label, hint, className, id, ...props }: RetroInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        className={cn(
          'rt-sunken h-7 px-2 text-[13px] text-rt-ink placeholder:text-rt-shadow',
          'disabled:cursor-not-allowed disabled:bg-rt-face disabled:text-rt-shadow',
          focusRing,
          className,
        )}
        {...props}
      />
      {hint ? (
        <p id={`${inputId}-hint`} className="text-[12px] text-rt-shadow">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type RetroSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
}

export function RetroSelect({ label, className, id, children, ...props }: RetroSelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={selectId} className="font-medium">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'rt-sunken h-7 w-full cursor-pointer appearance-none pr-8 pl-2 text-[13px] text-rt-ink',
            'disabled:cursor-not-allowed disabled:bg-rt-face disabled:text-rt-shadow',
            focusRing,
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <span
          aria-hidden="true"
          className="rt-raised pointer-events-none absolute top-0.5 right-0.5 bottom-0.5 flex w-5.5 items-center justify-center"
        >
          <svg viewBox="0 0 8 8" className="size-2 fill-current">
            <path d="M0 2h8L4 7z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode
}

const toggleLabel =
  'flex cursor-pointer items-center gap-2 py-0.5 has-disabled:cursor-not-allowed has-disabled:text-rt-shadow'

export function RetroCheckbox({ label, className, ...props }: ToggleProps) {
  return (
    <label className={cn(toggleLabel, className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="rt-sunken flex size-4 shrink-0 items-center justify-center peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rt-accent peer-checked:[&_svg]:scale-100"
      >
        <svg
          viewBox="0 0 10 10"
          className="size-2.5 scale-0 fill-none stroke-rt-ink stroke-[1.8] transition-transform duration-100"
        >
          <path d="M1.5 5.2 4 7.7 8.5 2.5" strokeLinecap="square" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  )
}

export function RetroRadio({ label, className, ...props }: ToggleProps) {
  return (
    <label className={cn(toggleLabel, className)}>
      <input type="radio" className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="rt-sunken flex size-4 shrink-0 items-center justify-center rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rt-accent peer-checked:[&_i]:scale-100"
      >
        <i className="block size-1.75 scale-0 rounded-full bg-rt-ink transition-transform duration-100" />
      </span>
      <span>{label}</span>
    </label>
  )
}

export function RetroGroup({
  legend,
  children,
  className,
}: {
  legend: string
  children: ReactNode
  className?: string
}) {
  return (
    <fieldset
      className={cn(
        'rounded-[3px] border border-rt-shadow px-3 pt-1 pb-2.5 shadow-[1px_1px_0_#fff,inset_1px_1px_0_#fff]',
        className,
      )}
    >
      <legend className="px-1.5 text-[12px] font-semibold tracking-wide">{legend}</legend>
      {children}
    </fieldset>
  )
}
