// NÚCLEO DO BOT: não sabe nada sobre terminal, WhatsApp ou web.
// Recebe (usuarioId, mensagem) e devolve { texto, arquivo? }.
const fs = require("fs");
const path = require("path");
const config = require("./config");

const sessoes = new Map(); // usuarioId -> { estado }

const bloco = (titulo, linhas) =>
  [`========== ${titulo} ==========`, "", ...linhas, "", "Digite VOLTAR para retornar."].join("\n");

const arquivoExiste = (rel) => {
  const completo = path.join(config.raiz, rel);
  return fs.existsSync(completo) ? completo : null;
};

// Cada módulo devolve { texto, arquivo? }
const MODULOS = {
  "1": {
    nome: "TAGS E APONTAMENTOS",
    responder: () => ({
      texto: bloco("TAGS E APONTAMENTOS", [
        "Prezado colaborador, acesse o formulário",
        "oficial para registrar seus apontamentos:",
        "",
        config.links.tags,
      ]),
    }),
  },
  "2": { nome: "KAIZEN" },
  "3": {
    nome: "CARDÁPIO",
    responder: () => {
      const arq = arquivoExiste(config.arquivos.cardapio);
      return {
        texto: bloco("CARDÁPIO SEMANAL", [
          "Prezado colaborador,",
          "consulte o cardápio da semana vigente.",
          "O material vale de segunda-feira a sábado.",
          "",
          arq ? "Enviando o PDF do cardápio..." : "Cardápio semanal ainda não disponível.",
        ]),
        arquivo: arq,
      };
    },
  },
  "4": {
    nome: "CÓDIGOS EPI",
    responder: () => {
      const lista = config.codigosEPI;
      const linhas = lista.length
        ? lista.flatMap((epi, i) => [`${i + 1}. ${epi.nome}`, `   Código: ${epi.codigo}`, `   Aplicação: ${epi.aplicacao}`, ""])
        : ["O catálogo de EPIs está em fase de organização.", "Os códigos serão disponibilizados após validação oficial."];
      return { texto: bloco("CÓDIGOS EPI", linhas) };
    },
  },
  "5": {
    nome: "ATESTADOS",
    responder: () => ({
      texto: bloco("ATESTADOS", [
        "Prezado colaborador,",
        "para enviar o formulário de atestado,",
        "acesse o link oficial abaixo:",
        "",
        config.links.atestados,
      ]),
    }),
  },
  "6": {
    nome: "DDS",
    responder: () => {
      const arq = arquivoExiste(config.arquivos.dds);
      return {
        texto: bloco("DIÁLOGO DIÁRIO DE SEGURANÇA", [
          "Prezado colaborador,",
          "consulte o DDS da semana vigente.",
          "O documento traz um tema por dia, de segunda a sábado.",
          "",
          arq ? "Enviando o PDF do DDS..." : "PDF semanal ainda não disponível.",
        ]),
        arquivo: arq,
      };
    },
  },
  "7": {
    nome: "RAMAL DE EMERGÊNCIA",
    responder: () => ({
      texto: bloco("RAMAL DE EMERGÊNCIA", [
        "Contato de emergência:",
        config.emergencia.telefone,
        "",
        config.emergencia.observacao,
        "",
        "Em caso de emergência, siga imediatamente os",
        "procedimentos oficiais da unidade.",
        "Não aguarde uma resposta deste assistente.",
      ]),
    }),
  },
  "8": {
    nome: "SMART LEADER",
    responder: () => ({
      texto: bloco("SMART LEADER", [
        "Prezado colaborador,",
        "acesse o aplicativo Smart Leader para consultar",
        "novidades, oportunidades, ofertas, aniversariantes e enquetes.",
        "",
        "Link para localizar o aplicativo:",
        config.links.smartLeader,
      ]),
    }),
  },
  "9": { nome: "OUTROS ASSUNTOS" },
};

function menu() {
  const itens = Object.entries(MODULOS).map(([n, m]) => `${n}. ${m.nome}`);
  return [
    "==================================",
    "       WHIRLPOOL SUP 1.0",
    "==================================",
    "Prezado colaborador, bem-vindo ao",
    "assistente de suporte operacional.",
    "",
    "Selecione uma das opções abaixo:",
    "",
    ...itens,
    "",
    "Digite MENU para retornar ao início.",
  ].join("\n");
}

const emDesenvolvimento = (nome) => ({
  texto: bloco(nome, ["Este módulo está em desenvolvimento.", "As informações serão disponibilizadas futuramente."]),
});

function estaAutorizado(usuarioId) {
  // Lista vazia = modo aberto (só para desenvolvimento local).
  return config.autorizados.length === 0 || config.autorizados.includes(usuarioId);
}

function processar(usuarioId, mensagem) {
  if (!estaAutorizado(usuarioId)) {
    return { texto: "Acesso restrito. Este assistente está em fase de testes." };
  }

  const sessao = sessoes.get(usuarioId) || { estado: "MENU" };
  sessoes.set(usuarioId, sessao);

  const texto = String(mensagem).trim().toUpperCase();

  if (texto === "MENU" || texto === "VOLTAR") {
    sessao.estado = "MENU";
    return { texto: menu() };
  }

  if (sessao.estado !== "MENU") {
    return { texto: "Comando não reconhecido.\nDigite MENU para retornar ao menu principal." };
  }

  const modulo = MODULOS[texto];
  if (!modulo) {
    return { texto: "OPÇÃO INVÁLIDA.\nAs opções disponíveis vão de 1 a 9." };
  }

  sessao.estado = texto;
  return modulo.responder ? modulo.responder() : emDesenvolvimento(modulo.nome);
}

module.exports = { processar, menu, estaAutorizado };
