export default class Usuario {
    #id;
    #nome;
    #email;
    #senha;
    #papel_sistema;
  constructor({ id, nome, email, senha, papel_sistema } = {}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.papel_sistema = papel_sistema;
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
  
  get email() {
    return this.#email;
  }
  
  set email(value) {
    this.#email = value;
  }
  
  get senha() {
    return this.#senha;
  }
  
  set senha(value) {
    this.#senha = value;
  }
  
  get papel_sistema() {
    return this.#papel_sistema;
  }
  
}