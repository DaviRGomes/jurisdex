class TipoDocumentoService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const tipos = await this.repository.getAll();
    if (!tipos || tipos.length === 0) {
      throw { status: 404, message: 'Nenhum tipo de documento encontrado' };
    }
    return tipos;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const tipo = await this.repository.getById(Number(id));
    if (!tipo) throw { status: 404, message: 'Tipo de documento não encontrado' };
    return tipo;
  }

  async create(payload) {
    const tipo = new TipoDocumento(payload);
    if (!tipo.nome) {
      throw { status: 400, message: 'nome é obrigatório' };
    }
    const created = await this.repository.create({
      nome: tipo.nome
    });
    return created;
  }

  async update(id, { nome }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!nome) {
      throw { status: 400, message: 'nome é obrigatório' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Tipo de documento não encontrado para atualização' };
    const updated = await this.repository.update(Number(id), { nome });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Tipo de documento não encontrado para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import TipoDocumento from '../model/TipoDocumento.js';
import repository from '../repository/TipoDocumento.js';
export default new TipoDocumentoService();