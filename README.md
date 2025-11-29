# Jurisdex

## Ideia do Projeto
- Sistema web para gestão jurídica: processos, pessoas, partes, documentos, audiências, andamentos e localização física.
- Possui autenticação por JWT, perfis (ADMIN, ADVOGADO, PROMOTOR, JUIZ, DEFENSOR_PUBLICO) e regras de visibilidade por papel.
- Interface em Next.js com grids CRUD, uploads de documentos e combobox de lookups (Processos, Pessoas, Tipo de Documento, Juiz).

## Arquitetura
- Frontend: `Next.js 16` (porta `3001`) em `frontend/`
- Backend: `Node.js/Express` (porta `3000`) em `backend/`
- Banco: `PostgreSQL` em container (ou local via `pgAdmin`)
- Autenticação: JWT com middleware em todas as rotas (exceto login)

## Estrutura de Pastas (resumo)
- `frontend/app/*`: páginas (login, dashboard, processos, pessoas, partes, documentos, andamentos, audiência, varas, etc.)
- `frontend/components/*`: UI e `DataGridCRUD`
- `frontend/lib/api-service.ts`: cliente HTTP com token e helpers
- `backend/server.js`: boot do Express, CORS e rotas
- `backend/routes/*`, `backend/controller/*`, `backend/service/*`, `backend/repository/*`: camadas da API
- `backend/database/schema.sql`: criação de tabelas
- `backend/database/seed.sql`: dados iniciais
- `docker-compose.yml` + `.env`: orquestração e variáveis

## Requisitos
- Node.js 18+ (para backend) e 20+ (para frontend) se rodar local
- Docker Desktop (opcional, para docker-compose)
- PostgreSQL (via container ou instalação local)

## Variáveis de Ambiente (arquivo `.env` na raiz)
- `PORT=3000` — porta do backend
- `JWT_SECRET=dev-secret` — segredo do JWT
- `CORS_ORIGIN=http://localhost:3001` — origem permitida no CORS
- `DB_HOST=db` (ou `host.docker.internal` se usar Postgres local)
- `DB_PORT=5432`
- `DB_USER=jurisdex`, `DB_PASSWORD=jurisdex`, `DB_NAME=jurisdex`
- `NEXT_PUBLIC_API_URL=http://localhost:3000` — URL da API para o frontend

## Subir com Docker Compose
1. Ajuste `.env` conforme seu ambiente
2. Execute:
```
docker compose up -d
```
3. Acesse:
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`

Notas:
- O `schema.sql` e `seed.sql` são montados no Postgres apenas na primeira criação do volume.
- Se usar Postgres local em vez do container, defina `DB_HOST=host.docker.internal` e não suba o serviço `db`.

## Rodar Local (sem Docker)
### Backend
```
cd backend
npm install
npm run start
```
### Frontend
```
cd frontend
npm install
npm run dev
```
Certifique-se de que `.env` aponte para seu backend (`NEXT_PUBLIC_API_URL`).

## Login e Perfis
- Faça login em `/login`. Token e usuário são armazenados em `localStorage`.
- O frontend redireciona para `/login` quando não há token.
- ADMIN vê todos os registros; demais papéis veem apenas seus dados relacionados.

## Dados Iniciais (seed)
- Usuários: `admin@juridex.local` (ADMIN), `carlos@juridex.local` (ADVOGADO), `jaque@juridex.local` (PROMOTOR), `juiz@juridex.local` (JUIZ), `defensor@juridex.local` (DEFENSOR_PUBLICO)
- Senhas em texto (`admin123`, `16122012`, `123456` etc.) conforme `backend/database/seed.sql`

## Recursos da UI
- Grids CRUD com criação/edição/exclusão
- Upload de documentos (`/documento/upload`) com `Authorization` e `FormData`
- Lookups:
  - Processo: combobox com `numero_processo`
  - Pessoa: combobox com `nome`
  - Tipo de Documento: combobox com tipos cadastrados; se não houver, aceita texto
  - Juiz: combobox filtrando usuários com papel `JUIZ`
- Atualização automática:
  - Após salvar/excluir, o grid recarrega e emite `app:refresh`
  - Lookups e Dashboard escutam `app:refresh` e reconsultam dados

## Regras importantes
- Partes: se escolher Pessoa, o papel deve ser `Réu`, `Vítima` ou `Testemunha` (IDs 10/11/12)
- Partes: `id_usuario` e `criado_por` são preenchidos automaticamente pelo usuário logado
- Processos: o número é gerado automaticamente no front se não for informado

## Troubleshooting
- "Failed to fetch" no login: verifique `CORS_ORIGIN` e se o backend está acessível
- "Token inválido": token antigo — o front limpa e redireciona para `/login`
- Timeout ao conectar ao banco: confirme `DB_HOST/PORT/USER/PASSWORD/NAME`; em container use `db`, em Postgres local use `host.docker.internal`
- Sem tipos de documento: o campo Tipo aceita texto até que cadastre tipos em "Tipos de Documento"

## Scripts úteis
```
# Compose
docker compose up -d
docker compose down -v
docker compose up -d --no-deps --force-recreate backend

# Backend
cd backend && npm run start

# Frontend
cd frontend && npm run dev
```
