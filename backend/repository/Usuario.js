class UsuarioRepository {
  async getAll() {
    const query = 'SELECT id, nome, email, senha, papel_sistema FROM usuario';
    const result = await db.query(query);
    console.log('UsuarioRepository.getAll rows:', result.rows.length);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT id, nome, email, senha, papel_sistema FROM usuario WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async getByEmail(email) {
    const query = 'SELECT id, nome, email, senha, papel_sistema FROM usuario WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async create({ nome, email, senha, papel_sistema }) {
    const query = `
      INSERT INTO usuario (nome, email, senha, papel_sistema)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, senha, papel_sistema
    `;
    const result = await db.query(query, [nome, email, senha, papel_sistema]);
    return result.rows[0];
  }

  async update(id, { nome, email, senha, papel_sistema }) {
    const query = `
      UPDATE usuario
      SET nome = $1, email = $2, senha = $3, papel_sistema = $4
      WHERE id = $5
      RETURNING id, nome, email, senha, papel_sistema
    `;
    const result = await db.query(query, [nome, email, senha, papel_sistema, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM usuario WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

import db from '../database/dbConfig.js';
export default new UsuarioRepository();