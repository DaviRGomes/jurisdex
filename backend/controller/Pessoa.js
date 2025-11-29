class PessoaController {
  constructor() {
    this.service = service;
  }

  getAll = async (req, res) => {
    try {
      const { id, email, papel } = req.user || {};
      const isAdmin = String(papel).toUpperCase() === 'ADMIN';
      const pessoas = isAdmin
        ? await this.service.getAll()
        : await this.service.getMine({ userId: id, email });
      res.status(200).json(pessoas);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const pessoa = await this.service.getById(Number(id));
      res.status(200).json(pessoa);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  create = async (req, res) => {
    try {
      const payload = req.body;
      const created = await this.service.create(payload);
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

  getPartesByPessoaId = async (req, res) => {
    try {
      const { id } = req.params;
      const partes = await parteService.getByPessoaId(Number(id));
      res.status(200).json(partes);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };

  createParteForPessoa = async (req, res) => {
    try {
      const { id } = req.params;
      const payload = { ...req.body, id_pessoa: Number(id), id_usuario: undefined };
      const created = await parteService.create(payload);
      res.status(201).json(created);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  };
}

import service from '../service/Pessoa.js';
import parteService from '../service/Parte.js';
export default new PessoaController();