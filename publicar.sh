#!/usr/bin/env bash
# Um site só: o build do livro por baixo, o da landing por cima (a raiz / é a landing).
set -euo pipefail
cd "$(dirname "$0")"
LIVRO=../poc_livro

(cd "$LIVRO" && npx astro build)
npm run build

rm -rf publicar && mkdir publicar
cp -r "$LIVRO"/dist/. publicar/
cp -r dist/. publicar/

echo "--- arquivos do livro trocados pelos da landing (esperado: só ./index.html)"
comm -12 <(cd "$LIVRO"/dist && find . -type f | sort) <(cd dist && find . -type f | sort)

firebase deploy --only hosting
