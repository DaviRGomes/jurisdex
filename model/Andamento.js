export default class Andamento {
  #id;
  #id_processo;    // FK para Processo (Relação 1:M)
  #data_registro;  // Data e hora do evento
  #descricao;      // Detalhe da movimentação
  #tipo_andamento; // Tipo (Ex: 'Despacho', 'Petição')

  constructor({ id, id_processo, data_registro, descricao, tipo_andamento } = {}) {
    this.id = id;
    this.id_processo = id_processo;
    this.data_registro = data_registro;
    this.descricao = descricao;
    this.tipo_andamento = tipo_andamento;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get id_processo() { return this.#id_processo; }
  set id_processo(value) { this.#id_processo = value; }

  get data_registro() { return this.#data_registro; }
  set data_registro(value) { this.#data_registro = value; }

  get descricao() { return this.#descricao; }
  set descricao(value) { this.#descricao = value; }

  get tipo_andamento() { return this.#tipo_andamento; }
  set tipo_andamento(value) { this.#tipo_andamento = value; }
}