// Adaptador de TERMINAL: serve para testar o núcleo sem WhatsApp.
// Um adaptador de WhatsApp/Telegram/web faria o mesmo: chamar processar() e enviar a resposta.
const readline = require("readline");
const { processar, menu } = require("../src/core");
const config = require("../src/config");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const USUARIO = "terminal";

if (config.usandoExemplo) {
  console.log("[aviso] usando config.example.json. Crie config/config.json com seus dados reais.");
}

console.log("\nInicializando o assistente...\n");
console.log(menu());

const perguntar = () =>
  rl.question("\nCOLABORADOR: ", (msg) => {
    const resposta = processar(USUARIO, msg);
    console.log("\n" + resposta.texto);
    if (resposta.arquivo) console.log(`[anexo] ${resposta.arquivo}`);
    perguntar();
  });

perguntar();
