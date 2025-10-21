// db/dbConfig.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env para process.env
dotenv.config(); 

// Cria e configura o Pool de Conexões
const pool = new Pool({
    // As informações são puxadas do arquivo .env
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,      
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT, 
    
    // Configurações de Pool (opcional, mas bom para performance)
    max: 20, // Máximo de 20 conexões ativas
    idleTimeoutMillis: 30000, // Conexão ociosa por 30 segundos
    connectionTimeoutMillis: 2000, // Tentar conectar por no máximo 2 segundos
});

// Listener para logar quando o pool se conecta
pool.on('connect', () => {
    console.log('🔗 Conectado ao PostgreSQL!');
});

// Listener para logar erros no pool
pool.on('error', (err) => {
    console.error('Erro inesperado no Pool de Conexão com o DB', err);
    // O Node.js não deve ser encerrado, pois o Pool tentará se reconectar
});


// Exporta uma função wrapper para executar consultas
// Isso simplifica a chamada no Repository (ex: db.query(sql))
module.exports = {
    /**
     * Executa uma consulta no banco de dados usando o pool.
     * @param {string} text - A string SQL da consulta.
     * @param {Array} params - Os parâmetros da consulta ($1, $2...).
     * @returns {Promise<QueryResult>} O resultado da consulta.
     */
    query: (text, params) => pool.query(text, params),
};