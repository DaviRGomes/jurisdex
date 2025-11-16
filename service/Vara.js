class VaraService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const varas = await this.repository.getAll();
    if (!varas || varas.length === 0) {
      throw { status: 404, message: 'Nenhuma vara encontrada' };
    }
    return varas;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const vara = await this.repository.getById(Number(id));
    if (!vara) throw { status: 404, message: 'Vara não encontrada' };
    return vara;
  }

  async create(payload) {
    const vara = new Vara(payload);
    if (!vara.nome || !vara.localizacao) {
      throw { status: 400, message: 'nome e localizacao são obrigatórios' };
    }
    const created = await this.repository.create({
      nome: vara.nome,
      localizacao: vara.localizacao
    });
    return created;
  }

  async update(id, { nome, localizacao }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!nome || !localizacao) {
      throw { status: 400, message: 'nome e localizacao são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Vara não encontrada para atualização' };
    const updated = await this.repository.update(Number(id), { nome, localizacao });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Vara não encontrada para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Vara from '../model/Vara.js';
import repository from '../repository/Vara.js';
export default new VaraService();