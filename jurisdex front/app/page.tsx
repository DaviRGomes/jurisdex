'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, FileText, Users, AlertCircle, CheckCircle } from 'lucide-react'
import { apiService } from '@/lib/api-service'

export default function Dashboard() {
  const [processoCount, setProcessoCount] = useState(0)
  const [documentoCount, setDocumentoCount] = useState(0)
  const [usuarioCount, setUsuarioCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      try {
        await apiService.health.check()
        setApiStatus('online')
      } catch {
        setApiStatus('offline')
      }

      const [processos, documentos, usuarios] = await Promise.all([
        apiService.processo.list(),
        apiService.documento.list(),
        apiService.usuario.list(),
      ])

      setProcessoCount(processos.length)
      setDocumentoCount(documentos.length)
      setUsuarioCount(usuarios.length)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { title: 'Total Processos', value: processoCount, icon: Briefcase },
    { title: 'Total Documentos', value: documentoCount, icon: FileText },
    { title: 'Total Usuários', value: usuarioCount, icon: Users },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo ao sistema de gestão de processos</p>
        </div>
        
        <div className="flex items-center gap-2">
          {apiStatus === 'online' ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-500 font-medium">API Online</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-500 font-medium">API Offline</span>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
