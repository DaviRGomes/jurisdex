const db = require('../db/dbConfig');


class DocumentoRepository {
    async getAll() {
        const query = 'SELECT id, nome, tipo, url_arquivo FROM documentos';
        const result = await db.query(query);
        return result.rows;
    }
    async getById(id) {
        const query = 'SELECT id, nome, tipo, url_arquivo FROM documentos WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    async getByName(nome) {
        const query = 'SELECT id, nome, tipo, url_arquivo FROM documentos WHERE nome ILIKE $1';
        const result = await db.query(query, [`%${nome}%`]);
        return result.rows;
    }

    async create({ nome, tipo, url_arquivo }) {
        const query = `
            INSERT INTO documentos (nome, tipo, url_arquivo)
            VALUES ($1, $2, $3)
            RETURNING id, nome, tipo, url_arquivo
        `;
        const result = await db.query(query, [nome, tipo, url_arquivo]);
        return result.rows[0];
    }

    async update(id, { nome, tipo, url_arquivo }) {
        const query = `
            UPDATE documentos
            SET nome = $1, tipo = $2, url_arquivo = $3
            WHERE id = $4
            RETURNING id, nome, tipo, url_arquivo
        `;
        const result = await db.query(query, [nome, tipo, url_arquivo, id]);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM documentos WHERE id = $1 RETURNING id';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

import db from '../database/dbConfig.js';
export default new DocumentoRepository();
