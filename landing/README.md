# FontMar.ai

Página principal: daqui o leitor escolhe para onde ir. Hoje só **Livros** existe; as outras opções aparecem como
"em breve".

Vite + React + TypeScript, Tailwind v4 e shadcn/ui.

## Rodar

```bash
npm install
cp .env.example .env   # e preencha VITE_URL_LIVROS com o endereço do site dos livros
npm run dev
```

```bash
npm run build   # confere os tipos e gera dist/
npm run lint
```

Componentes do shadcn: `npx shadcn@latest add <nome>`. As opções da página ficam em `OPCOES`, no `src/App.tsx`.
