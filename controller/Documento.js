class DocumentoController {
    constructor() {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const documentos = await this.service.getAll();
            res.status(200).json(documentos);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await this.service.getById(Number(id));
            res.status(200).json(documento);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
        }
    };

    getByName = async (req, res) => {
        try {
            const { nome } = req.params;
            const documentos = await this.service.getByName(nome);
            res.status(200).json(documentos);
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
}

import service from '../service/Documento.js';
export default new DocumentoController();
