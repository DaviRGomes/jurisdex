// TypeScript type definitions for all 11 resources

export interface TDocumento {
  id: number
  nome: string
  tipo: string
  url_arquivo: string
  id_processo?: number
  data_criacao?: string
}

export interface TUsuario {
  id: number
  nome: string
  email: string
  senha?: string
  papel_sistema: string
  data_criacao?: string
}

export interface TPessoa {
  id: number
  nome: string
  documento: string
  contato: string
  data_criacao?: string
}

export interface TProcesso {
  id: number
  numero_processo: string
  data_abertura: string
  situacao: string
  data_criacao: string
  data_atualizacao: string
  id_vara?: number
}

export interface TTipoDocumento {
  id: number
  nome: string
  data_criacao?: string
}

export interface TVara {
  id: number
  nome: string
  localizacao: string
  data_criacao?: string
}

export interface TAndamento {
  id: number
  id_processo: number
  numero_processo?: string
  data_registro: string
  descricao: string
  tipo_andamento: string
  data_criacao?: string
}

export interface TAudiencia {
  id: number
  id_processo: number
  data: string
  tipo: string
  resultado?: string
  id_juiz?: number
  data_criacao?: string
}

export interface TLocalizacaoFisica {
  id: number
  id_processo: number
  sala: string
  estante: string
  caixa: string
}

export interface TParte {
  id: number
  id_processo: number
  numero_processo?: string
  id_usuario?: number
  id_pessoa?: number
  id_papel: number
  data_criacao?: string
  criado_por?: string
}

export interface TPapel {
  id: number
  nome: string
}
