import { expect, test } from "@playwright/test";

/** A home (a landing) mostra os três experimentos mais novos, os mesmos de /experimentos/index.json, e o leitor chega a um deles. */
test("a home mostra os experimentos recentes, e o primeiro abre", async ({ page, request }) => {
  const { experimentos } = await (await request.get("/experimentos/index.json")).json();
  const recentes = experimentos.slice(0, 3) as { titulo: string; href: string }[];

  const erros: string[] = [];
  page.on("pageerror", (e) => erros.push(e.message));
  await page.goto("/");

  const secao = page.locator("section", { has: page.getByRole("heading", { name: "Experimentos recentes" }) });
  await expect(secao.getByRole("listitem").getByRole("heading")).toHaveText(recentes.map((g) => g.titulo));

  await secao.getByRole("link", { name: recentes[0].titulo }).click();
  await expect(page).toHaveURL(recentes[0].href);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(recentes[0].titulo);
  expect(erros, "erros de JavaScript nas páginas").toEqual([]);
});
