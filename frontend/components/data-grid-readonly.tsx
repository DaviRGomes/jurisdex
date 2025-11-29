'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'

interface DataGridReadOnlyProps {
  title: string
  columns: Array<{ key: string; label: string }>
  fetchData: () => Promise<any[]>
  hideIdColumn?: boolean
}

export function DataGridReadOnly({ title, columns, fetchData, hideIdColumn = false }: DataGridReadOnlyProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [fetchData])

  const loadData = async () => {
    try {
      setLoading(true)
      const result = await fetchData()
      setData(result)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao carregar dados', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const displayColumns = hideIdColumn ? columns.filter(c => c.key !== 'id') : columns

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
                  {displayColumns.map((col) => (
                    <TableHead key={col.key}>{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    {displayColumns.map((col) => (
                      <TableCell key={col.key}>{item[col.key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

