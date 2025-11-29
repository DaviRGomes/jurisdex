'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'numero_processo', label: 'Número' },
  { key: 'data_abertura', label: 'Data Abertura' },
  { key: 'situacao', label: 'Situação' },
]

const formFields = [
  { name: 'data_abertura', label: 'Data de Abertura', type: 'date' as const, required: true },
  { name: 'situacao', label: 'Situação', type: 'text' as const, required: true },
  { name: 'data_criacao', label: 'Data de Criação', type: 'date' as const, required: true },
  { name: 'data_atualizacao', label: 'Data de Atualização', type: 'date' as const, required: true },
]

function generateNumeroProcesso() {
  const now = new Date()
  const seq = String(Math.floor(Math.random() * 10_000_000)).padStart(7, '0')
  const dv = String(Math.floor(Math.random() * 90) + 10)
  const year = now.getFullYear()
  return `${seq}-${dv}.${year}.8.26.0100`
}

export default function ProcessosPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Processos"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.processo.list()
          } catch (error) {
            console.error('Erro ao buscar processos:', error)
            return []
          }
        }}
        onCreate={(data) => {
          const today = new Date().toISOString().slice(0, 10)
          return apiService.processo.create({
            ...data,
            numero_processo: generateNumeroProcesso(),
            situacao: data.situacao || 'EM_ANDAMENTO',
            data_criacao: data.data_criacao || today,
            data_atualizacao: data.data_atualizacao || today,
          })
        }}
        onUpdate={(id, data) => apiService.processo.update(id, data)}
        onDelete={(id) => apiService.processo.delete(id)}
      />
    </div>
  )
}
