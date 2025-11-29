CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  papel_sistema TEXT NOT NULL,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS pessoas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  documento TEXT NOT NULL,
  contato TEXT NOT NULL,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS varas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS tipos_documento (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS processos (
  id SERIAL PRIMARY KEY,
  numero_processo TEXT NOT NULL UNIQUE,
  data_abertura DATE NOT NULL,
  situacao TEXT NOT NULL,
  data_criacao TIMESTAMP NULL,
  data_atualizacao TIMESTAMP NULL,
  id_vara INTEGER NULL REFERENCES varas(id)
);

CREATE TABLE IF NOT EXISTS partes (
  id SERIAL PRIMARY KEY,
  id_processo INTEGER NOT NULL REFERENCES processos(id) ON DELETE CASCADE,
  id_usuario INTEGER NULL REFERENCES usuario(id) ON DELETE SET NULL,
  id_pessoa INTEGER NULL REFERENCES pessoas(id) ON DELETE SET NULL,
  id_papel INTEGER NOT NULL,
  data_criacao TIMESTAMP NULL,
  criado_por TEXT NULL
);

CREATE TABLE IF NOT EXISTS documentos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL,
  url_arquivo TEXT NOT NULL,
  id_processo INTEGER NULL REFERENCES processos(id) ON DELETE CASCADE,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS andamentos (
  id SERIAL PRIMARY KEY,
  id_processo INTEGER NOT NULL REFERENCES processos(id) ON DELETE CASCADE,
  data_registro DATE NOT NULL,
  descricao TEXT NOT NULL,
  tipo_andamento TEXT NOT NULL,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS audiencias (
  id SERIAL PRIMARY KEY,
  id_processo INTEGER NOT NULL REFERENCES processos(id) ON DELETE CASCADE,
  data TIMESTAMP NOT NULL,
  tipo TEXT NOT NULL,
  resultado TEXT NULL,
  id_juiz INTEGER NULL REFERENCES usuario(id) ON DELETE SET NULL,
  data_criacao TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS localizacoes_fisicas (
  id SERIAL PRIMARY KEY,
  id_processo INTEGER NOT NULL REFERENCES processos(id) ON DELETE CASCADE,
  sala TEXT NOT NULL,
  estante TEXT NOT NULL,
  caixa TEXT NOT NULL
);

-- Índices auxiliares
CREATE INDEX IF NOT EXISTS idx_partes_processo ON partes(id_processo);
CREATE INDEX IF NOT EXISTS idx_documentos_processo ON documentos(id_processo);
CREATE INDEX IF NOT EXISTS idx_andamentos_processo ON andamentos(id_processo);
CREATE INDEX IF NOT EXISTS idx_audiencias_processo ON audiencias(id_processo);
