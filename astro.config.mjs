import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import { secoesNumeradas } from "./src/lib/secoes.mjs";

/* o astro dev guarda o cache de dependências do Vite numa pasta só dele: um astro build (o npm test) reescreve
   node_modules/.vite com o React de produção e sem as dependências das ilhas, e um astro dev que já estava rodando
   passa a responder 504 ("Outdated Optimize Dep"), e as ilhas não carregam */
const cacheDoDev = {
  name: "cache-do-dev",
  hooks: { "astro:config:setup": ({ command, updateConfig }) => { if (command === "dev") updateConfig({ vite: { cacheDir: "node_modules/.vite-dev" } }); } },
};

export default defineConfig({
  /* o túnel (npm run tunel) chega pelo domínio do ngrok; qualquer outro host recebe 403 */
  server: { allowedHosts: [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.app", ".ngrok.dev", ".ngrok.io"] },
  /* react: só nas figuras que precisam de uma ilha interativa (a do agente, na introdução) */
  integrations: [mdx(), react(), cacheDoDev],
  /* os guias viraram experimentos (docs/capacidades/experimentos.md): link antigo já compartilhado não quebra */
  redirects: { "/guias": "/experimentos", "/guias/[experimento]": "/experimentos/[experimento]",
    /* o prefácio virou introdução (25/10/2026): link já compartilhado não quebra */
    "/ciclo-de-vida/00-prefacio": "/ciclo-de-vida/00-introducao" },
  /* smartypants desligado: as aspas e os traços saem como o autor escreveu */
  markdown: { processor: unified({ rehypePlugins: [secoesNumeradas], smartypants: false }) },
  /* o Tailwind do site todo, sem o reset (src/styles/tailwind.css) */
  vite: { plugins: [tailwindcss()], server: {
    /* dependências Python e cópias geradas esgotam os watchers; o dev passa a misturar texto antigo e componentes novos */
    watch: { ignored: /[/\\](?:\.venv|\.leitor|\.tunel|__pycache__)(?:[/\\]|$)/ },
  } },
});
