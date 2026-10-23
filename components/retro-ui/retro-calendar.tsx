'use client'

import { useMemo, useState } from 'react'
import { RetroButton } from './retro-button'
import { RetroSelect } from './retro-fields'

export type RetroCalendarProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  className?: string
  label?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function RetroCalendar({
  value,
  defaultValue = new Date(1993, 5, 15),
  onChange,
  minDate,
  maxDate,
  className = '',
  label = 'Calendar',
}: RetroCalendarProps) {
  const [selected, setSelected] = useState(value ?? defaultValue)
  const [month, setMonth] = useState(startOfMonth(value ?? defaultValue))
  const displayedValue = value ?? selected
  const days = useMemo(() => {
    const first = startOfMonth(month)
    const start = new Date(first)
    start.setDate(1 - first.getDay())
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start)
      day.setDate(start.getDate() + index)
      return day
    })
  }, [month])

  function selectDay(day: Date) {
    if (day.getMonth() !== month.getMonth() || (minDate && day < minDate) || (maxDate && day > maxDate)) return
    setSelected(day)
    onChange?.(day)
  }

  function shiftMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className={`rt-raised w-full max-w-xs p-2 text-rt-ink ${className}`}>
      <div className="mb-2 flex items-end gap-2">
        <RetroSelect label={label} value={month.getMonth()} onChange={(event) => setMonth(new Date(month.getFullYear(), Number(event.target.value), 1))}>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index}>{new Date(2000, index, 1).toLocaleDateString('en-US', { month: 'long' })}</option>
          ))}
        </RetroSelect>
        <RetroSelect aria-label="Year" value={month.getFullYear()} onChange={(event) => setMonth(new Date(Number(event.target.value), month.getMonth(), 1))}>
          {[1992, 1993, 1994, 1995, 1996].map((year) => <option key={year} value={year}>{year}</option>)}
        </RetroSelect>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <RetroButton size="sm" aria-label="Previous month" onClick={() => shiftMonth(-1)}>◀</RetroButton>
        <strong className="text-[13px] uppercase">{monthLabel}</strong>
        <RetroButton size="sm" aria-label="Next month" onClick={() => shiftMonth(1)}>▶</RetroButton>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold" aria-label={label}>
        {WEEKDAYS.map((day) => <span key={day} className="py-1">{day}</span>)}
        {days.map((day) => {
          const outside = day.getMonth() !== month.getMonth()
          const disabled = outside || (minDate && day < minDate) || (maxDate && day > maxDate)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              aria-label={day.toLocaleDateString('en-US', { dateStyle: 'long' })}
              aria-pressed={sameDay(day, displayedValue)}
              onClick={() => selectDay(day)}
              className={`min-h-7 border px-1 py-0.5 text-[12px] ${sameDay(day, displayedValue) ? 'rt-pressed bg-rt-navy text-white' : 'rt-raised'} ${outside ? 'opacity-35' : ''} disabled:cursor-not-allowed disabled:opacity-35`}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
      <div className="rt-sunken mt-2 bg-rt-paper px-2 py-1 text-center font-mono text-[11px]">
        Selected: {displayedValue.toLocaleDateString('en-US')}
      </div>
    </div>
  )
}
