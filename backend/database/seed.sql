INSERT INTO usuario (nome, email, senha, papel_sistema)
SELECT 'Admin', 'admin@juridex.local', 'admin123', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email='admin@juridex.local');

INSERT INTO usuario (nome, email, senha, papel_sistema)
SELECT 'Carlos Gomes', 'carlos@juridex.local', '16122012', 'ADVOGADO'
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email='carlos@juridex.local');

INSERT INTO usuario (nome, email, senha, papel_sistema)
SELECT 'Jaqueline', 'jaque@juridex.local', '16122012', 'PROMOTOR'
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email='jaque@juridex.local');

INSERT INTO usuario (nome, email, senha, papel_sistema)
SELECT 'Dr. Juiz', 'juiz@juridex.local', '123456', 'JUIZ'
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email='juiz@juridex.local');

INSERT INTO usuario (nome, email, senha, papel_sistema)
SELECT 'Defensor', 'defensor@juridex.local', '123456', 'DEFENSOR_PUBLICO'
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email='defensor@juridex.local');

INSERT INTO pessoas (nome, documento, contato)
SELECT 'João da Silva', '123.456.789-00', '(11) 99999-0001'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE nome='João da Silva');

INSERT INTO pessoas (nome, documento, contato)
SELECT 'Maria de Souza', '987.654.321-00', '(11) 99999-0002'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE nome='Maria de Souza');

INSERT INTO pessoas (nome, documento, contato)
SELECT 'Pedro Alves', '555.666.777-88', '(11) 99999-0003'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE nome='Pedro Alves');

INSERT INTO varas (nome, localizacao)
SELECT '1ª Vara Cível', 'São Paulo - Fórum Central'
WHERE NOT EXISTS (SELECT 1 FROM varas WHERE nome='1ª Vara Cível');

INSERT INTO varas (nome, localizacao)
SELECT '2ª Vara Criminal', 'São Paulo - Fórum Barra Funda'
WHERE NOT EXISTS (SELECT 1 FROM varas WHERE nome='2ª Vara Criminal');

INSERT INTO tipos_documento (nome)
SELECT 'Petição Inicial'
WHERE NOT EXISTS (SELECT 1 FROM tipos_documento WHERE nome='Petição Inicial');

INSERT INTO tipos_documento (nome)
SELECT 'Contestação'
WHERE NOT EXISTS (SELECT 1 FROM tipos_documento WHERE nome='Contestação');

INSERT INTO tipos_documento (nome)
SELECT 'Sentença'
WHERE NOT EXISTS (SELECT 1 FROM tipos_documento WHERE nome='Sentença');

INSERT INTO tipos_documento (nome)
SELECT 'Ata de Audiência'
WHERE NOT EXISTS (SELECT 1 FROM tipos_documento WHERE nome='Ata de Audiência');

INSERT INTO processos (numero_processo, data_abertura, situacao, data_criacao, data_atualizacao)
SELECT '0001234-56.2025.8.26.0100', '2025-11-01', 'Em andamento', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM processos WHERE numero_processo='0001234-56.2025.8.26.0100');

INSERT INTO processos (numero_processo, data_abertura, situacao, data_criacao, data_atualizacao)
SELECT '0009876-54.2025.8.26.0100', '2025-10-15', 'Distribuído', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM processos WHERE numero_processo='0009876-54.2025.8.26.0100');

INSERT INTO processos (numero_processo, data_abertura, situacao, data_criacao, data_atualizacao)
SELECT '0012345-67.2025.8.26.0100', '2025-09-20', 'Concluído', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM processos WHERE numero_processo='0012345-67.2025.8.26.0100');

INSERT INTO partes (id_processo, id_usuario, id_papel, data_criacao, criado_por)
SELECT p.id, u.id, 1, NOW(), u.email
FROM processos p JOIN usuario u ON u.email='carlos@juridex.local'
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (
    SELECT 1 FROM partes pa WHERE pa.id_processo=p.id AND pa.id_usuario=u.id AND pa.id_papel=1
  );

