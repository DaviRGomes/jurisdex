class PessoaService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const pessoas = await this.repository.getAll();
    if (!pessoas || pessoas.length === 0) {
      throw { status: 404, message: 'Nenhuma pessoa encontrada' };
    }
    return pessoas;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const pessoa = await this.repository.getById(Number(id));
    if (!pessoa) throw { status: 404, message: 'Pessoa não encontrada' };
    return pessoa;
  }

  async create(payload) {
    const pessoa = new Pessoa(payload);
    if (!pessoa.nome || !pessoa.documento || !pessoa.contato) {
      throw { status: 400, message: 'nome, documento e contato são obrigatórios' };
    }
    const created = await this.repository.create({
      nome: pessoa.nome,
      documento: pessoa.documento,
      contato: pessoa.contato
    });
    return created;
  }

  async update(id, { nome, documento, contato }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!nome || !documento || !contato) {
      throw { status: 400, message: 'nome, documento e contato são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Pessoa não encontrada para atualização' };
    const updated = await this.repository.update(Number(id), { nome, documento, contato });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Pessoa não encontrada para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Pessoa from '../model/Pessoa.js';
import repository from '../repository/Pessoa.js';
export default new PessoaService();