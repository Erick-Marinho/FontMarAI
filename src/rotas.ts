// As páginas que são da própria landing. Todo o resto (livros, guias e os arquivos deles) vem do site dos livros:
// o vite.config.ts repassa para lá, e o site fica num domínio só.
export const PAGINAS = ['/newsletter']

// as que ainda não têm conteúdo: levam à página "em construção"
export const EM_CONSTRUCAO: Record<string, string> = {
  '/ferramentas': 'Ferramentas',
  '/entrar': 'Entrar',
}
