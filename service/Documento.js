class DocumentoService {
    #repository;
    constructor() {
        this.repository = repository;
    }

    async getAll() {
        const documentos = await this.repository.getAll();
        if (!documentos || documentos.length === 0) {
            throw { status: 404, message: 'Nenhum documento encontrado' };
        }
        return documentos;
    }

    async getById(id) {
        if (!id) throw { status: 400, message: 'ID é obrigatório' };
        const doc = await this.repository.getById(id);
        if (!doc) throw { status: 404, message: 'Documento não encontrado' };
        return doc;
    }

    async getByName(nome) {
        if (!nome) throw { status: 400, message: 'Nome é obrigatório' };
        const docs = await this.repository.getByName(nome);
        if (!docs || docs.length === 0) throw { status: 404, message: 'Nenhum documento encontrado com esse nome' };
        return docs;
    }

    async create(payload) {

        const doc = new Documento(payload);

        if (!doc.nome || !doc.tipo || !doc.url_arquivo) {
            throw { status: 400, message: 'nome, tipo e url_arquivo são obrigatórios' };
        }

        const created = await this.repository.create({
            nome: doc.nome,
            tipo: doc.tipo,
            url_arquivo: doc.url_arquivo
        });

        return created;
    }

    async update(id, { nome, tipo, url_arquivo }) {
        if (!id) throw { status: 400, message: 'ID é obrigatório' };
        if (!nome || !tipo || !url_arquivo) throw { status: 400, message: 'nome, tipo e url_arquivo são obrigatórios' };
        const existing = await this.repository.getById(id);
        if (!existing) throw { status: 404, message: 'Documento não encontrado para atualização' };
        const updated = await this.repository.update(id, { nome, tipo, url_arquivo });
        return updated;
    }

    async delete(id) {
        if (!id) throw { status: 400, message: 'ID é obrigatório' };
        const existing = await this.repository.getById(id);
        if (!existing) throw { status: 404, message: 'Documento não encontrado para exclusão' };
        const deleted = await this.repository.delete(id);
        return deleted;
    }
}

import Documento from '../model/Documento.js';
import repository from '../repository/Documento.js';
export default new DocumentoService();