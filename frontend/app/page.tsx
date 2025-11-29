'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, FileText, Users, AlertCircle, CheckCircle } from 'lucide-react'
// Supondo que apiService esteja configurado corretamente
import { apiService } from '@/lib/api-service' 

// Interface para tipagem dos dados de contagem
interface DashboardStats {
  procLen: number;
  docLen: number;
  usrLen: number;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  
  // Estado para armazenar os dados da API
  const [counts, setCounts] = useState<DashboardStats>({
    procLen: 0,
    docLen: 0,
    usrLen: 0,
  })

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      loadDashboardData()
    } else {
      setLoading(false)
    }
    const handler = () => {
      const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      if (t) loadDashboardData()
    }
    if (typeof window !== 'undefined') window.addEventListener('app:refresh', handler)
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('app:refresh', handler)
    }
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Chamada paralela às APIs
      const [procCountResp, documentos, usuarios] = await Promise.all([
        // Supondo que apiService.processo.count() retorna um objeto { count: number }
        apiService.processo.count(), 
        // Supondo que apiService.documento.list() retorna um array
        apiService.documento.list(),
        // Supondo que apiService.pessoa.list() retorna um array
        apiService.pessoa.list(),
      ])

      const newProcLen = procCountResp.count 
      const newDocLen = documentos.length 
      const newUsrLen = usuarios.length 

      // Atualiza o estado com os dados carregados
      setCounts({
        procLen: newProcLen,
        docLen: newDocLen,
        usrLen: newUsrLen,
      })

    } catch (error) {
      console.error('Error loading dashboard:', error)
      // Opcional: Adicionar um estado de erro para exibir uma mensagem ao usuário
    } finally {
      setLoading(false)
    }
  }

  // Define as estatísticas usando os valores do estado `counts`
  const stats = [
    { title: 'Total Processos', value: counts.procLen, icon: Briefcase },
    { title: 'Total Documentos', value: counts.docLen, icon: FileText },
    { title: 'Total Pessoas', value: counts.usrLen, icon: Users },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo ao sistema de gestão de processos</p>
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
