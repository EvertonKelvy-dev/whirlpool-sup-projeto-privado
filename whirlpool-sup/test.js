const assert = require("assert");
const { processar } = require("./src/core");

const u = "teste";
assert(processar(u, "menu").texto.includes("WHIRLPOOL SUP 1.0"));
assert(processar(u, "1").texto.includes("TAGS E APONTAMENTOS"));
assert(processar(u, "xyz").texto.includes("não reconhecido"));
assert(processar(u, "VOLTAR").texto.includes("Selecione"));
assert(processar(u, "10").texto.includes("INVÁLIDA"));
assert(processar(u, "2").texto.includes("em desenvolvimento"));
console.log("Todos os testes passaram.");