INSERT INTO partes (id_processo, id_usuario, id_papel, data_criacao, criado_por)
SELECT p.id, u.id, 2, NOW(), u.email
FROM processos p JOIN usuario u ON u.email='jaque@juridex.local'
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (
    SELECT 1 FROM partes pa WHERE pa.id_processo=p.id AND pa.id_usuario=u.id AND pa.id_papel=2
  );

INSERT INTO partes (id_processo, id_pessoa, id_papel, data_criacao, criado_por)
SELECT p.id, ps.id, 10, NOW(), 'carlos@juridex.local'
FROM processos p JOIN pessoas ps ON ps.nome='João da Silva'
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (
    SELECT 1 FROM partes pa WHERE pa.id_processo=p.id AND pa.id_pessoa=ps.id AND pa.id_papel=10
  );

INSERT INTO partes (id_processo, id_pessoa, id_papel, data_criacao, criado_por)
SELECT p.id, ps.id, 11, NOW(), 'jaque@juridex.local'
FROM processos p JOIN pessoas ps ON ps.nome='Maria de Souza'
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (
    SELECT 1 FROM partes pa WHERE pa.id_processo=p.id AND pa.id_pessoa=ps.id AND pa.id_papel=11
  );

INSERT INTO documentos (nome, tipo, url_arquivo, id_processo)
SELECT 'Petição Inicial - João', 'Petição Inicial', '/uploads/peticao_inicial_joao.pdf', p.id
FROM processos p
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM documentos d WHERE d.nome='Petição Inicial - João' AND d.id_processo=p.id);

INSERT INTO documentos (nome, tipo, url_arquivo, id_processo)
SELECT 'Contestação - Maria', 'Contestação', '/uploads/contestacao_maria.pdf', p.id
FROM processos p
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM documentos d WHERE d.nome='Contestação - Maria' AND d.id_processo=p.id);

INSERT INTO documentos (nome, tipo, url_arquivo, id_processo)
SELECT 'Sentença', 'Sentença', '/uploads/sentenca_0001234.pdf', p.id
FROM processos p
WHERE p.numero_processo='0012345-67.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM documentos d WHERE d.nome='Sentença' AND d.id_processo=p.id);

INSERT INTO andamentos (id_processo, data_registro, descricao, tipo_andamento)
SELECT p.id, '2025-11-05', 'Distribuição do processo', 'Distribuição'
FROM processos p
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM andamentos a WHERE a.id_processo=p.id AND a.descricao='Distribuição do processo');

INSERT INTO andamentos (id_processo, data_registro, descricao, tipo_andamento)
SELECT p.id, '2025-11-10', 'Juntada da contestação', 'Juntada'
FROM processos p
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM andamentos a WHERE a.id_processo=p.id AND a.descricao='Juntada da contestação');

INSERT INTO audiencias (id_processo, data, tipo, resultado, id_juiz)
SELECT p.id, '2025-11-20 14:00:00', 'Instrução', NULL, u.id
FROM processos p JOIN usuario u ON u.email='juiz@juridex.local'
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM audiencias a WHERE a.id_processo=p.id AND a.data='2025-11-20 14:00:00');

INSERT INTO localizacoes_fisicas (id_processo, sala, estante, caixa)
SELECT p.id, 'Sala 2', 'Estante A', 'Caixa 12'
FROM processos p
WHERE p.numero_processo='0001234-56.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM localizacoes_fisicas lf WHERE lf.id_processo=p.id);

INSERT INTO localizacoes_fisicas (id_processo, sala, estante, caixa)
SELECT p.id, 'Sala 1', 'Estante B', 'Caixa 03'
FROM processos p
WHERE p.numero_processo='0009876-54.2025.8.26.0100'
  AND NOT EXISTS (SELECT 1 FROM localizacoes_fisicas lf WHERE lf.id_processo=p.id);
