/**
 * A landing é deste site (docs/capacidades/um-site-so.md): as páginas dela saem do build, a vitrine mostra o mesmo que
 * /livros/ e /experimentos/, nada roda no navegador, e o Tailwind do site todo não muda as páginas do livro.
 * Rode depois de `astro build`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const dist = fileURLToPath(new URL("../dist", import.meta.url));
const ler = (p) => readFileSync(join(dist, p), "utf8");
const LANDING = ["/", "/newsletter/", "/ferramentas/", "/entrar/"];
const html = (p) => parse(ler(`${p}index.html`));

/* todo CSS que a página carrega: os <link> de /_astro/ e os <style> */
const cssDa = (texto) =>
  [...texto.matchAll(/<link[^>]+href="(\/_astro\/[^"]+\.css)"/g)].map((m) => ler(m[1])).join("\n") +
  [...texto.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");

/* as classes que a camada "utilities" do Tailwind estiliza */
function utilitarios(css) {
  const classes = new Set();
  for (let i = css.indexOf("@layer utilities{"); i >= 0; i = css.indexOf("@layer utilities{", i + 1)) {
    let fundo = 0, j = i;
    for (; j < css.length; j++) if (css[j] === "{") fundo++; else if (css[j] === "}" && --fundo === 0) break;
    for (const m of css.slice(i, j).matchAll(/\.((?:\\.|[\w-])+)/g)) classes.add(m[1].replace(/\\(.)/g, "$1"));
  }
  return classes;
}

function paginasDoLivro() {
  const todas = [];
  (function andar(d) {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) andar(p);
      else if (n === "index.html") todas.push(`${p.slice(dist.length).replace(/index\.html$/, "")}`);
    }
  })(dist);
  return todas.filter((p) => !LANDING.includes(p));
}

test("as páginas da landing saem do build", () => {
  for (const p of LANDING) assert.ok(existsSync(join(dist, p, "index.html")), p);
  assert.equal(html("/ferramentas/").querySelector("h1").text, "Ferramentas");
  assert.equal(html("/entrar/").querySelector("h1").text, "Entrar");
});

test("a home mostra os três experimentos mais novos e a estante, os mesmos dos JSON, e os links abrem", () => {
  const { experimentos } = JSON.parse(ler("/experimentos/index.json"));
  const { livros } = JSON.parse(ler("/livros/index.json"));
  const home = html("/");
  const secao = (titulo) => home.querySelectorAll("section").find((s) => s.querySelector("h2")?.text === titulo);
  assert.deepEqual(secao("Experimentos recentes").querySelectorAll("li h3 a").map((a) => a.getAttribute("href")), experimentos.slice(0, 3).map((g) => g.href));
  assert.deepEqual(secao("Livros").querySelectorAll("a[href]").map((a) => a.getAttribute("href")).filter((h) => h !== "/livros/"), livros.map((l) => l.href));
  for (const { href } of [...experimentos.slice(0, 3), ...livros]) assert.ok(existsSync(join(dist, href, "index.html")), href);
});

test("a newsletter mostra o que já saiu, e o formulário só liga com o endereço da plataforma", () => {
  const { experimentos } = JSON.parse(ler("/experimentos/index.json"));
  const pagina = html("/newsletter/");
  assert.deepEqual(pagina.querySelectorAll("li h3 a").map((a) => a.getAttribute("href")), experimentos.slice(0, 3).map((g) => g.href));
  const form = pagina.querySelector("form");
  const desligado = form.querySelector("input[name=email]").hasAttribute("disabled");
  assert.equal(desligado, !form.getAttribute("action"), "sem action, o campo fica desligado; com action, ligado");
});

test("as páginas da landing não carregam JavaScript", () => {
  for (const p of LANDING) assert.equal(html(p).querySelectorAll("script").length, 0, p);
});

test("o reset e as cores da landing ficam só nas páginas dela", () => {
  const daLanding = (p) => cssDa(ler(`${p}index.html`)).includes(".marca-troca");
  for (const p of LANDING) assert.ok(daLanding(p), p);
  for (const p of paginasDoLivro()) assert.ok(!daLanding(p), p);
});

test("o Tailwind não estiliza nenhuma classe das páginas do livro (só o sr-only, que faz o mesmo que o do site)", () => {
  for (const p of paginasDoLivro()) {
    const texto = ler(`${p}index.html`);
    const u = utilitarios(cssDa(texto));
    const classes = new Set([...texto.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)).filter(Boolean));
    assert.deepEqual([...classes].filter((c) => u.has(c) && c !== "sr-only"), [], p);
  }
});
