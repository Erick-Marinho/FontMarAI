import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BookOpen, FlaskConical, Newspaper, Wrench } from 'lucide-react'

import { EmConstrucao } from '@/components/landing/EmConstrucao'
import { Marca } from '@/components/landing/Marca'
import { Newsletter } from '@/components/landing/Newsletter'
import { ExperimentosRecentes, Livros } from '@/components/landing/Vitrine'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Experimento, Livro } from '@/lib/vitrine'

// As páginas da landing (src/pages/index.astro, newsletter.astro, ferramentas.astro, entrar.astro), montadas no build,
// sem JavaScript no navegador. A estante e os experimentos são deste mesmo site.
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
    descricao: 'Uma afirmação que circula, testada com código que executa e medida, com o resultado gravado.',
    icone: FlaskConical,
    href: URL_EXPERIMENTOS,
    pronto: true,
  },
  {
    titulo: 'Livros',
    descricao: 'Livros técnicos em que o código se monta e o terminal executa no meio do texto.',
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

// o cabeçalho e o rodapé de toda página da landing
function Moldura({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Cabecalho />
      <main>{children}</main>
      <Rodape />
    </div>
  )
}

export function PaginaInicio({ experimentos, livros }: { experimentos: Experimento[]; livros: Livro[] }) {
  return (
    <Moldura>
      <Hero />
      <FaixaDeOpcoes />
      <ExperimentosRecentes itens={experimentos} />
      <Livros itens={livros} />
    </Moldura>
  )
}

export function PaginaNewsletter({ experimentos }: { experimentos: Experimento[] }) {
  return (
    <Moldura>
      <Newsletter experimentos={experimentos} />
    </Moldura>
  )
}

// o que ainda não tem conteúdo (ferramentas, entrar): o link leva a algum lugar, e o lugar diz que está sendo feito
export function PaginaEmConstrucao({ titulo }: { titulo: string }) {
  return (
    <Moldura>
      <EmConstrucao titulo={titulo} />
    </Moldura>
  )
}
