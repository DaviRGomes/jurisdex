class ProcessoRepository {
  async getAll() {
    const query = `
      SELECT id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao
      FROM processos
    `;
    const result = await db.query(query);
    return result.rows;
  }

  async getMine(userId, email) {
    const query = `
      SELECT p.id, p.numero_processo, p.data_abertura, p.situacao, p.data_criacao, p.data_atualizacao
      FROM processos p
      WHERE EXISTS (
        SELECT 1 FROM partes pa
        WHERE pa.id_processo = p.id
          AND (pa.id_usuario = $1 OR pa.criado_por = $2)
      )
    `;
    const result = await db.query(query, [userId, email]);
    return result.rows;
  }

  async countAll() {
    const query = `SELECT COUNT(*)::int AS count FROM processos`;
    const result = await db.query(query);
    console.log('Count all result:', result.rows);
    return result.rows[0]?.count ?? 0;
  }

  async countMine(userId, email) {
    const query = `
      SELECT COUNT(*)::int AS count
      FROM processos p
      WHERE EXISTS (
        SELECT 1 FROM partes pa
        WHERE pa.id_processo = p.id
          AND (pa.id_usuario = $1 OR pa.criado_por = $2)
      )
    `;
    const result = await db.query(query, [userId, email]);
    return result.rows[0]?.count ?? 0;
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