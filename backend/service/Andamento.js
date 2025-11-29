class AndamentoService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const andamentos = await this.repository.getAll();
    if (!andamentos || andamentos.length === 0) {
      throw { status: 404, message: 'Nenhum andamento encontrado' };
    }
    return andamentos;
  }

  async getMine({ userId, email }) {
    const andamentos = await this.repository.getMine(Number(userId), String(email));
    if (!andamentos || andamentos.length === 0) {
      throw { status: 404, message: 'Nenhum andamento encontrado' };
    }
    return andamentos;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const andamento = await this.repository.getById(Number(id));
    if (!andamento) throw { status: 404, message: 'Andamento não encontrado' };
    return andamento;
  }

  async create(payload) {
    const andamento = new Andamento(payload);
    if (!andamento.id_processo || !andamento.data_registro || !andamento.descricao || !andamento.tipo_andamento) {
      throw { status: 400, message: 'id_processo, data_registro, descricao e tipo_andamento são obrigatórios' };
    }
    const created = await this.repository.create({
      id_processo: andamento.id_processo,
      data_registro: andamento.data_registro,
      descricao: andamento.descricao,
      tipo_andamento: andamento.tipo_andamento
    });
    return created;
  }

  async update(id, { id_processo, data_registro, descricao, tipo_andamento }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!id_processo || !data_registro || !descricao || !tipo_andamento) {
      throw { status: 400, message: 'id_processo, data_registro, descricao e tipo_andamento são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Andamento não encontrado para atualização' };
    const updated = await this.repository.update(Number(id), { id_processo, data_registro, descricao, tipo_andamento });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Andamento não encontrado para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Andamento from '../model/Andamento.js';
import repository from '../repository/Andamento.js';
export default new AndamentoService();