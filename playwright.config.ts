import { defineConfig, devices } from "@playwright/test";

/**
 * Os testes no navegador (e2e/): o site montado, servido como em produção. O astro preview se desacopla fora de um
 * terminal e devolve o controle na hora, e o Playwright precisa de um servidor que fique no ar: por isso o vite preview
 * sobre o dist/. Com um servidor já no ar na porta, ele é reaproveitado (fora do CI).
 */
const PORTA = 4329;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://127.0.0.1:${PORTA}`, trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx astro build && npx vite preview --outDir dist --port ${PORTA} --strictPort --host 127.0.0.1`,
    url: `http://127.0.0.1:${PORTA}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
