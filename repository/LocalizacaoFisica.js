class LocalizacaoFisicaRepository {
  async getAll() {
    const query = 'SELECT id, id_processo, sala, estante, caixa FROM localizacoes_fisicas';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, id_processo, sala, estante, caixa FROM localizacoes_fisicas WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ id_processo, sala, estante, caixa }) {
    const query = `
      INSERT INTO localizacoes_fisicas (id_processo, sala, estante, caixa)
      VALUES ($1, $2, $3, $4)
      RETURNING id, id_processo, sala, estante, caixa
    `;
    const result = await db.query(query, [id_processo, sala, estante, caixa]);
    return result.rows[0];
  }

  async update(id, { id_processo, sala, estante, caixa }) {
    const query = `
      UPDATE localizacoes_fisicas
      SET id_processo = $1, sala = $2, estante = $3, caixa = $4
      WHERE id = $5
      RETURNING id, id_processo, sala, estante, caixa
    `;
    const result = await db.query(query, [id_processo, sala, estante, caixa, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM localizacoes_fisicas WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new LocalizacaoFisicaRepository();