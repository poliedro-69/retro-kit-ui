import { cn } from '@/lib/utils'

export type RetroBreadcrumbItem = {
  label: string
  href?: string
}

type RetroBreadcrumbProps = {
  items: RetroBreadcrumbItem[]
  label?: string
  className?: string
}

export function RetroBreadcrumb({ items, label = 'Breadcrumb', className }: RetroBreadcrumbProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-rt-ink">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={cn(isLast && 'font-semibold')}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="underline underline-offset-2 hover:text-rt-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rt-accent"
                >
                  {item.label}
                </a>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="font-rt-mono text-rt-shadow">
                  {'\\'}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
