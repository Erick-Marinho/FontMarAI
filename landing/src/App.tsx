import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BookOpen, GraduationCap, Newspaper, Wrench } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const URL_LIVROS = import.meta.env.VITE_URL_LIVROS || '#'

type Opcao = {
  titulo: string
  descricao: string
  icone: LucideIcon
  href?: string
}

// Só Livros existe hoje; as outras guardam o lugar até virarem produto.
const OPCOES: Opcao[] = [
  {
    titulo: 'Livros',
    descricao: 'Livros técnicos em que o código se monta e o terminal roda no meio do texto.',
    icone: BookOpen,
    href: URL_LIVROS,
  },
  { titulo: 'Cursos', descricao: 'Em breve.', icone: GraduationCap },
  { titulo: 'Newsletter', descricao: 'Em breve.', icone: Newspaper },
  { titulo: 'Ferramentas', descricao: 'Em breve.', icone: Wrench },
]

function Cabecalho() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
      <a href="/" className="font-heading text-lg font-bold tracking-tight">
        FontMar<span className="text-primary">AI</span>
      </a>
      <nav className="flex items-center gap-6 text-sm text-muted-foreground">
        {OPCOES.map((opcao) => (
          <a
            key={opcao.titulo}
            href={opcao.href}
            aria-disabled={!opcao.href}
            className={cn(
              'hidden sm:inline',
              opcao.href ? 'hover:text-foreground' : 'pointer-events-none opacity-50',
            )}
          >
            {opcao.titulo}
          </a>
        ))}
        <Button asChild className="rounded-full">
          <a href={URL_LIVROS}>Começar</a>
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
        <a href={URL_LIVROS}>
          Começar pelos livros
          <ArrowRight />
        </a>
      </Button>
    </section>
  )
}

function CardOpcao({ opcao }: { opcao: Opcao }) {
  const Icone = opcao.icone
  const conteudo = (
    <Card
      className={cn(
        'h-full w-64 shrink-0 transition sm:w-72',
        opcao.href ? 'hover:-translate-y-1 hover:ring-primary/40' : 'opacity-60',
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
  )

  return opcao.href ? (
    <a
      href={opcao.href}
      className="rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {conteudo}
    </a>
  ) : (
    conteudo
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
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Cabecalho />
      <main>
        <Hero />
        <FaixaDeOpcoes />
      </main>
      <Rodape />
    </div>
  )
}
