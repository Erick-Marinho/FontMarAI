# FontMar.ai

Página principal: daqui o leitor escolhe para onde ir. Os guias e os livros vêm do site dos livros
([poc_livro](https://github.com/Erick-Marinho/poc_livro)); ferramentas e o login aparecem como "em construção".

A página da newsletter (`/newsletter`) é da landing. A inscrição vai para a plataforma de envio, pelo endereço do
formulário dela em `VITE_NEWSLETTER_ACAO` (o campo se chama `email`; confira o nome que a plataforma espera). Sem a
variável, o formulário aparece desligado, com "as inscrições abrem em breve", e nenhum e-mail é recolhido.

Vite + React + TypeScript, Tailwind v4 e shadcn/ui. Sem backend.

## Um domínio só

A landing é dona de `/`, `/assets/`, `/favicon.svg` e das páginas em construção (`src/rotas.ts`). Todo o resto
(`/livros/`, `/guias/`, os capítulos, os arquivos `/_astro/`) o Vite repassa para o site dos livros, em `URL_CONTEUDO`.
A landing lê `/livros/index.json` e `/guias/index.json`, que o site dos livros gera no build. Em produção, o mesmo
desenho vira uma regra de reescrita na hospedagem: o que não é da landing vai para o deploy do site dos livros.

## Rodar

```bash
# 1. o site dos livros, montado (no poc_livro)
npm run site                 # build + preview em http://localhost:4321

# 2. a landing (aqui)
npm install
cp .env.example .env         # URL_CONTEUDO=http://localhost:4321
npm run dev                  # http://localhost:5173, ou:
npm run build && npm run preview   # http://localhost:4173, como em produção
```

O repasse precisa do site dos livros **montado** (`npm run site`): o `astro dev` serve arquivos do próprio Vite, que se
confundem com os da landing. Para escrever os livros, use o `npm run dev` do poc_livro direto na porta dele.

## Testar com um domínio (ngrok)

```bash
npm run build && npm run preview   # a landing em http://localhost:4173
ngrok http 4173
```

Um túnel basta: livros e guias passam pela landing. Os domínios do ngrok já estão liberados em `vite.config.ts`
(`allowedHosts`); qualquer outro host recebe 403. No plano grátis, o ngrok mostra um aviso na primeira visita.

```bash
npm run build   # confere os tipos e gera dist/
npm run lint
```

Componentes do shadcn: `npx shadcn@latest add <nome>`. As opções da página ficam em `OPCOES`, no `src/App.tsx`.
