'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'numero_processo', label: 'Nº Processo' },
  { key: 'id_usuario', label: 'ID Usuário' },
  { key: 'id_pessoa', label: 'ID Pessoa' },
  { key: 'papel', label: 'Papel' },
]

const PAPEL_OPTIONS = [
  { value: 1, label: 'Advogado' },
  { value: 2, label: 'Promotor' },
  { value: 3, label: 'Juiz' },
  { value: 4, label: 'Defensor Público' },
  { value: 10, label: 'Réu' },
  { value: 11, label: 'Vítima' },
  { value: 12, label: 'Testemunha' },
  { value: 13, label: 'Autor' },
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

function usePessoaOptions() {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const pessoas = await apiService.pessoa.list()
        setOptions(pessoas.map((ps: any) => ({ value: String(ps.id), label: ps.nome })))
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

function getLoggedUserId(): number | undefined {
  if (typeof window === 'undefined') return undefined
  const uStr = localStorage.getItem('user')
  try {
    const u = uStr ? JSON.parse(uStr) : null
    return u?.id ? Number(u.id) : undefined
  } catch {
    return undefined
  }
}

function getLoggedUserEmail(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const uStr = localStorage.getItem('user')
  try {
    const u = uStr ? JSON.parse(uStr) : null
    return u?.email || undefined
  } catch {
    return undefined
  }
}

function mapPapelLabel(id_papel: number) {
  const found = PAPEL_OPTIONS.find(p => p.value === id_papel)
  return found ? found.label : String(id_papel)
}

export default function PartesPage() {
  const processOptions = useProcessOptions()
  const pessoaOptions = usePessoaOptions()
  return (
    <div className="p-8">
      <DataGridCRUD
        title="Partes"
        columns={columns}
        formFields={[
          { name: 'id_processo', label: 'Processo', type: 'select' as const, required: true, options: processOptions },
          {
            name: 'id_papel',
            label: 'Papel',
            type: 'select' as const,
            required: true,
            options: PAPEL_OPTIONS.map(p => ({ value: String(p.value), label: p.label })),
          },
          { name: 'id_pessoa', label: 'Pessoa (opcional)', type: 'select' as const, required: false, options: pessoaOptions },
          { name: 'data_criacao', label: 'Data de Criação (opcional)', type: 'date' as const, required: false },
        ]}
        fetchData={async () => {
          try {
            const partes = await apiService.parte.list()
            return partes.map(p => ({ ...p, papel: mapPapelLabel(p.id_papel) }))
          } catch (error) {
            console.error('Erro ao buscar partes:', error)
            return []
          }
        }}
        onCreate={(data) => {
          const id_papel = Number(data.id_papel)
          const id_pessoa = data.id_pessoa ? Number(data.id_pessoa) : undefined
          if (id_pessoa && ![10, 11, 12].includes(id_papel)) {
            throw new Error('Para vincular Pessoa, o papel deve ser Réu, Vítima ou Testemunha')
          }
          const payload = {
            ...data,
            id_papel,
            id_processo: Number(data.id_processo),
            id_usuario: getLoggedUserId(),
            id_pessoa,
            criado_por: getLoggedUserEmail(),
          }
          return apiService.parte.create(payload)
        }}
        onUpdate={(id, data) => {
          const id_papel = Number(data.id_papel)
          const id_pessoa = data.id_pessoa ? Number(data.id_pessoa) : undefined
          if (id_pessoa && ![10, 11, 12].includes(id_papel)) {
            throw new Error('Para vincular Pessoa, o papel deve ser Réu, Vítima ou Testemunha')
          }
          const payload = {
            ...data,
            id_papel,
            id_processo: Number(data.id_processo),
            id_usuario: getLoggedUserId(),
            id_pessoa,
            criado_por: getLoggedUserEmail(),
          }
          return apiService.parte.update(id, payload)
        }}
        onDelete={(id) => apiService.parte.delete(id)}
      />
    </div>
  )
}
