import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,      
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT, 

    max: 20, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000, 
});


pool.on('connect', () => {
    console.log('🔗 Conectado ao PostgreSQL!');
});

pool.on('error', (err) => {
    console.error('Erro inesperado no Pool de Conexão com o DB', err);
 
});


export default {
    query: (text, params) => pool.query(text, params),
};