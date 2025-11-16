// Este objeto simula um Enum em JavaScript para papéis do processo
export const PapeisDoProcesso = {
  // Papéis que geralmente são Usuários do sistema (Advogados, Promotores, etc.)
  ADVOGADO: 1,
  PROMOTOR: 2,
  JUIZ: 3,
  DEFENSOR_PUBLICO: 4,

  // Papéis que geralmente são Pessoas não-usuárias (Réu, Vítima, etc.)
  REU: 10,
  VITIMA: 11,
  TESTEMUNHA: 12,
  AUTOR: 13,
};

// Grupos para facilitar validações
export const PAPEIS_USUARIO = [
  PapeisDoProcesso.ADVOGADO,
  PapeisDoProcesso.PROMOTOR,
  PapeisDoProcesso.JUIZ,
  PapeisDoProcesso.DEFENSOR_PUBLICO,
];

export const PAPEIS_PESSOA = [
  PapeisDoProcesso.REU,
  PapeisDoProcesso.VITIMA,
  PapeisDoProcesso.TESTEMUNHA,
  PapeisDoProcesso.AUTOR,
];

// Helpers de validação
export const isPapelValido = (idPapel) => Object.values(PapeisDoProcesso).includes(idPapel);
export const isPapelUsuario = (idPapel) => PAPEIS_USUARIO.includes(idPapel);
export const isPapelPessoa = (idPapel) => PAPEIS_PESSOA.includes(idPapel);

export default PapeisDoProcesso;