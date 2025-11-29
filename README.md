# Jurisdex

## Ideia do Projeto
- Jurisdex é uma Plataforma Web de Gestão Jurídica completa e segura, desenvolvida para dinamizar o fluxo de trabalho e centralizar todas as informações relativas a processos judiciais.
- O sistema visa automatizar e simplificar as rotinas jurídicas, desde a criação e gestão de documentos, o acompanhamento de andamentos e audiências, até a organização de partes, pessoas e a localização física de autos.
- Com controle de acesso estrito via JWT e regras de visibilidade específicas para cada perfil (ADMIN, ADVOGADO, PROMOTOR, JUIZ, DEFENSOR_PUBLICO), Jurisdex garante que cada usuário tenha acesso apenas às informações relevantes ao seu papel, promovendo segurança e eficiência na administração processual.

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

## Configuração
- Crie um arquivo `.env` na raiz e configure as variáveis necessárias para backend, banco de dados e frontend conforme sua infraestrutura.
- Nunca versione segredos e credenciais.

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
- O `schema.sql` e `seed.sql` são aplicados apenas na primeira criação do volume do banco.
- Se usar Postgres local em vez do container, ajuste o `.env` para apontar para seu host do banco e não suba o serviço `db`.

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
Certifique-se de que o `.env` esteja consistente entre backend e frontend.

## Login e Perfis
- Faça login em `/login`. Token e usuário são armazenados em `localStorage`.
- O frontend redireciona para `/login` quando não há token.
- ADMIN vê todos os registros; demais papéis veem apenas seus dados relacionados.

## Dados Iniciais (seed)
- Para referência, consulte `backend/database/seed.sql`.

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
- "Failed to fetch" no login: verifique a configuração de CORS do backend e a disponibilidade da API
- "Token inválido": token antigo — o frontend limpa e redireciona para `/login`
- Timeout ao conectar ao banco: confirme host, porta e credenciais do banco nas variáveis de ambiente
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
