class AudienciaRepository {
  async getAll() {
    const query = 'SELECT id, id_processo, data, tipo, resultado, id_juiz FROM audiencias';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, id_processo, data, tipo, resultado, id_juiz FROM audiencias WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ id_processo, data, tipo, resultado, id_juiz }) {
    const query = `
      INSERT INTO audiencias (id_processo, data, tipo, resultado, id_juiz)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, id_processo, data, tipo, resultado, id_juiz
    `;
    const result = await db.query(query, [id_processo, data, tipo, resultado, id_juiz]);
    return result.rows[0];
  }

  async update(id, { id_processo, data, tipo, resultado, id_juiz }) {
    const query = `
      UPDATE audiencias
      SET id_processo = $1, data = $2, tipo = $3, resultado = $4, id_juiz = $5
      WHERE id = $6
      RETURNING id, id_processo, data, tipo, resultado, id_juiz
    `;
    const result = await db.query(query, [id_processo, data, tipo, resultado, id_juiz, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM audiencias WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new AudienciaRepository();