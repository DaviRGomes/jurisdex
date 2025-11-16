class VaraRepository {
  async getAll() {
    const query = 'SELECT id, nome, localizacao FROM varas';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, nome, localizacao FROM varas WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ nome, localizacao }) {
    const query = `
      INSERT INTO varas (nome, localizacao)
      VALUES ($1, $2)
      RETURNING id, nome, localizacao
    `;
    const result = await db.query(query, [nome, localizacao]);
    return result.rows[0];
  }

  async update(id, { nome, localizacao }) {
    const query = `
      UPDATE varas
      SET nome = $1, localizacao = $2
      WHERE id = $3
      RETURNING id, nome, localizacao
    `;
    const result = await db.query(query, [nome, localizacao, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM varas WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new VaraRepository();