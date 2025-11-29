class AndamentoRepository {
  async getAll() {
    try {
      const query = `
        SELECT a.id, a.id_processo, p.numero_processo, a.data_registro, a.descricao, a.tipo_andamento
        FROM andamentos a
        JOIN processos p ON p.id = a.id_processo
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      const querySingular = `
        SELECT a.id, a.id_processo, p.numero_processo, a.data_registro, a.descricao, a.tipo_andamento
        FROM andamento a
        JOIN processos p ON p.id = a.id_processo
      `;
      const resultSingular = await db.query(querySingular);
      return resultSingular.rows;
    }
  }

  async getMine(userId, email) {
    const query = `
      SELECT a.id, a.id_processo, p.numero_processo, a.data_registro, a.descricao, a.tipo_andamento
      FROM andamentos a
      JOIN processos p ON p.id = a.id_processo
      WHERE EXISTS (
        SELECT 1 FROM partes pa
        WHERE pa.id_processo = a.id_processo
          AND (pa.id_usuario = $1 OR pa.criado_por = $2)
      )
    `;
    const result = await db.query(query, [userId, email]);
    return result.rows;
  }

  async getById(id) {
    try {
      const query = `
        SELECT a.id, a.id_processo, p.numero_processo, a.data_registro, a.descricao, a.tipo_andamento
        FROM andamentos a
        JOIN processos p ON p.id = a.id_processo
        WHERE a.id = $1
      `;
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      const querySingular = `
        SELECT a.id, a.id_processo, p.numero_processo, a.data_registro, a.descricao, a.tipo_andamento
        FROM andamento a
        JOIN processos p ON p.id = a.id_processo
        WHERE a.id = $1
      `;
      const resultSingular = await db.query(querySingular, [id]);
      return resultSingular.rows[0];
    }
  }

  async create({ id_processo, data_registro, descricao, tipo_andamento }) {
    try {
      const query = `
        INSERT INTO andamentos (id_processo, data_registro, descricao, tipo_andamento)
        VALUES ($1, $2, $3, $4)
        RETURNING id, id_processo, data_registro, descricao, tipo_andamento
      `;
      const result = await db.query(query, [id_processo, data_registro, descricao, tipo_andamento]);
      return result.rows[0];
    } catch (err) {
      const querySingular = `
        INSERT INTO andamento (id_processo, data_registro, descricao, tipo_andamento)
        VALUES ($1, $2, $3, $4)
        RETURNING id, id_processo, data_registro, descricao, tipo_andamento
      `;
      const resultSingular = await db.query(querySingular, [id_processo, data_registro, descricao, tipo_andamento]);
      return resultSingular.rows[0];
    }
  }

  async update(id, { id_processo, data_registro, descricao, tipo_andamento }) {
    try {
      const query = `
        UPDATE andamentos
        SET id_processo = $1, data_registro = $2, descricao = $3, tipo_andamento = $4
        WHERE id = $5
        RETURNING id, id_processo, data_registro, descricao, tipo_andamento
      `;
      const result = await db.query(query, [id_processo, data_registro, descricao, tipo_andamento, id]);
      return result.rows[0];
    } catch (err) {
      const querySingular = `
        UPDATE andamento
        SET id_processo = $1, data_registro = $2, descricao = $3, tipo_andamento = $4
        WHERE id = $5
        RETURNING id, id_processo, data_registro, descricao, tipo_andamento
      `;
      const resultSingular = await db.query(querySingular, [id_processo, data_registro, descricao, tipo_andamento, id]);
      return resultSingular.rows[0];
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM andamentos WHERE id = $1 RETURNING id';
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      const querySingular = 'DELETE FROM andamento WHERE id = $1 RETURNING id';
      const resultSingular = await db.query(querySingular, [id]);
      return resultSingular.rows[0];
    }
  }
}

import db from '../database/dbConfig.js';
export default new AndamentoRepository();