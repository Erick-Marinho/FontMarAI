#!/usr/bin/env bash
# npm run dev: o site todo (a landing, os livros e os experimentos) em astro dev, que recarrega quando você edita.
# Uso: npm run dev (outra porta: npm run dev -- --port 4330)
set -euo pipefail
# o Astro deixa um astro dev por projeto: um segundo só avisa que já há um e sai, e quem responderia seria o antigo.
# Para ele antes.
antigo=$(npx astro dev status 2>&1 | grep -o 'running at [^ ]* (pid [0-9]*' | sed 's/running at \(.*\) (pid \(.*\)/\1, pid \2/' || true)
[ -n "$antigo" ] && npx astro dev stop >/dev/null 2>&1 && echo "parei o astro dev que já rodava neste projeto ($antigo); este fica no lugar dele"
# ao sair (Ctrl+C), para o astro dev (fora de um terminal, ele roda desacoplado e volta na hora)
trap 'npx astro dev stop >/dev/null 2>&1' EXIT
# o --force não limpa o registro de conteúdo do dev: com o esquema e um .mdx mudados juntos, o astro dev relê o .mdx com
# o esquema antigo e guarda o resultado (um campo novo some no dev e aparece no build). Ele se refaz ao iniciar.
rm -f .astro/data-store.json
# --force: o conteúdo é remontado do zero; um astro dev antigo pode ter gravado o cache com um esquema que já mudou
npx astro dev --force "$@"
