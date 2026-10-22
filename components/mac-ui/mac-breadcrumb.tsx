import { cn } from '@/lib/utils'

export type MacBreadcrumbItem = {
  label: string
  href?: string
}

type MacBreadcrumbProps = {
  items: MacBreadcrumbItem[]
  label?: string
  className?: string
}

export function MacBreadcrumb({ items, label = 'Breadcrumb', className }: MacBreadcrumbProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center font-rt-mono text-[12px] text-mac-ink">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={cn(isLast && 'font-bold')}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="underline underline-offset-2 hover:bg-mac-ink hover:text-mac-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-ink"
                >
                  {item.label}
                </a>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="px-1">
                  :
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
