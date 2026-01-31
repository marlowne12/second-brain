'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Overview', icon: '🏠' },
  { href: '/daily', label: 'Daily Notes', icon: '📅' },
  { href: '/concepts', label: 'Concepts', icon: '💡' },
  { href: '/projects', label: 'Projects', icon: '📁' },
  { href: '/insights', label: 'Insights', icon: '✨' },
  { href: '/tags', label: 'Tags', icon: '🏷️' },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <span className="font-semibold text-text-primary">Second Brain</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                    transition-colors duration-150
                    ${isActive 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-tertiary">
          Built by Max 🤖
        </div>
      </div>
    </aside>
  )
}
