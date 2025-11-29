'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { FormModal } from './form-modal'
import { useToast } from '@/hooks/use-toast'

interface DataGridCRUDProps {
  title: string
  columns: Array<{ key: string; label: string }>
  fetchData: () => Promise<any[]>
  onCreate: (data: any) => Promise<any>
  onUpdate: (id: number, data: any) => Promise<any>
  onDelete: (id: number) => Promise<any>
  formFields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'password' | 'date' | 'select'
    required?: boolean
    options?: Array<{ value: string; label: string }>
  }>
}

export function DataGridCRUD({
  title,
  columns,
  fetchData,
  onCreate,
  onUpdate,
  onDelete,
  formFields,
}: DataGridCRUDProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handler = () => loadData()
    if (typeof window !== 'undefined') window.addEventListener('app:refresh', handler)
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('app:refresh', handler)
    }
  }, [])

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const user = userStr ? JSON.parse(userStr) : null
    const admin = String(user?.papel_sistema || '').toUpperCase() === 'ADMIN'
    setIsAdmin(admin)
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const result = await fetchData()
      setData(result)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      try {
        await onDelete(id)
        await loadData()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('app:refresh'))
        }
        toast({
          title: 'Sucesso',
          description: 'Item deletado com sucesso',
        })
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Falha ao deletar item',
          variant: 'destructive',
        })
      }
    }
  }

  const handleSave = async (formData: any) => {
    try {
      if (editingItem) {
        await onUpdate(editingItem.id, formData)
        setData((prev) => prev.map((it) => (it.id === editingItem.id ? { ...it, ...formData } : it)))
        toast({
          title: 'Sucesso',
          description: 'Item atualizado com sucesso',
        })
      } else {
        const created = await onCreate(formData)
        if (created && typeof created === 'object') {
          setData((prev) => [created, ...prev])
        }
        toast({
          title: 'Sucesso',
          description: 'Item criado com sucesso',
        })
      }
      setIsModalOpen(false)
      await loadData()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app:refresh'))
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Falha ao salvar',
        variant: 'destructive',
      })
    }
  }

  const isAllSelected = data.length > 0 && selectedIds.length === data.length

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((d) => d.id) : [])
  }

  const toggleOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) return prev.includes(id) ? prev : [...prev, id]
      return prev.filter((x) => x !== id)
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button onClick={handleAddNew} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Nenhum registro encontrado</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {isAdmin && (
                    <TableHead className="w-8">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={(v) => toggleAll(!!v)}
                      />
                    </TableHead>
                  )}
                  {columns.map((col) => (
                    <TableHead key={col.key}>{col.label}</TableHead>
                  ))}
                  <TableHead className="w-20">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    {isAdmin && (
                      <TableCell className="w-8">
                        <Checkbox
                          checked={selectedIds.includes(item.id)}
                          onCheckedChange={(v) => toggleOne(item.id, !!v)}
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.key}>{item[col.key]}</TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        fields={formFields}
        initialData={editingItem}
        title={editingItem ? `Editar ${title}` : `Novo ${title}`}
      />
    </Card>
  )
}
