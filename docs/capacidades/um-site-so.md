# Um site só

**Problema.** A landing (FontMarAI) e o site dos livros são dois repositórios colados por dois proxies, e cada lado
mantém a lista das rotas do outro (`FontMarAI/src/rotas.ts` e o `daLanding` do `astro.config.mjs`). Página nova exige
mexer nos dois, testar exige subir os dois, e o nome já divergiu (FontMar.ai na landing, FonteMar.ai aqui).

**Regra que não muda.** O leitor não percebe a mudança: todo endereço que abre hoje continua abrindo, com o mesmo conteúdo.

## Decisões

- (14/11/2026, Erick) A landing vem para este repositório; os docs, os testes e as skills ficam onde estão.
- (1) O histórico da landing vem junto, com os caminhos reescritos para `landing/`, provisória até a etapa 2.
- (14/11/2026, Erick) Tailwind no site todo, sem o reset (preflight): os capítulos ficam como são.
- (2) O Tailwind só varre o `src/`: o texto dos livros e o código dos projetos não viram classe.
- (2) O reset e as cores da landing ficam no `landing.css`, carregado só nas páginas dela.
- (2) A raiz deixa de levar à estante e vira a home; o teste das rotas troca junto.
- (14/11/2026, Erick) A landing segue o vocabulário do livro: "palpite" e "executa" nas quatro frases que diziam "aposta" e "roda".

## Peças

| Peça | Função | Entrada | Saída | Cor |
|---|---|---|---|---|
| `landing/` | a landing com o histórico dela | `FontMarAI` (main) | a pasta | saiu na etapa 2 |
| `src/pages/{index,newsletter,ferramentas,entrar}.astro` | as páginas da landing, sem JavaScript | `components/landing/` | as páginas | nova |
| `Vitrine.tsx` | a home lê as listas no build, sem `fetch` | `src/lib/vitrine.ts` | a lista no HTML | existe, muda |
| `src/styles/tailwind.css`, `landing.css` | o Tailwind do site todo; o reset e as cores, só na landing | — | o CSS | nova |
| `testes/landing.test.mjs` | páginas, vitrine, sem JavaScript, o CSS da landing só nela, nenhuma classe do livro estilizada pelo Tailwind | `dist/` | `npm test` | nova |
| proxies, listas de rotas, `URL_CONTEUDO`/`URL_LANDING` | o repasse entre os dois sites | — | saem | depois |

## Etapas

1. Trazer a landing para cá com o histórico, numa pasta.
2. Recriar `/`, `/newsletter` e as páginas em construção no Astro, com a vitrine lida no build.
3. Apagar os proxies, as listas de rotas e as variáveis de repasse; um nome só.
4. Renomear o repositório para FontMarAI e arquivar o antigo (no GitHub, pelo responsável).

## Etapa 4, detalhada

- **No GitHub, pelo responsável:** renomear o `FontMarAI` de hoje (a landing) para `FontMarAI-landing` e arquivá-lo;
  depois, renomear o `poc_livro` para `FontMarAI` (o GitHub redireciona o endereço antigo).
- **Aqui, com a decisão escrita do responsável:** `git remote set-url origin` para o `FontMarAI` e o `push` dos commits.
- **Evidência:** `git remote -v` no endereço novo; `git status` em dia com `origin/main`; o repositório no GitHub com
  `src/components/landing/`.
- **Fora:** o deploy (a regra de reescrita da hospedagem sai quando o deploy for este site); renomear a pasta local.

## Registro

| Etapa | Commit | Evidência | Ok |
|---|---|---|---|
| 1 | `79a30d6` | `git log -- landing/src/App.tsx` com os 8 commits; 205/205 testes e 5/5 da gravação. `saidas:conferir` e `experimentos:conferir` já falhavam em `0a915a9` (roteiro `01.json`, passo 2) | 14/11/2026, Erick |
| 2 | `bed6928` | 211/211 testes; páginas do livro iguais pixel a pixel antes e depois (claro e escuro, 1280 e 500 px); landing igual à do FontMarAI, menos as quatro frases | 14/11/2026, Erick |
| 3 | `ca27377` | 212/212 testes; nenhuma variável de repasse fora dos docs; `npm run dev` com a home, a estante, um capítulo e a newsletter numa porta só. O `npm run tunel` não foi executado (publicaria pelo ngrok) | 14/11/2026, Erick |

(redação: claude-opus-5-5)
