export default class Pessoa {
  #id;
  #nome;
  #documento; // CPF, CNPJ ou outro documento de identificação
  #contato;   // Ex: telefone ou e-mail

  constructor({ id, nome, documento, contato } = {}) {
    this.id = id;
    this.nome = nome;
    this.documento = documento;
    this.contato = contato;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }

  get documento() { return this.#documento; }
  set documento(value) { this.#documento = value; }

  get contato() { return this.#contato; }
  set contato(value) { this.#contato = value; }
}