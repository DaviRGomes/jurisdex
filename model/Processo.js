export default class Processo {
    #id;
    #numero_processo;
    #data_abertura;
    #situacao;
    #data_criacao;
    #data_atualizacao;

    constructor({ id, numero_processo, data_abertura, situacao, data_criacao, data_atualizacao } = {}) {
        this.id = id;
        this.numero_processo = numero_processo;
        this.data_abertura = data_abertura;
        this.situacao = situacao;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get numero_processo() {
        return this.#numero_processo;
    }
    set numero_processo(value) {
        this.#numero_processo = value;
    }

    get data_abertura() {
        return this.#data_abertura;
    }
    set data_abertura(value) {
        this.#data_abertura = value;
    }

    get situacao() {
        return this.#situacao;
    }
    set situacao(value) {
        this.#situacao = value;
    }

    get data_criacao() {
        return this.#data_criacao;
    }

    set data_criacao(value) {
        this.#data_criacao = value;
    }

    get data_atualizacao() {
        return this.#data_atualizacao;
    }

    set data_atualizacao(value) {
        this.#data_atualizacao = value;
    }
}