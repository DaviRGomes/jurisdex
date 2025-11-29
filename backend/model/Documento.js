/**
 * @typedef {object} DocumentoProps
 * @property {number} id - O identificador único do documento. (Usamos 'number' pois é o tipo numérico padrão do JS)
 * @property {string} nome - O nome do documento.
 * @property {string} tipo - O tipo do documento (ex: 'PDF', 'DOCX').
 * @property {string} url_arquivo - A URL para o arquivo.
 */

export default class Documento {
    #id;
    #nome;
    #tipo;
    #url_arquivo;
    #id_processo;
    #id_tipo_documento; // FK para TipoDocumento
    #data_criacao;
    #criado_por;        // ID do Usuário que criou

    constructor({ id, nome, tipo, url_arquivo, id_processo, id_tipo_documento, data_criacao, criado_por } = {}) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.url_arquivo = url_arquivo;
        this.id_processo = id_processo;
        this.id_tipo_documento = id_tipo_documento;
        this.data_criacao = data_criacao;
        this.criado_por = criado_por;
    }

    get id() { return this.#id; }
    set id(value) { this.#id = value; }
    
    
    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }


    get tipo() { return this.#tipo; }
    set tipo(value) { this.#tipo = value; }

    
    get url_arquivo() { return this.#url_arquivo; }
    set url_arquivo(value) { this.#url_arquivo = value; }

    get id_processo() { return this.#id_processo; }
    set id_processo(value) { this.#id_processo = value; }

    get id_tipo_documento() { return this.#id_tipo_documento; }
    set id_tipo_documento(value) { this.#id_tipo_documento = value; }

    get data_criacao() { return this.#data_criacao; }
    set data_criacao(value) { this.#data_criacao = value; }

    get criado_por() { return this.#criado_por; }
    set criado_por(value) { this.#criado_por = value; }
}