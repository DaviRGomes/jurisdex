class AudienciaService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const audiencias = await this.repository.getAll();
    if (!audiencias || audiencias.length === 0) {
      throw { status: 404, message: 'Nenhuma audiência encontrada' };
    }
    return audiencias;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const audiencia = await this.repository.getById(Number(id));
    if (!audiencia) throw { status: 404, message: 'Audiência não encontrada' };
    return audiencia;
  }

  async create(payload) {
    const audiencia = new Audiencia(payload);
    if (!audiencia.id_processo || !audiencia.data || !audiencia.tipo) {
      throw { status: 400, message: 'id_processo, data e tipo são obrigatórios' };
    }
    const created = await this.repository.create({
      id_processo: audiencia.id_processo,
      data: audiencia.data,
      tipo: audiencia.tipo,
      resultado: audiencia.resultado,
      id_juiz: audiencia.id_juiz
    });
    return created;
  }

  async update(id, { id_processo, data, tipo, resultado, id_juiz }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!id_processo || !data || !tipo) {
      throw { status: 400, message: 'id_processo, data e tipo são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Audiência não encontrada para atualização' };
    const updated = await this.repository.update(Number(id), { id_processo, data, tipo, resultado, id_juiz });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Audiência não encontrada para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import Audiencia from '../model/Audiencia.js';
import repository from '../repository/Audiencia.js';
export default new AudienciaService();