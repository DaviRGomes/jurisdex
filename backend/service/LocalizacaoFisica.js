class LocalizacaoFisicaService {
  #repository;
  constructor() {
    this.repository = repository;
  }

  async getAll() {
    const localizacoes = await this.repository.getAll();
    if (!localizacoes || localizacoes.length === 0) {
      throw { status: 404, message: 'Nenhuma localização física encontrada' };
    }
    return localizacoes;
  }

  async getById(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const localizacao = await this.repository.getById(Number(id));
    if (!localizacao) throw { status: 404, message: 'Localização física não encontrada' };
    return localizacao;
  }

  async create(payload) {
    const localizacao = new LocalizacaoFisica(payload);
    if (!localizacao.id_processo || !localizacao.sala || !localizacao.estante || !localizacao.caixa) {
      throw { status: 400, message: 'id_processo, sala, estante e caixa são obrigatórios' };
    }
    const created = await this.repository.create({
      id_processo: localizacao.id_processo,
      sala: localizacao.sala,
      estante: localizacao.estante,
      caixa: localizacao.caixa
    });
    return created;
  }

  async update(id, { id_processo, sala, estante, caixa }) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    if (!id_processo || !sala || !estante || !caixa) {
      throw { status: 400, message: 'id_processo, sala, estante e caixa são obrigatórios' };
    }
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Localização física não encontrada para atualização' };
    const updated = await this.repository.update(Number(id), { id_processo, sala, estante, caixa });
    return updated;
  }

  async delete(id) {
    if (!id) throw { status: 400, message: 'ID é obrigatório' };
    const existing = await this.repository.getById(Number(id));
    if (!existing) throw { status: 404, message: 'Localização física não encontrada para exclusão' };
    const deleted = await this.repository.delete(Number(id));
    return deleted;
  }
}

import LocalizacaoFisica from '../model/LocalizacaoFisica.js';
import repository from '../repository/LocalizacaoFisica.js';
export default new LocalizacaoFisicaService();