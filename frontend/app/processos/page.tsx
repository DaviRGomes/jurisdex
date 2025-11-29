'use client'

import { useState } from 'react'
import { DataGridCRUD } from '@/components/data-grid-crud'
import { apiService } from '@/lib/api-service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataGridReadOnly } from '@/components/data-grid-readonly'
import { useToast } from '@/hooks/use-toast'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'numero_processo', label: 'Número' },
  { key: 'data_abertura', label: 'Data Abertura' },
  { key: 'situacao', label: 'Situação' },
]

const formFields = [
  { name: 'data_abertura', label: 'Data de Abertura', type: 'date' as const, required: true },
  { name: 'situacao', label: 'Situação', type: 'text' as const, required: true },
  { name: 'data_criacao', label: 'Data de Criação', type: 'date' as const, required: true },
  { name: 'data_atualizacao', label: 'Data de Atualização', type: 'date' as const, required: true },
]

function generateNumeroProcesso() {
  const now = new Date()
  const seq = String(Math.floor(Math.random() * 10_000_000)).padStart(7, '0')
  const dv = String(Math.floor(Math.random() * 90) + 10)
  const year = now.getFullYear()
  return `${seq}-${dv}.${year}.8.26.0100`
}

export default function ProcessosPage() {
  const [numeroQuery, setNumeroQuery] = useState('')
  const [selectedProcesso, setSelectedProcesso] = useState<any | null>(null)
  const [searching, setSearching] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    try {
      setSearching(true)
      const processos = await apiService.processo.list()
      const found = processos.find(p => String(p.numero_processo).trim() === numeroQuery.trim())
      setSelectedProcesso(found || null)
      if (!found) {
        toast({ title: 'Não encontrado', description: 'Nenhum processo com este número' })
      }
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao buscar processos', variant: 'destructive' })
    } finally {
      setSearching(false)
    }
  }

  const processoId = selectedProcesso?.id

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Consulta por Número</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input placeholder="Digite o número do processo" value={numeroQuery} onChange={(e) => setNumeroQuery(e.target.value)} />
            </div>
            <Button onClick={handleSearch} disabled={searching || !numeroQuery.trim()}>Buscar</Button>
          </div>
          {selectedProcesso && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Número</p>
                      <p className="text-lg font-semibold">{selectedProcesso.numero_processo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Situação</p>
                      <p className="text-lg font-semibold">{selectedProcesso.situacao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Abertura</p>
                      <p className="text-lg font-semibold">{new Date(selectedProcesso.data_abertura).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Última Atualização</p>
                      <p className="text-lg font-semibold">{new Date(selectedProcesso.data_atualizacao).toLocaleDateString('pt-BR')}</p>
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
                  <DataGridReadOnly
                    title="Andamentos"
                    columns={[
                      { key: 'id', label: 'ID' },
                      { key: 'data_registro', label: 'Data' },
                      { key: 'descricao', label: 'Descrição' },
                      { key: 'tipo_andamento', label: 'Tipo' },
                    ]}
                    hideIdColumn={true}
                    fetchData={async () => {
                      const andamentos = await apiService.andamento.list()
                      return andamentos.filter(a => Number(a.id_processo) === Number(processoId))
                    }}
                  />
                </TabsContent>

                <TabsContent value="partes" className="space-y-4">
                  <DataGridReadOnly
                    title="Partes"
                    columns={[
                      { key: 'usuario_nome', label: 'Usuário' },
                      { key: 'pessoa_nome', label: 'Pessoa' },
                      { key: 'papel_nome', label: 'Papel' },
                    ]}
                    hideIdColumn={true}
                    fetchData={async () => {
                      const [partes, usuarios, pessoas] = await Promise.all([
                        apiService.parte.list(),
                        apiService.usuario.list(),
                        apiService.pessoa.list(),
                      ])
                      const papelMap: Record<number, string> = {
                        1: 'Advogado',
                        2: 'Promotor',
                        3: 'Juiz',
                        4: 'Defensor Público',
                      }
                      const byUserId = new Map(usuarios.map(u => [u.id, u]))
                      const byPessoaId = new Map(pessoas.map(p => [p.id, p]))
                      return partes
                        .filter(p => Number(p.id_processo) === Number(processoId))
                        .map(p => ({
                          ...p,
                          usuario_nome: p.id_usuario ? (byUserId.get(p.id_usuario)?.nome || String(p.id_usuario)) : '-',
                          pessoa_nome: p.id_pessoa ? (byPessoaId.get(p.id_pessoa)?.nome || String(p.id_pessoa)) : '-',
                          papel_nome: papelMap[p.id_papel] || String(p.id_papel),
                        }))
                    }}
                  />
                </TabsContent>

                <TabsContent value="audiencias" className="space-y-4">
                  <DataGridReadOnly
                    title="Audiências"
                    columns={[
                      { key: 'id', label: 'ID' },
                      { key: 'data', label: 'Data' },
                      { key: 'tipo', label: 'Tipo' },
                      { key: 'resultado', label: 'Resultado' },
                    ]}
                    hideIdColumn={true}
                    fetchData={async () => {
                      const audiencias = await apiService.audiencia.list()
                      return audiencias.filter(a => Number(a.id_processo) === Number(processoId))
                    }}
                  />
                </TabsContent>

                <TabsContent value="localizacao" className="space-y-4">
                  <DataGridReadOnly
                    title="Localização Física"
                    columns={[
                      { key: 'id', label: 'ID' },
                      { key: 'sala', label: 'Sala' },
                      { key: 'estante', label: 'Estante' },
                      { key: 'caixa', label: 'Caixa' },
                    ]}
                    hideIdColumn={true}
                    fetchData={async () => {
                      try {
                        const localizacoes = await apiService.localizacaoFisica.list()
                        return localizacoes.filter(l => Number(l.id_processo) === Number(processoId))
                      } catch (e) {
                        return []
                      }
                    }}
                  />
                </TabsContent>

                <TabsContent value="documentos" className="space-y-4">
                  <DataGridReadOnly
                    title="Documentos"
                    columns={[
                      { key: 'id', label: 'ID' },
                      { key: 'nome', label: 'Nome' },
                      { key: 'tipo', label: 'Tipo' },
                      { key: 'url_arquivo', label: 'Arquivo' },
                    ]}
                    hideIdColumn={true}
                    fetchData={async () => {
                      const documentos = await apiService.documento.list()
                      return documentos.filter(d => Number(d.id_processo) === Number(processoId))
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>

      <DataGridCRUD
        title="Processos"
        columns={columns}
        formFields={formFields}
        fetchData={async () => {
          try {
            return await apiService.processo.list()
          } catch (error) {
            return []
          }
        }}
        onCreate={(data) => {
          const today = new Date().toISOString().slice(0, 10)
          return apiService.processo.create({
            ...data,
            numero_processo: generateNumeroProcesso(),
            situacao: data.situacao || 'EM_ANDAMENTO',
            data_criacao: data.data_criacao || today,
            data_atualizacao: data.data_atualizacao || today,
          })
        }}
        onUpdate={(id, data) => apiService.processo.update(id, data)}
        onDelete={(id) => apiService.processo.delete(id)}
      />
    </div>
  )
}
