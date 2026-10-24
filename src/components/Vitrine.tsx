import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

// O que o site dos livros publica no build (src/lib/vitrine.ts do poc_livro), no mesmo domínio da landing.
type Livro = {
  id: string
  titulo: string
  lide: string
  autores: string[]
  href: string
  comeca: string
  escritos: number
  planejados: number
}
type Guia = { id: string; titulo: string; lide: string; data: string; etiqueta: string; href: string }
type Estado<T> = { tipo: 'carregando' } | { tipo: 'erro' } | { tipo: 'pronto'; itens: T[] }

function useLista<T>(url: string, chave: string): Estado<T> {
  const [estado, setEstado] = useState<Estado<T>>({ tipo: 'carregando' })
  useEffect(() => {
    let vivo = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => vivo && setEstado({ tipo: 'pronto', itens: json[chave] }))
      .catch(() => vivo && setEstado({ tipo: 'erro' }))
    return () => {
      vivo = false
    }
  }, [url, chave])
  return estado
}

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
const dataCurta = (data: string) => {
  const [, m, d] = data.split('-').map(Number)
  return `${d} ${MESES[m - 1]}`
}

function Secao({ titulo, todos, children }: { titulo: string; todos: { href: string; rotulo: string }; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-14">
      <div className="flex items-baseline justify-between gap-4 border-b pb-3">
        <h2 className="font-heading text-2xl font-bold tracking-tight">{titulo}</h2>
        <a href={todos.href} className="text-sm font-medium text-primary hover:underline">
          {todos.rotulo} →
        </a>
      </div>
      {children}
    </section>
  )
}

function Carregando() {
  return (
    <div className="mt-6 grid gap-4" aria-busy="true">
      {[0, 1].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  )
}

function Falhou({ o, href }: { o: string; href: string }) {
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      Não deu para carregar {o} agora.{' '}
      <a href={href} className="font-medium text-primary hover:underline">
        Abrir a página
      </a>
    </p>
  )
}

export function GuiasRecentes() {
  const estado = useLista<Guia>('/guias/index.json', 'guias')
  return (
    <Secao titulo="Guias recentes" todos={{ href: '/guias/', rotulo: 'Todos os guias' }}>
      {estado.tipo === 'carregando' && <Carregando />}
      {estado.tipo === 'erro' && <Falhou o="os guias" href="/guias/" />}
      {estado.tipo === 'pronto' && (
        <ul className="divide-y">
          {estado.itens.slice(0, 3).map((g) => (
            <li key={g.id} className="py-6">
              <span className="inline-block rounded-full border border-muted-foreground px-2.5 py-px text-xs font-medium">
                {g.etiqueta}
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-tight">
                <a href={g.href} className="hover:text-primary">
                  {g.titulo}
                </a>
              </h3>
              <p className="mt-1 text-muted-foreground">{g.lide}</p>
              <time dateTime={g.data} className="mt-2 block text-xs font-medium tracking-wider text-muted-foreground">
                {dataCurta(g.data)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </Secao>
  )
}

export function Livros() {
  const estado = useLista<Livro>('/livros/index.json', 'livros')
  return (
    <Secao titulo="Livros" todos={{ href: '/livros/', rotulo: 'A estante' }}>
      {estado.tipo === 'carregando' && <Carregando />}
      {estado.tipo === 'erro' && <Falhou o="os livros" href="/livros/" />}
      {estado.tipo === 'pronto' && (
        <div className="mt-6 grid gap-5">
          {estado.itens.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="grid gap-6 rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary sm:grid-cols-[150px_1fr]"
            >
              <div
                aria-hidden="true"
                className="flex min-h-28 items-end rounded-md bg-primary p-4 font-heading text-lg leading-tight font-bold text-primary-foreground sm:aspect-[3/4]"
              >
                {l.titulo}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-semibold tracking-widest text-chart-3 uppercase">
                  {l.escritos < l.planejados ? 'em andamento' : 'completo'}
                </span>
                <h3 className="font-heading text-2xl font-bold tracking-tight">{l.titulo}</h3>
                <p className="text-muted-foreground">{l.lide}</p>
                {l.autores.length > 0 && <p className="text-sm font-medium">{l.autores.join(' e ')}</p>}
                <div className="mt-1 grid gap-1 text-xs text-muted-foreground">
                  <div className="h-1 overflow-hidden rounded bg-border">
                    <div className="h-full bg-primary" style={{ width: `${(100 * l.escritos) / l.planejados}%` }} />
                  </div>
                  {l.escritos} de {l.planejados} capítulos escritos
                </div>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                  Começar pelo {l.comeca.toLowerCase()} <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </Secao>
  )
}
