'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'localizacao', label: 'Localização' },
]

const formFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
  { name: 'localizacao', label: 'Localização', type: 'text' as const, required: true },
]

export default function VarasPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Varas"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.vara.list()
          } catch (error) {
            console.error('Erro ao buscar varas:', error)
            return []
          }
        }}
        onCreate={(data) => apiService.vara.create(data)}
        onUpdate={(id, data) => apiService.vara.update(id, data)}
        onDelete={(id) => apiService.vara.delete(id)}
      />
    </div>
  )
}
