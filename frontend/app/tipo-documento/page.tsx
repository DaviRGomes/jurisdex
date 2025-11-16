'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
]

const formFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
]

export default function TipoDocumentoPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Tipos de Documento"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.tipoDocumento.list()
          } catch (error) {
            console.error('Erro ao buscar tipos de documento:', error)
            return []
          }
        }}
        onCreate={(data) => apiService.tipoDocumento.create(data)}
        onUpdate={(id, data) => apiService.tipoDocumento.update(id, data)}
        onDelete={(id) => apiService.tipoDocumento.delete(id)}
      />
    </div>
  )
}
