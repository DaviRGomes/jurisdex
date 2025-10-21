export default class Vara {
    #id;
    #nome;
    #localizacao;
    
    constructor({ id, nome, localizacao } = {}) {
        // CORREÇÃO: Usar os setters no construtor para inicializar os campos privados
        this.id = id;
        this.nome = nome;
        this.localizacao = localizacao;
    }
    
    // Getters e Setters para #id, #nome, #localizacao
    get id() { return this.#id; }
    set id(value) { this.#id = value; }
    
    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }
    
    get localizacao() { return this.#localizacao; }
    set localizacao(value) { this.#localizacao = value; }
}