'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Edit2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataGridDetail } from '@/components/data-grid-detail'
import { FormModal } from '@/components/form-modal'
import { apiService } from '@/lib/api-service'
import { TProcesso, TAndamento, TAudiencia, TParte, TLocalizacaoFisica, TDocumento } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

export default function ProcessoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const processoId = Number(params.id)

  const [processo, setProcesso] = useState<TProcesso | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    loadProcessoDetail()
  }, [processoId])

  const loadProcessoDetail = async () => {
    try {
      setLoading(true)
      const data = await apiService.processo.getById(processoId)
      setProcesso(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar processo',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditProcesso = async (formData: any) => {
    try {
      await apiService.processo.update(processoId, formData)
      await loadProcessoDetail()
      setIsEditModalOpen(false)
      toast({
        title: 'Sucesso',
        description: 'Processo atualizado com sucesso',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar processo',
        variant: 'destructive',
      })
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>
  if (!processo) return <div className="p-8">Processo não encontrado</div>

  const processoFormFields = [
    { name: 'numero_processo', label: 'Número do Processo', type: 'text' as const, required: true },
    { name: 'data_abertura', label: 'Data de Abertura', type: 'date' as const, required: true },
    { name: 'situacao', label: 'Situação', type: 'text' as const, required: true },
    { name: 'data_criacao', label: 'Data de Criação', type: 'date' as const, required: true },
    { name: 'data_atualizacao', label: 'Data de Atualização', type: 'date' as const, required: true },
  ]

  const andamentoFormFields = [
    { name: 'data_registro', label: 'Data de Registro', type: 'date' as const, required: true },
    { name: 'descricao', label: 'Descrição', type: 'text' as const, required: true },
    { name: 'tipo_andamento', label: 'Tipo de Andamento', type: 'text' as const, required: true },
  ]

  const audienciaFormFields = [
    { name: 'data', label: 'Data', type: 'date' as const, required: true },
    { name: 'tipo', label: 'Tipo', type: 'text' as const, required: true },
    { name: 'resultado', label: 'Resultado', type: 'text' as const, required: false },
    { name: 'id_juiz', label: 'ID do Juiz', type: 'number' as const, required: false },
  ]

  const parteFormFields = [
    { name: 'id_papel', label: 'ID do Papel', type: 'number' as const, required: true },
    { name: 'id_usuario', label: 'ID do Usuário (ou deixe em branco)', type: 'number' as const, required: false },
    { name: 'id_pessoa', label: 'ID da Pessoa (ou deixe em branco)', type: 'number' as const, required: false },
  ]

  const localizacaoFormFields = [
    { name: 'sala', label: 'Sala', type: 'text' as const, required: true },
    { name: 'estante', label: 'Estante', type: 'text' as const, required: true },
    { name: 'caixa', label: 'Caixa', type: 'text' as const, required: true },
  ]

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Processo #{processo.numero_processo}</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Visão Geral</CardTitle>
          <Button size="sm" onClick={() => setIsEditModalOpen(true)} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Editar Processo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Número</p>
              <p className="text-lg font-semibold">{processo.numero_processo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Situação</p>
              <p className="text-lg font-semibold">{processo.situacao}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Abertura</p>
              <p className="text-lg font-semibold">{new Date(processo.data_abertura).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Última Atualização</p>
              <p className="text-lg font-semibold">{new Date(processo.data_atualizacao).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="andamentos" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="andamentos">Andamentos</TabsTrigger>
          <TabsTrigger value="partes">Partes</TabsTrigger>
          <TabsTrigger value="audiencias">Audiências</TabsTrigger>
          <TabsTrigger value="localizacao">Localização</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="andamentos" className="space-y-4">
          <DataGridDetail
            title="Andamentos"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'data_registro', label: 'Data' },
              { key: 'descricao', label: 'Descrição' },
              { key: 'tipo_andamento', label: 'Tipo' },
            ]}
            hideIdColumn={true}
            formFields={andamentoFormFields}
            fetchData={async () => {
              const andamentos = await apiService.andamento.list()
              return andamentos.filter(a => a.id_processo === processoId)
            }}
            onCreate={async (data) => {
              return apiService.andamento.create({ ...data, id_processo: processoId })
            }}
            onUpdate={(id, data) => apiService.andamento.update(id, { ...data, id_processo: processoId })}
            onDelete={(id) => apiService.andamento.delete(id)}
          />
        </TabsContent>

        <TabsContent value="partes" className="space-y-4">
          <DataGridDetail
            title="Partes"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'id_usuario', label: 'ID Usuário' },
              { key: 'id_pessoa', label: 'ID Pessoa' },
              { key: 'id_papel', label: 'ID Papel' },
            ]}
            hideIdColumn={true}
            formFields={parteFormFields}
            fetchData={async () => {
              const partes = await apiService.parte.list()
              return partes.filter(p => p.id_processo === processoId)
            }}
            onCreate={async (data) => {
              return apiService.parte.create({ ...data, id_processo: processoId })
            }}
            onUpdate={(id, data) => apiService.parte.update(id, { ...data, id_processo: processoId })}
            onDelete={(id) => apiService.parte.delete(id)}
          />
        </TabsContent>

        <TabsContent value="audiencias" className="space-y-4">
          <DataGridDetail
            title="Audiências"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'data', label: 'Data' },
              { key: 'tipo', label: 'Tipo' },
              { key: 'resultado', label: 'Resultado' },
            ]}
            hideIdColumn={true}
            formFields={audienciaFormFields}
            fetchData={async () => {
              const audiencias = await apiService.audiencia.list()
              return audiencias.filter(a => a.id_processo === processoId)
            }}
            onCreate={async (data) => {
              return apiService.audiencia.create({ ...data, id_processo: processoId })
            }}
            onUpdate={(id, data) => apiService.audiencia.update(id, { ...data, id_processo: processoId })}
            onDelete={(id) => apiService.audiencia.delete(id)}
          />
        </TabsContent>

        <TabsContent value="localizacao" className="space-y-4">
          <DataGridDetail
            title="Localização Física"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'sala', label: 'Sala' },
              { key: 'estante', label: 'Estante' },
              { key: 'caixa', label: 'Caixa' },
            ]}
            hideIdColumn={true}
            formFields={localizacaoFormFields}
            fetchData={async () => {
              const localizacoes = await apiService.localizacaoFisica.list()
              return localizacoes.filter(l => l.id_processo === processoId)
            }}
            onCreate={async (data) => {
              return apiService.localizacaoFisica.create({ ...data, id_processo: processoId })
            }}
            onUpdate={(id, data) => apiService.localizacaoFisica.update(id, { ...data, id_processo: processoId })}
            onDelete={(id) => apiService.localizacaoFisica.delete(id)}
          />
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Vinculados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {/* Simple list of documents for this process */}
                <div className="text-center py-8 text-muted-foreground">
                  Documentos associados aparecem aqui
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProcesso}
        fields={processoFormFields}
        initialData={processo}
        title="Editar Processo"
      />
    </div>
  )
}
