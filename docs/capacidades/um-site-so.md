# Um site só

**Problema.** A landing (FontMarAI) e o site dos livros são dois repositórios colados por dois proxies, e cada lado
mantém a lista das rotas do outro (`FontMarAI/src/rotas.ts` e o `daLanding` do `astro.config.mjs`). Página nova exige
mexer nos dois, testar exige subir os dois, e o nome já divergiu (FontMar.ai na landing, FonteMar.ai aqui).

**Regra que não muda.** O leitor não percebe a mudança: todo endereço que abre hoje continua abrindo, com o mesmo conteúdo.

## Decisões

- (14/11/2026, Erick) A landing vem para este repositório; os docs, os testes e as skills ficam onde estão.
- (1) O histórico da landing vem junto (`git subtree add`), na pasta `landing/`, provisória até a etapa 2.

## Peças

| Peça | Função | Entrada | Saída | Cor |
|---|---|---|---|---|
| `landing/` | a landing com o histórico dela, ainda sem rodar aqui | `FontMarAI` (main) | a pasta | nova, provisória |
| páginas da landing no Astro | `/`, `/newsletter` e as "em construção" | componentes da landing | as páginas | depois |
| vitrine no build | a home lê as coleções, sem `fetch` | `src/lib/vitrine.ts` | a lista no HTML | depois |
| proxies, listas de rotas, `URL_CONTEUDO`/`URL_LANDING` | o repasse entre os dois sites | — | saem | depois |

## Etapas

1. Trazer a landing para cá com o histórico, numa pasta.
2. Recriar `/`, `/newsletter` e as páginas em construção no Astro, com a vitrine lida no build.
3. Apagar os proxies, as listas de rotas e as variáveis de repasse; um nome só.
4. Renomear o repositório para FontMarAI e arquivar o antigo (no GitHub, pelo responsável).

## Etapa 1, detalhada

- **Arquivos:** `landing/` (os arquivos versionados do FontMarAI; o `.env` não está no git e não vem).
- **Evidência:** `git log -- landing/src/App.tsx` mostra os commits da landing; `npm test` passa como antes.
- **Fora:** nada da landing roda aqui ainda; o FontMarAI continua como está.

## Registro

| Etapa | Commit | Evidência | Ok |
|---|---|---|---|

(redação: claude-opus-5-5)
