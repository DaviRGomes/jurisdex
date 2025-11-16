export default class TipoDocumento {
  #id;
  #nome; // Ex: 'Petição Inicial', 'Sentença', 'Procuração'

  constructor({ id, nome } = {}) {
    this.id = id;
    this.nome = nome;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }
}