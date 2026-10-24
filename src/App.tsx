import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BookOpen, FlaskConical, Newspaper, Wrench } from 'lucide-react'

import { EmConstrucao } from '@/components/EmConstrucao'
import { Marca } from '@/components/Marca'
import { Newsletter } from '@/components/Newsletter'
import { ExperimentosRecentes, Livros } from '@/components/Vitrine'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { EM_CONSTRUCAO } from '@/rotas'

// a estante e os experimentos vêm do site dos livros, no mesmo domínio (vite.config.ts)
const URL_ESTANTE = '/livros/'
const URL_EXPERIMENTOS = '/experimentos/'

type Opcao = {
  titulo: string
  descricao: string
  icone: LucideIcon
  href: string
  pronto: boolean
}

// Livros e Experimentos existem hoje; as outras levam à página "em construção" até virarem produto.
const OPCOES: Opcao[] = [
  {
    titulo: 'Experimentos',
    descricao: 'Uma afirmação que circula, testada com código que roda e medida, com o resultado gravado.',
    icone: FlaskConical,
    href: URL_EXPERIMENTOS,
    pronto: true,
  },
  {
    titulo: 'Livros',
    descricao: 'Livros técnicos em que o código se monta e o terminal roda no meio do texto.',
    icone: BookOpen,
    href: URL_ESTANTE,
    pronto: true,
  },
  { titulo: 'Newsletter', descricao: 'O experimento do dia, no seu e-mail.', icone: Newspaper, href: '/newsletter', pronto: true },
  { titulo: 'Ferramentas', descricao: 'Em construção.', icone: Wrench, href: '/ferramentas', pronto: false },
]


function Cabecalho() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
      <Marca />
      <nav className="flex items-center gap-6 text-sm text-muted-foreground">
        {OPCOES.map((opcao) => (
          <a
            key={opcao.titulo}
            href={opcao.href}
            className={cn('hidden hover:text-foreground sm:inline', !opcao.pronto && 'opacity-60')}
          >
            {opcao.titulo}
          </a>
        ))}
        {/* ainda não há login: o botão leva à página "em construção" */}
        <Button asChild variant="outline" className="rounded-full">
          <a href="/entrar">Entrar</a>
        </Button>
        <Button asChild className="rounded-full">
          <a href={URL_ESTANTE}>Começar</a>
        </Button>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:pt-24">
      <p className="text-sm text-muted-foreground">
        Para quem quer aprender IA fazendo, não só lendo sobre ela.
      </p>
      <h1 className="mt-4 font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
        Engenharia de IA
        <br />
        do primeiro princípio à produção
      </h1>
      <Button asChild size="lg" className="mt-8 rounded-full px-6">
        <a href={URL_ESTANTE}>
          Começar pelos livros
          <ArrowRight />
        </a>
      </Button>
    </section>
  )
}

function CardOpcao({ opcao }: { opcao: Opcao }) {
  const Icone = opcao.icone
  return (
    <a
      href={opcao.href}
      className="rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Card
        className={cn(
          'h-full w-64 shrink-0 transition hover:-translate-y-1 hover:ring-primary/40 sm:w-72',
          !opcao.pronto && 'opacity-60',
        )}
      >
        <div className="mx-4 flex h-32 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icone className="size-12" strokeWidth={1.5} />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{opcao.titulo}</CardTitle>
          <CardDescription>{opcao.descricao}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}

function FaixaDeOpcoes() {
  return (
    <section
      aria-label="O que tem aqui"
      className="overflow-x-auto pt-2 pb-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="mx-auto flex w-max gap-6 px-[10vw]">
        {OPCOES.map((opcao) => (
          <CardOpcao key={opcao.titulo} opcao={opcao} />
        ))}
      </div>
    </section>
  )
}

function Rodape() {
  return (
    <footer className="mx-auto mt-16 max-w-6xl border-t px-4 py-8 text-center text-sm text-muted-foreground">
      <a href="https://github.com/Erick-Marinho" className="hover:text-foreground">
        GitHub
      </a>
    </footer>
  )
}

export default function App() {
  const caminho = window.location.pathname.replace(/\/+$/, '') || '/'
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Cabecalho />
      <main>
        {caminho === '/' ? (
          <>
            <Hero />
            <FaixaDeOpcoes />
            <ExperimentosRecentes />
            <Livros />
          </>
        ) : caminho === '/newsletter' ? (
          <Newsletter />
        ) : (
          <EmConstrucao titulo={EM_CONSTRUCAO[caminho] ?? 'Esta página'} />
        )}
      </main>
      <Rodape />
    </div>
  )
}
