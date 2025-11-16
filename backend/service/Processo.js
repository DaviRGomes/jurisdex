class ProcessoService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const processos = await this.repository.getAll();
    if (!processos || processos.length === 0) {
      throw { status: 404, message: 'Nenhum processo encontrado' };
    }
    return processos;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const processo = await this.repository.getById(Number(id));
    if (!processo) throw { status: 404, message: 'Processo não encontrado' };
    return processo;
  }

  async create(payload) {
    const processo = new Processo(payload);
    if (!processo.numero_processo || !processo.data_abertura || !processo.situacao || !processo.data_criacao || !processo.data_atualizacao) {
      throw { status: 400, message: 'numero_processo, data_abertura, situacao, data_criacao e data_atualizacao são obrigatórios' };
    }
    const created = await this.repository.create({
      numero_processo: processo.numero_processo,
      data_abertura: processo.data_abertura,
      situacao: processo.situacao,
      data_criacao: processo.data_criacao,
      data_atualizacao: processo.data_atualizacao
    });
    return created;
  }

  async update(id, { numero_processo, data_abertura, situacao, data_criacao, data_atualizacao }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!numero_processo || !data_abertura || !situacao || !data_criacao || !data_atualizacao) {
      throw { status: 400, message: 'numero_processo, data_abertura, situacao, data_criacao e data_atualizacao são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Processo não encontrado para atualização' };
    const updated = await this.repository.update(Number(id), { numero_processo, data_abertura, situacao, data_criacao, data_atualizacao });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Processo não encontrado para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Processo from '../model/Processo.js';
import repository from '../repository/Processo.js';
export default new ProcessoService();