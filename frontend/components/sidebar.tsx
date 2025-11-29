'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FileText, Users, Briefcase, Home, User, Scale, Layers, Clock, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/audiencia', label: 'Audiências', icon: BarChart3 },
  { href: '/processos', label: 'Processos', icon: Briefcase },
  { href: '/documentos', label: 'Documentos', icon: FileText },
  { href: '/andamento', label: 'Andamentos', icon: Clock },
  { href: '/parte', label: 'Partes', icon: Users },
  { href: '/varas', label: 'Varas', icon: Scale },
  { href: '/pessoas', label: 'Pessoas', icon: User }
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [hasToken, setHasToken] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      setHasToken(false)
      setUser(null)
      router.replace('/login')
    } else {
      setHasToken(true)
      const uStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      setUser(uStr ? JSON.parse(uStr) : null)
    }
  }, [router])

  if (pathname === '/login') return null

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6 sticky top-0 bg-sidebar flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-foreground">Jurídico</h1>
          <p className="text-sm text-sidebar-foreground/60 mt-1">Gestão de Processos</p>
        </div>
        <Link
          href="/perfil"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <User className="w-5 h-5" />
          <span>{user?.nome || 'Perfil'}</span>
        </Link>
      </div>

      <nav className="space-y-2 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')

          return (
            <div key={item.href}>
              <Link
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


            </div>
          )
        })}
      </nav>
    </aside>
  )
}
