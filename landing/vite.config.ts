import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import { EM_CONSTRUCAO, PAGINAS } from './src/rotas.ts'

// O que é da landing: a página, os arquivos dela, as páginas dela (prontas e em construção) e, no dev, os do próprio Vite.
const paginas = [...PAGINAS, ...Object.keys(EM_CONSTRUCAO)].map((r) => r.slice(1))
const daLanding = ['index\\.html', 'assets/', 'favicon\\.svg', ...paginas, '@', 'src/', 'node_modules/']
// Todo o resto vai para o site dos livros (o build dele, servido pelo `npm run site` do poc_livro): um domínio só,
// sem backend e sem CORS, como em produção.
const doSiteDosLivros = `^/(?!$|\\?|${daLanding.join('|')})`

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const conteudo = loadEnv(mode, process.cwd(), '').URL_CONTEUDO || 'http://localhost:4321'
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, './src') },
    },
    // o preview herda o proxy e os hosts do server; os hosts do ngrok ficam liberados para o teste com domínio
    server: {
      proxy: { [doSiteDosLivros]: { target: conteudo, changeOrigin: true } },
      allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev', '.ngrok.io'],
    },
  }
})
