'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'documento', label: 'Documento' },
  { key: 'contato', label: 'Contato' },
]

const formFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
  { name: 'documento', label: 'Documento', type: 'text' as const, required: true },
  { name: 'contato', label: 'Contato', type: 'text' as const, required: true },
]

export default function PessoasPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Pessoas"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.pessoa.list()
          } catch (error) {
            console.error('Erro ao buscar pessoas:', error)
            return []
          }
        }}
        onCreate={(data) => apiService.pessoa.create(data)}
        onUpdate={(id, data) => apiService.pessoa.update(id, data)}
        onDelete={(id) => apiService.pessoa.delete(id)}
      />
    </div>
  )
}
