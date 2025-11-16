export default class Audiencia {
  #id;
  #id_processo; // FK para Processo (Relação 1:M)
  #data;
  #tipo;        // Ex: 'Instrução e Julgamento'
  #resultado;
  #id_juiz;     // FK opcional para Usuario (o Juiz responsável)

  constructor({ id, id_processo, data, tipo, resultado, id_juiz } = {}) {
    this.id = id;
    this.id_processo = id_processo;
    this.data = data;
    this.tipo = tipo;
    this.resultado = resultado;
    this.id_juiz = id_juiz;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get id_processo() { return this.#id_processo; }
  set id_processo(value) { this.#id_processo = value; }

  get data() { return this.#data; }
  set data(value) { this.#data = value; }

  get tipo() { return this.#tipo; }
  set tipo(value) { this.#tipo = value; }

  get resultado() { return this.#resultado; }
  set resultado(value) { this.#resultado = value; }

  get id_juiz() { return this.#id_juiz; }
  set id_juiz(value) { this.#id_juiz = value; }
}