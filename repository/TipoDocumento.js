class TipoDocumentoRepository {
  async getAll() {
    const query = 'SELECT id, nome FROM tipos_documento';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, nome FROM tipos_documento WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ nome }) {
    const query = `
      INSERT INTO tipos_documento (nome)
      VALUES ($1)
      RETURNING id, nome
    `;
    const result = await db.query(query, [nome]);
    return result.rows[0];
  }

  async update(id, { nome }) {
    const query = `
      UPDATE tipos_documento
      SET nome = $1
      WHERE id = $2
      RETURNING id, nome
    `;
    const result = await db.query(query, [nome, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM tipos_documento WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new TipoDocumentoRepository();