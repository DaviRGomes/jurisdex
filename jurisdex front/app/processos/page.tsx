'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'numero_processo', label: 'Número' },
  { key: 'data_abertura', label: 'Data Abertura' },
  { key: 'situacao', label: 'Situação' },
]

const formFields = [
  { name: 'numero_processo', label: 'Número do Processo', type: 'text' as const, required: true },
  { name: 'data_abertura', label: 'Data de Abertura', type: 'date' as const, required: true },
  { name: 'situacao', label: 'Situação', type: 'text' as const, required: true },
  { name: 'data_criacao', label: 'Data de Criação', type: 'date' as const, required: true },
  { name: 'data_atualizacao', label: 'Data de Atualização', type: 'date' as const, required: true },
]

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
        onCreate={(data) => apiService.processo.create(data)}
        onUpdate={(id, data) => apiService.processo.update(id, data)}
        onDelete={(id) => apiService.processo.delete(id)}
      />
    </div>
  )
}
