class PessoaRepository {
  async getAll() {
    const query = 'SELECT id, nome, documento, contato FROM pessoas';
    const result = await db.query(query);
    return result.rows;
  }

  async getMine(userId, email) {
    const query = `
      SELECT ps.id, ps.nome, ps.documento, ps.contato
      FROM pessoas ps
      WHERE EXISTS (
        SELECT 1
        FROM partes pa_pessoa
        WHERE pa_pessoa.id_pessoa = ps.id
          AND pa_pessoa.id_papel IN (10, 11, 12)
          AND EXISTS (
            SELECT 1
            FROM partes pa_user
            WHERE pa_user.id_processo = pa_pessoa.id_processo
              AND (pa_user.id_usuario = $1 OR pa_user.criado_por = $2)
              AND pa_user.id_papel IN (1, 2, 3, 4)
          )
      )
      OR EXISTS (
        SELECT 1
        FROM partes pa_criado
        WHERE pa_criado.id_pessoa = ps.id
          AND pa_criado.criado_por = $2
          AND pa_criado.id_papel IN (10, 11, 12)
      )
    `;
    const result = await db.query(query, [userId, email]);
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