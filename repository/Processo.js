class ProcessoRepository {
  async getAll() {
    const query = `
      SELECT id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao
      FROM processos
    `;
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = `
      SELECT id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao
      FROM processos WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ numero_processo, data_abertura, situacao, data_criacao, data_atualizacao }) {
    const query = `
      INSERT INTO processos (numero_processo, data_abertura, situacao, data_criacao, data_atualizacao)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao
    `;
    const result = await db.query(query, [numero_processo, data_abertura, situacao, data_criacao, data_atualizacao]);
    return result.rows[0];
  }

  async update(id, { numero_processo, data_abertura, situacao, data_criacao, data_atualizacao }) {
    const query = `
      UPDATE processos
      SET numero_processo = $1, data_abertura = $2, situacao = $3, data_criacao = $4, data_atualizacao = $5
      WHERE id = $6
      RETURNING id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao
    `;
    const result = await db.query(query, [numero_processo, data_abertura, situacao, data_criacao, data_atualizacao, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM processos WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new ProcessoRepository();