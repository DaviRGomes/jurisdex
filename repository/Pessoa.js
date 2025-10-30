class PessoaRepository {
  async getAll() {
    const query = 'SELECT id, nome, documento, contato FROM pessoas';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, nome, documento, contato FROM pessoas WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create({ nome, documento, contato }) {
    const query = `
      INSERT INTO pessoas (nome, documento, contato)
      VALUES ($1, $2, $3)
      RETURNING id, nome, documento, contato
    `;
    const result = await db.query(query, [nome, documento, contato]);
    return result.rows[0];
  }

  async update(id, { nome, documento, contato }) {
    const query = `
      UPDATE pessoas
      SET nome = $1, documento = $2, contato = $3
      WHERE id = $4
      RETURNING id, nome, documento, contato
    `;
    const result = await db.query(query, [nome, documento, contato, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM pessoas WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new PessoaRepository();