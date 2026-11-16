# Whirlpool SUP 1.0

Assistente de suporte operacional. O núcleo (`src/core.js`) não depende de canal:
recebe `(usuarioId, mensagem)` e devolve `{ texto, arquivo? }`.

## Rodar
```
npm start     # testa no terminal
npm test      # testes do núcleo
```

## Estrutura
- `src/core.js`: menus e regras (o que o bot responde)
- `src/config.js`: carrega a configuração privada
- `adapters/terminal.js`: canal de teste. Um adaptador de WhatsApp/Telegram/web seria outro arquivo aqui
- `config/config.example.json`: modelo. Copie para `config/config.json` e preencha

## Privacidade (mostrar só a pessoas específicas)
1. **Repositório privado** no GitHub (Settings > Danger Zone > Change visibility).
   O GitHub Pages público não restringe acesso; para páginas privadas é preciso plano Enterprise.
   Enquanto isso, a página pode ficar só no seu computador ou ser enviada em arquivo.
2. **Dados reais fora do Git:** `config/config.json` e `materials/` estão no `.gitignore`.
   Links de formulários, ramal e PDFs ficam só na sua máquina.
3. **Lista de autorizados:** em `config.json`, preencha `"autorizados"` com os IDs
   (no WhatsApp, o número). Lista vazia = modo aberto, só para desenvolvimento.
4. Antes de qualquer uso real, alinhe com seu futuro líder e com a TI/segurança da empresa.
5. Se algum link ou dado interno já foi publicado no repositório público, remova-o do histórico
   ou apague e recrie o repositório.

## Página web (web/)
Abra `web/index.html` com duplo clique no navegador. Ela usa as imagens que estão na mesma pasta:
- `whirlpool-sup-banner.png`
- `whirlpool-sup-banner - boasvindas.png` (o nome precisa ter exatamente esses espaços e hífen, igual ao código)

O link do cardápio (`../materials/cardapio/cardapio-semana.pdf`) funciona colocando o PDF em `materials/cardapio/`.
Atenção: a `index.html` contém links reais de formulários. Não publique em repositório público.

## Atualizações semanais (web/materiais/)
- `cardapio-semana.jpg`: substitua pela imagem da semana, mantendo o mesmo nome.
- `quebra-de-rotina.jpg`: imagem da Quebra de Rotina. Quando não houver, apague o bloco `especial` em `CARDAPIO` no `index.html`.
- DDS: ainda sem arquivo (a página informa "em breve").
