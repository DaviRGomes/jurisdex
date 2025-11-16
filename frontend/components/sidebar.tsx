'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Users, Briefcase, Home, User, Scale, Layers, Clock, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/processos', label: 'Processos', icon: Briefcase },
  { href: '/documentos', label: 'Documentos', icon: FileText },
  { href: '/usuarios', label: 'Usuários', icon: Users },
  { href: '/pessoas', label: 'Pessoas', icon: User },
  { href: '/varas', label: 'Varas', icon: Scale },
  { href: '/tipo-documento', label: 'Tipo Documento', icon: Layers },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6 sticky top-0 bg-sidebar">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Jurídico</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Gestão de Processos</p>
      </div>

      <nav className="space-y-2 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
