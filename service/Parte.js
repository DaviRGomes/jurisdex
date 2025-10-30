class ParteService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const partes = await this.repository.getAll();
    if (!partes || partes.length === 0) {
      throw { status: 404, message: 'Nenhuma parte encontrada' };
    }
    return partes;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const parte = await this.repository.getById(Number(id));
    if (!parte) throw { status: 404, message: 'Parte não encontrada' };
    return parte;
  }

  async create(payload) {
    const parte = new Parte(payload);
    if (!parte.id_processo || !parte.id_papel) {
      throw { status: 400, message: 'id_processo e id_papel são obrigatórios' };
    }
    if (!parte.id_usuario && !parte.id_pessoa) {
      throw { status: 400, message: 'Informe id_usuario ou id_pessoa' };
    }
    const created = await this.repository.create({
      id_processo: parte.id_processo,
      id_usuario: parte.id_usuario,
      id_pessoa: parte.id_pessoa,
      id_papel: parte.id_papel,
      data_criacao: parte.data_criacao,
      criado_por: parte.criado_por
    });
    return created;
  }

  async update(id, { id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!id_processo || !id_papel) {
      throw { status: 400, message: 'id_processo e id_papel são obrigatórios' };
    }
    if (!id_usuario && !id_pessoa) {
      throw { status: 400, message: 'Informe id_usuario ou id_pessoa' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Parte não encontrada para atualização' };
    const updated = await this.repository.update(Number(id), { id_processo, id_usuario, id_pessoa, id_papel, data_criacao, criado_por });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Parte não encontrada para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Parte from '../model/Parte.js';
import repository from '../repository/Parte.js';
export default new ParteService();