'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'numero_processo', label: 'Nº Processo' },
  { key: 'data_registro', label: 'Data' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'tipo_andamento', label: 'Tipo' },
]

function useProcessOptions() {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const processos = await apiService.processo.list()
        setOptions(processos.map((p: any) => ({ value: String(p.id), label: p.numero_processo })))
      } catch {
        setOptions([])
      }
    }
    fetch()
    const handler = () => fetch()
    if (typeof window !== 'undefined') window.addEventListener('app:refresh', handler)
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('app:refresh', handler)
    }
  }, [])
  return options
}

export default function AndamentosPage() {
  const processOptions = useProcessOptions()
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Andamentos"
        columns={columns}
        formFields={[
          { name: 'id_processo', label: 'Processo', type: 'select' as const, required: true, options: processOptions },
          { name: 'data_registro', label: 'Data de Registro', type: 'date' as const, required: true },
          { name: 'descricao', label: 'Descrição', type: 'text' as const, required: true },
          { name: 'tipo_andamento', label: 'Tipo de Andamento', type: 'text' as const, required: true },
        ]}
        fetchData={async () => {
          try {
            return await apiService.andamento.list()
          } catch (error) {
            console.error('Erro ao buscar andamentos:', error)
            return []
          }
        }}
        onCreate={(data) =>
          apiService.andamento.create({
            ...data,
            id_processo: Number(data.id_processo),
          })
        }
        onUpdate={(id, data) =>
          apiService.andamento.update(id, {
            ...data,
            id_processo: Number(data.id_processo),
          })
        }
        onDelete={(id) => apiService.andamento.delete(id)}
      />
    </div>
  )
}
