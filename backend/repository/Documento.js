import db from '../database/dbConfig.js';

class DocumentoRepository {
    async getAll() {
        const query = 'SELECT id, nome, tipo, url_arquivo, id_processo FROM documentos';
        const result = await db.query(query);
        return result.rows;
    }

    async getMine(userId, email) {
        const query = `
            SELECT d.id, d.nome, d.tipo, d.url_arquivo, d.id_processo
            FROM documentos d
            WHERE EXISTS (
              SELECT 1 FROM partes pa
              WHERE pa.id_processo = d.id_processo
                AND (pa.id_usuario = $1 OR pa.criado_por = $2)
            )
        `;
        const result = await db.query(query, [userId, email]);
        return result.rows;
    }
    async getById(id) {
        const query = 'SELECT id, nome, tipo, url_arquivo, id_processo FROM documentos WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    async getByName(nome) {
        const query = 'SELECT id, nome, tipo, url_arquivo, id_processo FROM documentos WHERE nome ILIKE $1';
        const result = await db.query(query, [`%${nome}%`]);
        return result.rows;
    }

    async create({ nome, tipo, url_arquivo, id_processo }) {
        const query = `
            INSERT INTO documentos (nome, tipo, url_arquivo, id_processo)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, tipo, url_arquivo, id_processo
        `;
        const result = await db.query(query, [nome, tipo, url_arquivo, id_processo]);
        return result.rows[0];
    }

    async update(id, { nome, tipo, url_arquivo, id_processo }) {
        const query = `
            UPDATE documentos
            SET nome = $1, tipo = $2, url_arquivo = $3, id_processo = $4
            WHERE id = $5
            RETURNING id, nome, tipo, url_arquivo, id_processo
        `;
        const result = await db.query(query, [nome, tipo, url_arquivo, id_processo, id]);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM documentos WHERE id = $1 RETURNING id';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

export default new DocumentoRepository();
