export default class Documento {
    #id;
    #nome;
    #tipo;
    #url_arquivo;

  constructor({ id, nome, tipo, url_arquivo } = {}) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.url_arquivo = url_arquivo;
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
  
  get tipo() {
    return this.#tipo;
  }
  
  set tipo(value) {
    this.#tipo = value;
  }
  
  get url_arquivo() {
    return this.#url_arquivo;
  }
  
  set url_arquivo(value) {
    this.#url_arquivo = value;
  }
}