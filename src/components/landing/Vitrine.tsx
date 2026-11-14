import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import type { Experimento, Livro } from '@/lib/vitrine'

// A estante e os experimentos, das mesmas listas que montam /livros/ e /experimentos/ (src/lib/vitrine.ts), lidas no
// build: a lista sai pronta no HTML, sem fetch e sem estado de carregando ou de erro.

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

export function ExperimentosRecentes({ itens, titulo = 'Experimentos recentes' }: { itens: Experimento[]; titulo?: string }) {
  return (
    <Secao titulo={titulo} todos={{ href: '/experimentos/', rotulo: 'Todos os experimentos' }}>
      <ul className="divide-y">
        {itens.slice(0, 3).map((g) => (
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
    </Secao>
  )
}

export function Livros({ itens }: { itens: Livro[] }) {
  return (
    <Secao titulo="Livros" todos={{ href: '/livros/', rotulo: 'A estante' }}>
      <div className="mt-6 grid gap-5">
        {itens.map((l) => (
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
    </Secao>
  )
}
