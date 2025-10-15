export default class Parte {

    #id;
    #nome;
    #papel;

  constructor({ id, nome, papel } = {}) {
    this.id = id;
    this.nome = nome;
    this.papel = papel;
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

  get papel() {
    return this.#papel;
  }

  set papel(value) {
    this.#papel = value;
  }
}