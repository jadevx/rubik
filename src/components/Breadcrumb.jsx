import { Link } from 'react-router-dom'

/**
 * Breadcrumb de navegación.
 * @param {{items: Array<{label: string, to?: string}>}} props
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} className="transition hover:text-indigo-600">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-semibold text-slate-700' : ''}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-slate-300">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
