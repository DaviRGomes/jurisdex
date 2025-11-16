'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'url_arquivo', label: 'URL' },
]

const formFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
  { name: 'tipo', label: 'Tipo', type: 'text' as const, required: true },
  { name: 'url_arquivo', label: 'URL do Arquivo', type: 'text' as const, required: true },
]

export default function DocumentosPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Documentos"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.documento.list()
          } catch (error) {
            console.error('Erro ao buscar documentos:', error)
            return []
          }
        }}
        onCreate={(data) => apiService.documento.create(data)}
        onUpdate={(id, data) => apiService.documento.update(id, data)}
        onDelete={(id) => apiService.documento.delete(id)}
      />
    </div>
  )
}
