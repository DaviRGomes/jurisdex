export default class Vara {
    #id;
    #nome;
    #localizacao;
  constructor({ id, nome, localizacao } = {}) {
    this.id = id;
    this.nome = nome;
    this.localizacao = localizacao;
  }
        
  get id() {
    return this.#id;
  }
        
  set id(value) {
    this.#id = value;
  }
        
  get nome() {
    return this.#nome;
  }
        
  set nome(value) {
    this.#nome = value;
  }
        
  get localizacao() {
    return this.#localizacao;
  }  
  set localizacao(value) {
    this.#localizacao = value;
  }
}