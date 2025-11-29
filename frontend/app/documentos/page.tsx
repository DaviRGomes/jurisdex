'use client'

import { DataGridCRUD } from '@/components/data-grid-crud'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { apiService } from '@/lib/api-service'
import { useEffect, useState } from 'react'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'id_processo', label: 'ID Processo' },
  { key: 'nome', label: 'Nome' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'url_arquivo', label: 'URL' },
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

function useTipoDocumentoOptions() {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const tipos = await apiService.tipoDocumento.list()
        setOptions(tipos.map((t: any) => ({ value: String(t.id), label: t.nome })))
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

const tipoDocColumns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
]

const tipoDocFormFields = [
  { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
]

export default function DocumentosPage() {
  const processOptions = useProcessOptions()
  const tipoOptions = useTipoDocumentoOptions()
  return (
    <div className="p-8 space-y-6">
      <Tabs defaultValue="documentos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="tipos">Tipos de Documento</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos">
          <DataGridCRUD
            title="Documentos"
            columns={columns}
            formFields={[
              { name: 'id_processo', label: 'Processo', type: 'select' as const, required: true, options: processOptions },
              { name: 'nome', label: 'Nome', type: 'text' as const, required: true },
              (
                tipoOptions.length > 0
                  ? { name: 'tipo', label: 'Tipo', type: 'select' as const, required: true, options: tipoOptions }
                  : { name: 'tipo', label: 'Tipo', type: 'text' as const, required: true }
              ),
              { name: 'file', label: 'Arquivo', type: 'file' as const, required: true },
            ]}
            fetchData={async () => {
              try {
                return await apiService.documento.list()
              } catch (error) {
                console.error('Erro ao buscar documentos:', error)
                return []
              }
            }}
            onCreate={(data) => {
              const tipoNome = tipoOptions.length
                ? (tipoOptions.find((o) => o.value === String(Number(data.tipo)))?.label || '')
                : String(data.tipo)
              return apiService.documento.upload({ id_processo: Number(data.id_processo), nome: data.nome, tipo: tipoNome, file: data.file })
            }}
            onUpdate={(id, data) => {
              const tipoNome = tipoOptions.length
                ? (tipoOptions.find((o) => o.value === String(Number(data.tipo)))?.label || '')
                : String(data.tipo)
              return apiService.documento.update(id, { ...data, tipo: tipoNome })
            }}
            onDelete={(id) => apiService.documento.delete(id)}
          />
        </TabsContent>

        <TabsContent value="tipos">
          <DataGridCRUD
            title="Tipos de Documento"
            columns={tipoDocColumns}
            formFields={tipoDocFormFields}
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
