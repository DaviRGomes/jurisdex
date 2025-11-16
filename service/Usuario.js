class UsuarioService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const usuarios = await this.repository.getAll();
    if (!usuarios || usuarios.length === 0) {
      throw { status: 404, message: 'Nenhum usuário encontrado' };
    }
    return usuarios;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const usuario = await this.repository.getById(Number(id));
    if (!usuario) throw { status: 404, message: 'Usuário não encontrado' };
    return usuario;
  }

  async create(payload) {
    const usuario = new Usuario(payload);
    if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.papel_sistema) {
      throw { status: 400, message: 'nome, email, senha e papel_sistema são obrigatórios' };
    }
    const created = await this.repository.create({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      papel_sistema: usuario.papel_sistema
    });
    return created;
  }

  async update(id, { nome, email, senha, papel_sistema }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!nome || !email || !senha || !papel_sistema) {
      throw { status: 400, message: 'nome, email, senha e papel_sistema são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Usuário não encontrado para atualização' };
    const updated = await this.repository.update(Number(id), { nome, email, senha, papel_sistema });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Usuário não encontrado para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Usuario from '../model/Usuario.js';
import repository from '../repository/Usuario.js';
export default new UsuarioService();