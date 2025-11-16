import { TDocumento, TUsuario, TPessoa, TProcesso, TTipoDocumento, TVara, TAndamento, TAudiencia, TLocalizacaoFisica, TParte } from './types'

const API_BASE_URL = 'http://localhost:3000'

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
}

async function apiCall<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}

export const apiService = {
  health: {
    check: () => apiCall<string>('/'),
  },

  // Documento endpoints
  documento: {
    list: () => apiCall<TDocumento[]>('/documento/'),
    getById: (id: number) => apiCall<TDocumento>(`/documento/${id}`),
    create: (data: Partial<TDocumento>) => apiCall<TDocumento>('/documento/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TDocumento>) => apiCall<TDocumento>(`/documento/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/documento/${id}`, { method: 'DELETE' }),
  },

  // Usuario endpoints
  usuario: {
    list: () => apiCall<TUsuario[]>('/usuario/'),
    getById: (id: number) => apiCall<TUsuario>(`/usuario/${id}`),
    create: (data: Partial<TUsuario>) => apiCall<TUsuario>('/usuario/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TUsuario>) => apiCall<TUsuario>(`/usuario/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/usuario/${id}`, { method: 'DELETE' }),
  },

  // Processo endpoints
  processo: {
    list: () => apiCall<TProcesso[]>('/processo/'),
    getById: (id: number) => apiCall<TProcesso>(`/processo/${id}`),
    create: (data: Partial<TProcesso>) => apiCall<TProcesso>('/processo/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TProcesso>) => apiCall<TProcesso>(`/processo/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/processo/${id}`, { method: 'DELETE' }),
  },

  pessoa: {
    list: () => apiCall<TPessoa[]>('/pessoa/'),
    getById: (id: number) => apiCall<TPessoa>(`/pessoa/${id}`),
    create: (data: Partial<TPessoa>) => apiCall<TPessoa>('/pessoa/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TPessoa>) => apiCall<TPessoa>(`/pessoa/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/pessoa/${id}`, { method: 'DELETE' }),
  },

  tipoDocumento: {
    list: () => apiCall<TTipoDocumento[]>('/tipo-documento/'),
    getById: (id: number) => apiCall<TTipoDocumento>(`/tipo-documento/${id}`),
    create: (data: Partial<TTipoDocumento>) => apiCall<TTipoDocumento>('/tipo-documento/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TTipoDocumento>) => apiCall<TTipoDocumento>(`/tipo-documento/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/tipo-documento/${id}`, { method: 'DELETE' }),
  },

  vara: {
    list: () => apiCall<TVara[]>('/vara/'),
    getById: (id: number) => apiCall<TVara>(`/vara/${id}`),
    create: (data: Partial<TVara>) => apiCall<TVara>('/vara/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TVara>) => apiCall<TVara>(`/vara/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/vara/${id}`, { method: 'DELETE' }),
  },

  andamento: {
    list: () => apiCall<TAndamento[]>('/andamento/'),
    getById: (id: number) => apiCall<TAndamento>(`/andamento/${id}`),
    create: (data: Partial<TAndamento>) => apiCall<TAndamento>('/andamento/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TAndamento>) => apiCall<TAndamento>(`/andamento/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/andamento/${id}`, { method: 'DELETE' }),
  },

  audiencia: {
    list: () => apiCall<TAudiencia[]>('/audiencia/'),
    getById: (id: number) => apiCall<TAudiencia>(`/audiencia/${id}`),
    create: (data: Partial<TAudiencia>) => apiCall<TAudiencia>('/audiencia/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TAudiencia>) => apiCall<TAudiencia>(`/audiencia/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/audiencia/${id}`, { method: 'DELETE' }),
  },

  localizacaoFisica: {
    list: () => apiCall<TLocalizacaoFisica[]>('/localizacao-fisica/'),
    getById: (id: number) => apiCall<TLocalizacaoFisica>(`/localizacao-fisica/${id}`),
    create: (data: Partial<TLocalizacaoFisica>) => apiCall<TLocalizacaoFisica>('/localizacao-fisica/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TLocalizacaoFisica>) => apiCall<TLocalizacaoFisica>(`/localizacao-fisica/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/localizacao-fisica/${id}`, { method: 'DELETE' }),
  },

  parte: {
    list: () => apiCall<TParte[]>('/parte/'),
    getById: (id: number) => apiCall<TParte>(`/parte/${id}`),
    create: (data: Partial<TParte>) => apiCall<TParte>('/parte/', { method: 'POST', body: data }),
    update: (id: number, data: Partial<TParte>) => apiCall<TParte>(`/parte/${id}`, { method: 'PUT', body: data }),
    delete: (id: number) => apiCall(`/parte/${id}`, { method: 'DELETE' }),
  },
}
