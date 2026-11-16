// Carrega config/config.json (privado, fora do Git).
// Se não existir, usa o config.example.json só para você conseguir testar.
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const privado = path.join(raiz, "config", "config.json");
const exemplo = path.join(raiz, "config", "config.example.json");

const arquivo = fs.existsSync(privado) ? privado : exemplo;
const config = JSON.parse(fs.readFileSync(arquivo, "utf8"));

config.raiz = raiz;
config.usandoExemplo = arquivo === exemplo;

module.exports = config;
