'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'id_processo', label: 'ID Processo' },
  { key: 'data', label: 'Data' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'resultado', label: 'Resultado' },
  { key: 'id_juiz', label: 'ID Juiz' },
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

function useJuizOptions() {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const usuarios = await apiService.usuario.list()
        const juizes = usuarios.filter((u: any) => String(u.papel_sistema).toUpperCase() === 'JUIZ')
        setOptions(juizes.map((u: any) => ({ value: String(u.id), label: u.nome || u.email })))
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

export default function AudienciasPage() {
  const processOptions = useProcessOptions()
  const juizOptions = useJuizOptions()
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Audiências"
        columns={columns}
        formFields={[
          { name: 'id_processo', label: 'Processo', type: 'select' as const, required: true, options: processOptions },
          { name: 'data', label: 'Data', type: 'date' as const, required: true },
          { name: 'tipo', label: 'Tipo', type: 'text' as const, required: true },
          { name: 'resultado', label: 'Resultado (opcional)', type: 'text' as const, required: false },
          { name: 'id_juiz', label: 'Juiz (opcional)', type: 'select' as const, required: false, options: juizOptions },
        ]}
        fetchData={async () => {
          try {
            return await apiService.audiencia.list()
          } catch (error) {
            console.error('Erro ao buscar audiências:', error)
            return []
          }
        }}
        onCreate={(data) =>
          apiService.audiencia.create({
            ...data,
            id_processo: Number(data.id_processo),
            id_juiz: data.id_juiz ? Number(data.id_juiz) : undefined,
          })
        }
        onUpdate={(id, data) =>
          apiService.audiencia.update(id, {
            ...data,
            id_processo: Number(data.id_processo),
            id_juiz: data.id_juiz ? Number(data.id_juiz) : undefined,
          })
        }
        onDelete={(id) => apiService.audiencia.delete(id)}
      />
    </div>
  )
}
