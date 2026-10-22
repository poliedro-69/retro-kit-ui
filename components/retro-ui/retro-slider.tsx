'use client'

import { useId, useState } from 'react'
import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type RetroSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  showValue?: boolean
}

export function RetroSlider({
  label,
  showValue = true,
  min = 0,
  max = 100,
  value,
  defaultValue,
  onChange,
  className,
  id,
  ...props
}: RetroSliderProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [internal, setInternal] = useState(Number(defaultValue ?? min))
  const current = value !== undefined ? Number(value) : internal
  const range = Number(max) - Number(min)
  const fill = range > 0 ? ((current - Number(min)) / range) * 100 : 0

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInternal(Number(event.target.value))
    onChange?.(event)
  }

  return (
    <div className="flex flex-col gap-1">
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-3">
          {label ? (
            <label htmlFor={inputId} className="font-medium">
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <output htmlFor={inputId} className="font-mono text-[12px] text-rt-ink">
              {current}
            </output>
          ) : null}
        </div>
      ) : null}
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        {...(value !== undefined ? { value } : { defaultValue: defaultValue ?? min })}
        onChange={handleChange}
        style={{ '--rt-fill': `${fill}%` } as CSSProperties}
        className={cn('rt-range w-full', className)}
        {...props}
      />
    </div>
  )
}
