export default class LocalizacaoFisica {
  #id;
  #id_processo; // FK para Processo (Relação 1:1)
  #sala;
  #estante;
  #caixa;

  constructor({ id, id_processo, sala, estante, caixa } = {}) {
    this.id = id;
    this.id_processo = id_processo;
    this.sala = sala;
    this.estante = estante;
    this.caixa = caixa;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get id_processo() { return this.#id_processo; }
  set id_processo(value) { this.#id_processo = value; }

  get sala() { return this.#sala; }
  set sala(value) { this.#sala = value; }

  get estante() { return this.#estante; }
  set estante(value) { this.#estante = value; }

  get caixa() { return this.#caixa; }
  set caixa(value) { this.#caixa = value; }
}