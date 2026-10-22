import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MacInputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string }

export function MacInput({ label, className, id, ...props }: MacInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className="flex flex-col gap-1 font-mono text-[12px] text-black">
      {label ? (
        <label htmlFor={inputId} className="font-semibold">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-6 border-2 border-black bg-white px-1.5 text-[12px] text-black placeholder:text-neutral-500',
          'disabled:border-dashed disabled:text-neutral-500',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
          className,
        )}
        {...props}
      />
    </div>
  )
}

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode }

const toggleLabel =
  'flex cursor-pointer items-center gap-2 py-0.5 font-mono text-[12px] text-black has-disabled:cursor-not-allowed has-disabled:text-neutral-500'

const toggleBox =
  'flex size-3.5 shrink-0 items-center justify-center border-2 border-black bg-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black peer-disabled:border-dashed'

export function MacCheckbox({ label, className, ...props }: ToggleProps) {
  return (
    <label className={cn(toggleLabel, className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span aria-hidden="true" className={cn(toggleBox, 'peer-checked:[&_svg]:scale-100')}>
        <svg viewBox="0 0 10 10" className="size-2.5 scale-0">
          <path d="M1 1l8 8M9 1L1 9" stroke="#000" strokeWidth="1.5" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  )
}

export function MacRadio({ label, className, ...props }: ToggleProps) {
  return (
    <label className={cn(toggleLabel, className)}>
      <input type="radio" className="peer sr-only" {...props} />
      <span aria-hidden="true" className={cn(toggleBox, 'rounded-full peer-checked:[&_i]:scale-100')}>
        <i className="block size-1.5 scale-0 rounded-full bg-black" />
      </span>
      <span>{label}</span>
    </label>
  )
}

export function MacGroup({
  legend,
  children,
  className,
}: {
  legend: string
  children: ReactNode
  className?: string
}) {
  return (
    <fieldset className={cn('border-2 border-black px-3 pt-1 pb-2 font-mono text-[12px] text-black', className)}>
      <legend className="bg-white px-1.5 font-semibold">{legend}</legend>
      {children}
    </fieldset>
  )
}
