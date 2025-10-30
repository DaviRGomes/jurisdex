class AndamentoRepository {
  async getAll() {
    const query = 'SELECT id, id_processo, data_registro, descricao, tipo_andamento FROM andamentos';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, id_processo, data_registro, descricao, tipo_andamento FROM andamentos WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ id_processo, data_registro, descricao, tipo_andamento }) {
    const query = `
      INSERT INTO andamentos (id_processo, data_registro, descricao, tipo_andamento)
      VALUES ($1, $2, $3, $4)
      RETURNING id, id_processo, data_registro, descricao, tipo_andamento
    `;
    const result = await db.query(query, [id_processo, data_registro, descricao, tipo_andamento]);
    return result.rows[0];
  }

  async update(id, { id_processo, data_registro, descricao, tipo_andamento }) {
    const query = `
      UPDATE andamentos
      SET id_processo = $1, data_registro = $2, descricao = $3, tipo_andamento = $4
      WHERE id = $5
      RETURNING id, id_processo, data_registro, descricao, tipo_andamento
    `;
    const result = await db.query(query, [id_processo, data_registro, descricao, tipo_andamento, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM andamentos WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new AndamentoRepository();