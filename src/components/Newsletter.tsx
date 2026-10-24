import { useId } from 'react'
import { CircleCheck, Mail, Terminal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GuiasRecentes } from '@/components/Vitrine'

// O endereço do formulário da plataforma de envio (o "action" do formulário de inscrição dela). Enquanto a plataforma
// não for escolhida, ele fica vazio: o formulário aparece desligado e nenhum e-mail é recolhido.
const ACAO = import.meta.env.VITE_NEWSLETTER_ACAO || ''

const O_QUE_CHEGA: { icone: LucideIcon; titulo: string; texto: string }[] = [
  {
    icone: Mail,
    titulo: 'Um guia por dia',
    texto: 'Um problema de engenharia de IA resolvido de ponta a ponta, curto o bastante para ler antes do café.',
  },
  {
    icone: Terminal,
    titulo: 'Código que roda de verdade',
    texto: 'O código e a saída do terminal saem do projeto real do guia e são conferidos a cada publicação.',
  },
  {
    icone: CircleCheck,
    titulo: 'Para fazer, não só ler',
    texto: 'Cada guia termina com um exercício que pede para você prever o resultado antes de rodar.',
  },
]

function Inscricao() {
  const campo = useId()
  const aberta = ACAO !== ''
  return (
    <form
      action={aberta ? ACAO : undefined}
      method="post"
      onSubmit={(e) => !aberta && e.preventDefault()}
      className="mx-auto mt-10 w-full max-w-md"
    >
      <label htmlFor={campo} className="sr-only">
        Seu e-mail
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={campo}
          name="email"
          type="email"
          required
          disabled={!aberta}
          autoComplete="email"
          placeholder="voce@exemplo.com"
          className="h-11 w-full rounded-full border border-input bg-card px-5 text-sm outline-none sm:flex-1 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        />
        <Button type="submit" size="lg" disabled={!aberta} className="h-11 rounded-full px-6">
          Quero receber
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {aberta
          ? 'Um e-mail por dia. Para sair, um clique no fim de qualquer e-mail.'
          : 'As inscrições abrem em breve. Enquanto isso, os guias já saem no site, todo dia.'}
      </p>
    </form>
  )
}

export function Newsletter() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:pt-24">
        <p className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">Newsletter</p>
        <h1 className="mt-4 font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
          Um guia por dia,
          <br />
          no seu e-mail
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Os guias do FontMar.ai, do jeito que saem no site: um problema, o código e a saída de verdade.
        </p>
        <Inscricao />
      </section>

      <section aria-label="O que chega" className="mx-auto mt-16 grid max-w-4xl gap-4 px-4 sm:grid-cols-3">
        {O_QUE_CHEGA.map(({ icone: Icone, titulo, texto }) => (
          <div key={titulo} className="rounded-xl border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icone className="size-5" strokeWidth={1.75} />
            </div>
            <h2 className="mt-4 font-heading text-lg font-bold">{titulo}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
          </div>
        ))}
      </section>

      <GuiasRecentes titulo="O que já saiu" />
    </>
  )
}
