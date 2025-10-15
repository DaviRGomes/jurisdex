export default class Processo {
    #id;
    #numero_processo;
    #data_abertura;
    #situacao;
  constructor({ id, numero_processo, data_abertura, situacao } = {}) {
    this.id = id;
    this.numero_processo = numero_processo;
    this.data_abertura = data_abertura;
    this.situacao = situacao;
  }
  
  get id() {
    return this.#id;
  }
  
  set id(value) {
    this.#id = value;
  }
  
  get numero_processo() {
    return this.#numero_processo;
  }
  
  set numero_processo(value) {
    this.#numero_processo = value;
  }
  
  get data_abertura() {
    return this.#data_abertura;
  }
  
  set data_abertura(value) {
    this.#data_abertura = value;
  }
  
  get situacao() {
    return this.#situacao;
  }
  
  set situacao(value) {
    this.#situacao = value;
  }
}