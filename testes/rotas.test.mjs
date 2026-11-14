/** Nenhum endereço do site dá em nada: a raiz é a home (a landing, docs/capacidades/um-site-so.md), /<livro>/ abre o primeiro texto, e o resto cai em "em construção". Rode depois de `astro build`. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const raiz = new URL("../", import.meta.url);
const ler = (p) => readFileSync(new URL(`dist${p}`, raiz), "utf8");
const destino = (p) => ler(p).match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];

test("a raiz é a home, e não um redirecionamento, com o caminho para a estante", () => {
  assert.equal(destino("/index.html"), undefined);
  assert.match(ler("/index.html"), /href="\/livros\/"/);
});

test("/ciclo-de-vida/ abre o livro pela introdução, uma página que existe", () => {
  const href = destino("/ciclo-de-vida/index.html");
  assert.equal(href, "/ciclo-de-vida/00-introducao/");
  assert.ok(existsSync(new URL(`dist${href}index.html`, raiz)));
});

test("o que não existe mostra a página em construção, com o caminho para os livros e os experimentos", () => {
  const html = ler("/404.html");
  assert.match(html, /em construção/);
  assert.match(html, /href="\/livros\/"/);
  assert.match(html, /href="\/experimentos\/"/);
});

test("em toda página a marca leva à home, e as páginas do site têm o Início no mesmo endereço", async () => {
  const { readdirSync } = await import("node:fs");
  const { parse } = await import("node-html-parser");
  const paginas = readdirSync(new URL("dist/", raiz), { recursive: true }).filter((f) => f.endsWith(".html"));
  const homes = new Set();
  for (const f of paginas) {
    const doc = parse(ler(`/${f}`));
    if (doc.querySelector('meta[http-equiv="refresh"]')) continue;
    // a da landing (components/landing/Marca.tsx) não tem a classe: tem o mesmo rótulo, "<nome>, início"
    const marcas = doc.querySelectorAll('a.marca, a.sm-marca, a[aria-label$=", início"]');
    assert.ok(marcas.length, `${f}: sem a marca`);
    for (const a of marcas) homes.add(a.getAttribute("href"));
    for (const a of doc.querySelectorAll(".topo-site a")) if (a.text === "Início") homes.add(a.getAttribute("href"));
  }
  assert.equal(homes.size, 1, `a marca e o Início apontam para lugares diferentes: ${[...homes].join(", ")}`);
});

test("o endereço antigo do prefácio leva à introdução", () => {
  const html = readFileSync(new URL("../dist/ciclo-de-vida/00-prefacio/index.html", import.meta.url), "utf8");
  assert.match(html, /url=\/ciclo-de-vida\/00-introducao/);
});

test("o site tem um nome só, FontMar.ai: nenhuma página diz outro, e toda marca diz este (docs/capacidades/um-site-so.md)", async () => {
  const { readdirSync } = await import("node:fs");
  const { parse } = await import("node-html-parser");
  const paginas = readdirSync(new URL("dist/", raiz), { recursive: true }).filter((f) => f.endsWith(".html"));
  for (const f of paginas) {
    const html = ler(`/${f}`);
    assert.doesNotMatch(html, /FonteMar/i, f);
    const doc = parse(html);
    if (doc.querySelector('meta[http-equiv="refresh"]')) continue;
    for (const a of doc.querySelectorAll('a.marca, a.sm-marca, a[aria-label$=", início"]')) {
      assert.equal(a.getAttribute("aria-label"), "FontMar.ai, início", f);
      // o texto da marca da landing tem as letras da animação (".gui" vira ".ai"); o nome inteiro está no rótulo
      assert.match(a.text.replace(/\s+/g, ""), /^FontMar\./, `${f}: a marca diz ${a.text}`);
    }
  }
});
