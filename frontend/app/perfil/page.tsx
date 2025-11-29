'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { apiService } from '@/lib/api-service'
import type { TUsuario } from '@/lib/types'

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<TUsuario | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      router.replace('/login')
      return
    }
    const uStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    setUser(uStr ? JSON.parse(uStr) : null)
  }, [router])

  const handleLogout = () => {
    apiService.auth.logout()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    } else {
      router.replace('/login')
    }
  }

  if (!user) return null

  const initials =
    user.nome?.trim()
      .split(' ')
      .map(n => n[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || user.email?.slice(0, 2)?.toUpperCase() || 'US'

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.nome}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Dados da sua conta</CardDescription>
          </div>
          <Badge>{user.papel_sistema}</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Nome</p>
            <p className="text-lg font-semibold">{user.nome}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">E-mail</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Papel</p>
            <p className="text-lg font-semibold">{user.papel_sistema}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}