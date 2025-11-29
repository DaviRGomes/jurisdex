class ProcessoController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    try {
      const { id, email, papel } = req.user || {};
      const isAdmin = String(papel).toUpperCase() === 'ADMIN';
      const processos = isAdmin
        ? await this.service.getAll()
        : await this.service.getMine({ userId: id, email, papel });
      res.status(200).json(processos);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  count = async (req, res) => {
    try {
      const { id, email, papel } = req.user || {};
      const total = await this.service.getCount({ userId: id, email, papel });
      res.status(200).json({ count: total });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const processo = await this.service.getById(Number(id));
      res.status(200).json(processo);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  create = async (req, res) => {
    try {
      const payload = req.body;
      const created = await this.service.create(payload);

      const { id: userId, email, papel } = req.user || {};
      if (userId || email) {
        const papelMap = { ADVOGADO: 1, PROMOTOR: 2, JUIZ: 3, DEFENSOR_PUBLICO: 4, ADMIN: 1 };
        const id_papel = papelMap[papel] || 1;
        try {
          await parteService.create({
            id_processo: created.id,
            id_usuario: userId,
            id_papel,
            data_criacao: new Date().toISOString(),
            criado_por: email,
          });
        } catch (e) {
        }
      }

      res.status(201).json(created);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const updated = await this.service.update(Number(id), payload);
      res.status(200).json(updated);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(Number(id));
      res.status(200).json({ id: deleted.id });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };
}

import service from '../service/Processo.js';
import parteService from '../service/Parte.js';
export default new ProcessoController();