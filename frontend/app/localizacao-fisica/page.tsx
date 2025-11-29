'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'id_processo', label: 'ID Processo' },
  { key: 'sala', label: 'Sala' },
  { key: 'estante', label: 'Estante' },
  { key: 'caixa', label: 'Caixa' },
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

export default function LocalizacaoFisicaPage() {
  const processOptions = useProcessOptions()
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Localização Física"
        columns={columns}
        formFields={[
          { name: 'id_processo', label: 'Processo', type: 'select' as const, required: true, options: processOptions },
          { name: 'sala', label: 'Sala', type: 'text' as const, required: true },
          { name: 'estante', label: 'Estante', type: 'text' as const, required: true },
          { name: 'caixa', label: 'Caixa', type: 'text' as const, required: true },
        ]}
        fetchData={async () => {
          try {
            return await apiService.localizacaoFisica.list()
          } catch (error) {
            console.error('Erro ao buscar localizações:', error)
            return []
          }
        }}
        onCreate={(data) =>
          apiService.localizacaoFisica.create({
            ...data,
            id_processo: Number(data.id_processo),
          })
        }
        onUpdate={(id, data) =>
          apiService.localizacaoFisica.update(id, {
            ...data,
            id_processo: Number(data.id_processo),
          })
        }
        onDelete={(id) => apiService.localizacaoFisica.delete(id)}
      />
    </div>
  )
}
