# Livros que Rodam (poc)

Livros técnicos em que o código se monta e o terminal roda no meio do texto.
O capítulo é escrito em MDX (Markdown com componentes); o Astro monta o site.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321: a landing do FontMar.ai, os livros e os experimentos; recarrega quando você edita
npm run tunel    # o túnel do FontMar.ai (ngrok), remontado sozinho a cada mudança
npm test         # monta o site e confere as saídas do livro
npm run saidas   # roda os comandos do livro no projeto e grava as saídas
npm run site     # monta e serve o site em http://localhost:4321, como em produção
npm run publicar # monta e publica no Firebase Hosting, no site principal do projeto fontemar-ai (https://fontemar-ai.web.app)
```

Um site só: a landing (`/`, `/newsletter` e as páginas em construção, em `src/components/landing/`), a estante, os
livros e os experimentos (docs/capacidades/um-site-so.md). A home lê os experimentos e a estante no build
(`src/lib/vitrine.ts`), as mesmas listas de `/livros/` e `/experimentos/`.

A inscrição da newsletter vai para a plataforma de envio, pelo endereço do formulário dela em `VITE_NEWSLETTER_ACAO`
(`.env.example`; o campo se chama `email`). Sem a variável, o formulário sai desligado, com "as inscrições abrem em
breve", e nenhum e-mail é recolhido. Ela é lida no build.

O `npm run tunel` mostra a pasta para quem está de fora, como em produção: o site montado (porta 4322) e o ngrok
apontando para ele. Ele sobe o que não estiver no ar e fica de olho em `livros/`, `experimentos/`, `src/` e `public/`:
poucos segundos depois de uma mudança, remonta o site. O build vai para `.tunel/` e só troca a versão no ar quando dá
certo; com o build quebrado, o túnel segue na última versão boa. Ctrl+C para o que ele subiu.

Para o projeto do livro (Python): [uv](https://docs.astral.sh/uv/).

Node 22.12 ou mais novo.

## Onde fica cada coisa

| Pasta | O que tem |
|---|---|
| `livros/<livro>/capitulos/*.mdx` | o texto de cada capítulo |
| `livros/<livro>/projeto/` | o código real que o leitor constrói; as listagens leem daqui |
| `livros/<livro>/marcos/cap-NN/` | o projeto congelado no fim do capítulo NN; o capítulo NN lê daqui |
| `livros/<livro>/comandos.json` | os comandos que o livro mostra no terminal |
| `livros/<livro>/saidas.json` | o que esses comandos mostram de verdade (gravado pelo `npm run saidas`) |
| `scripts/saidas.py` | grava e confere as saídas; a conferência falha se o código mudar e o livro não |
| `src/components/livro/` | os componentes do livro: `Listagem`, `Terminal`, `Nota`, `PareEPense`, `Classificador`, `Exercicio`, `Resumo`, `PontoDeVolta` |
| `testes/` | os testes do livro (montagem, código, saídas) |

## Escrever um trecho

```mdx
import Listagem from "../../../src/components/livro/Listagem.astro";
import agente from "../projeto/agente.py?raw";

<Listagem codigo={agente} nome="agente.py" linhas="7-17" notas={{ 12: "o que esta linha faz" }} />
```

`linhas="7-17"` mostra o arquivo até a linha 17 e marca de 7 a 17 como novas.
Título de seção com número: `## 1.4 As perguntas de referência`.

## Estado

Formato pronto: fonte em MDX, `Listagem` e `Terminal`.
Livro em andamento: *O ciclo de vida de um agente*. O projeto do capítulo 1 está congelado em
`livros/ciclo-de-vida/marcos/cap-01/` (a loja inventada, o contrato, as perguntas de referência e a nota de partida);
o `projeto/` é sempre o capítulo mais novo.
Escritos: prefácio e capítulo 1 (rascunhos para revisão).
