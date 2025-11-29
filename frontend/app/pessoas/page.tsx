'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'documento', label: 'Documento' },
  { key: 'contato', label: 'Contato' },
]

const PAPEL_PESSOA_OPTIONS = [
  { value: '10', label: 'Réu' },
  { value: '11', label: 'Vítima' },
  { value: '12', label: 'Testemunha' },
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

export default function PessoasPage() {
  const processOptions = useProcessOptions()
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Pessoas"
        columns={columns}
        formFields={[
          { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
          { name: 'documento', label: 'Documento', type: 'text' as const, required: true },
          { name: 'contato', label: 'Contato', type: 'text' as const, required: true },
          { name: 'id_processo', label: 'Processo (opcional)', type: 'select' as const, required: false, options: processOptions },
          { name: 'id_papel', label: 'Papel (opcional)', type: 'select' as const, required: false, options: PAPEL_PESSOA_OPTIONS },
        ]}
        fetchData={async () => {
          try {
            const data = await apiService.pessoa.list()
            return data
          } catch (error) {
            console.error('Erro ao buscar pessoas:', error)
            return []
          }
        }}
        onCreate={async (data) => {
          const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
          const user = userStr ? JSON.parse(userStr) : {}
          

          const created = await apiService.pessoa.create({
            nome: data.nome,
            documento: data.documento,
            contato: data.contato,
          })

          if (data.id_processo && data.id_papel) {
            const id_processo = Number(data.id_processo)
            const id_papel = Number(data.id_papel)
            await apiService.pessoa.addParte(created.id, {
              id_processo,
              id_papel,
              criado_por: user?.email,
            })
          }
        } }
        onUpdate={(id, data) => apiService.pessoa.update(id, data)}
        onDelete={(id) => apiService.pessoa.delete(id)}
      />
    </div>
  )
}
