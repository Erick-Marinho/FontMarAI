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

## Etapa 2, detalhada

- **Arquivos:** os componentes saem de `landing/src/` para `src/components/landing/` (`git mv`, o histórico segue);
  `src/layouts/Landing.astro` (as fontes, o CSS da landing); `src/pages/index.astro` (deixa de redirecionar),
  `src/pages/newsletter.astro`, `src/pages/ferramentas.astro`, `src/pages/entrar.astro`; o `Vitrine` recebe as listas
  por props, de `src/lib/vitrine.ts`; `testes/landing.test.mjs`; `package.json` e `astro.config.mjs` (Tailwind).
  O resto de `landing/` (Vite, `index.html`, `main.tsx`) sai.
- **Evidência:** `npm run build` gera `/`, `/newsletter`, `/ferramentas` e `/entrar`; o teste confere que a home lista
  os mesmos livros e experimentos dos JSON e que os links abrem; as páginas da landing não carregam JavaScript; o CSS
  da landing não aparece nas páginas dos capítulos; capturas de `/` e `/newsletter` no claro e no escuro, lado a lado
  com a landing de hoje.
- **Fora:** os proxies, as listas de rotas e as variáveis de repasse (etapa 3); o nome único (etapa 3); o cabeçalho
  comum entre a landing e o resto do site.

## Registro

| Etapa | Commit | Evidência | Ok |
|---|---|---|---|
| 1 | `79a30d6` | `git log -- landing/src/App.tsx` com os 8 commits; 205/205 testes e 5/5 da gravação. `saidas:conferir` e `experimentos:conferir` já falhavam em `0a915a9` (roteiro `01.json`, passo 2) | 14/11/2026, Erick |

(redação: claude-opus-5-5)
