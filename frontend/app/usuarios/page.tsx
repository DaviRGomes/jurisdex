'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { key: 'papel_sistema', label: 'Papel' },
]

const formFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'senha', label: 'Senha', type: 'password' as const, required: true },
  {
    name: 'papel_sistema',
    label: 'Papel do Sistema',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'ADVOGADO', label: 'Advogado' },
      { value: 'PROMOTOR', label: 'Promotor' },
      { value: 'JUIZ', label: 'Juiz' },
      { value: 'DEFENSOR_PUBLICO', label: 'Defensor Público' },
      { value: 'ADMIN', label: 'Administrador' },
    ],
  },
]

export default function UsuariosPage() {
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Usuários"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.usuario.list()
          } catch (error) {
            console.error('Erro ao buscar usuários:', error)
            return []
          }
        }}
        onCreate={(data) => apiService.usuario.create(data)}
        onUpdate={(id, data) => apiService.usuario.update(id, data)}
        onDelete={(id) => apiService.usuario.delete(id)}
      />
    </div>
  )
}
