class ParteRepository {
  async getAll() {
    const query = `
      SELECT pa.id, pa.id_processo, p.numero_processo, pa.id_usuario, pa.id_pessoa, pa.id_papel, pa.data_criacao, pa.criado_por
      FROM partes pa
      JOIN processos p ON p.id = pa.id_processo
    `;
    const result = await db.query(query);
    return result.rows;
  }

  async getMine(userId, email) {
    const query = `
      SELECT pa.id, pa.id_processo, p.numero_processo, pa.id_usuario, pa.id_pessoa, pa.id_papel, pa.data_criacao, pa.criado_por
      FROM partes pa
      JOIN processos p ON p.id = pa.id_processo
      WHERE pa.id_usuario = $1 OR pa.criado_por = $2
    `;
    const result = await db.query(query, [userId, email]);
    return result.rows;
  }

  async getById(id) {
    const query = `
      SELECT pa.id, pa.id_processo, p.numero_processo, pa.id_usuario, pa.id_pessoa, pa.id_papel, pa.data_criacao, pa.criado_por
      FROM partes pa
      JOIN processos p ON p.id = pa.id_processo
      WHERE pa.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async getByPessoaId(pessoaId) {
    const query = 'SELECT id, id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por FROM partes WHERE id_pessoa = $1';
    const result = await db.query(query, [pessoaId]);
    return result.rows;
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