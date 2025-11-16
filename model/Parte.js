import { isPapelValido, isPapelUsuario, isPapelPessoa } from './Papeis.js';

export default class Parte {

    #id;
    #id_processo; 
    #id_usuario;  
    #id_pessoa;   
    #id_papel;    
    #data_criacao;
    #criado_por;

    constructor({ id, id_processo, id_papel, id_usuario, id_pessoa, data_criacao, criado_por } = {}) {
        
        // 1. Inicialização de campos via setters (garantindo encapsulamento)
        this.id = id;
        this.id_processo = id_processo;
        this.id_papel = id_papel ?? null;

        // 2. Validação XOR (Exclusivo Ou) para id_usuario e id_pessoa
        this.id_usuario = id_usuario ?? null;
        this.id_pessoa = id_pessoa ?? null;

        if (this.id_usuario && this.id_pessoa) {
            throw new Error('Apenas um entre id_usuario ou id_pessoa deve ser informado.');
        }
        if (!this.id_usuario && !this.id_pessoa) {
            throw new Error('Informe id_usuario ou id_pessoa.');
        }

        // 3. MOVIMENTO E CORREÇÃO: Bloco de validação de Papel
        // O código de validação foi MOVIDO para DENTRO do constructor.
        if (!isPapelValido(this.id_papel)) {
            throw new Error('id_papel inválido');
        }
        if (this.id_usuario && !isPapelUsuario(this.id_papel)) {
            throw new Error('id_papel deve ser um papel de Usuário do sistema');
        }
        if (this.id_pessoa && !isPapelPessoa(this.id_papel)) {
            throw new Error('id_papel deve ser um papel de Pessoa não-usuária');
        }

        // 4. Finalização da inicialização
        this.data_criacao = data_criacao;
        this.criado_por = criado_por;
    }

    // Getters e Setters (Estrutura OK)
    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get id_processo() { return this.#id_processo; }
    set id_processo(value) { this.#id_processo = value; }

    get id_usuario() { return this.#id_usuario; }
    set id_usuario(value) { this.#id_usuario = value; }

    get id_pessoa() { return this.#id_pessoa; }
    set id_pessoa(value) { this.#id_pessoa = value; }

    get id_papel() { return this.#id_papel; }
    set id_papel(value) { this.#id_papel = value; }

    get data_criacao() { return this.#data_criacao; }
    set data_criacao(value) { this.#data_criacao = value; }

    get criado_por() { return this.#criado_por; }
    set criado_por(value) { this.#criado_por = value; }
}