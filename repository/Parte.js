class ParteRepository {
  async getAll() {
    const query = 'SELECT id, id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por FROM partes';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por FROM partes WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por }) {
    const query = `
      INSERT INTO partes (id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por
    `;
    const result = await db.query(query, [id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por]);
    return result.rows[0];
  }

  async update(id, { id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por }) {
    const query = `
      UPDATE partes
      SET id_processo = $1, id_usuario = $2, id_pessoa = $3, id_papel = $4, data_criacao = $5, criado_por = $6
      WHERE id = $7
      RETURNING id, id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por
    `;
    const result = await db.query(query, [id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM partes WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new ParteRepository();