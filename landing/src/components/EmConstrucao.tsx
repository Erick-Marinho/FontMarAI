import { ArrowLeft, Construction } from 'lucide-react'

import { Button } from '@/components/ui/button'

// O lugar de tudo que ainda não existe: o link leva a algum lugar, e o lugar diz que está sendo feito.
export function EmConstrucao({ titulo }: { titulo: string }) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 pt-20 pb-12 text-center sm:pt-28">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Construction className="size-8" strokeWidth={1.5} />
      </div>
      <p className="mt-6 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        em construção
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">{titulo}</h1>
      <p className="mt-4 text-muted-foreground">
        Esta parte do FontMar.ai ainda está sendo feita. Enquanto isso, os experimentos e os livros já estão no ar.
      </p>
      <Button asChild variant="outline" className="mt-8 rounded-full">
        <a href="/">
          <ArrowLeft />
          Voltar ao início
        </a>
      </Button>
    </section>
  )
}
