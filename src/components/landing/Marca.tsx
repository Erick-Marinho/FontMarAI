// A marca chega como "FontMar.gui": o g vira e se transforma em a, o u sai, e fica "FontMar.ai".
// A animação toca uma vez (estilos .marca-* no index.css); com movimento reduzido, aparece pronta.
export function Marca() {
  return (
    <a href="/" aria-label="FontMar.ai, início" className="font-heading text-lg font-bold tracking-tight">
      <span aria-hidden="true" className="marca">
        Font<span className="text-primary">Mar</span>
        <span className="font-semibold text-muted-foreground">
          .
          <span className="marca-troca">
            <span className="marca-g">g</span>
            <span className="marca-a">a</span>
          </span>
          <span className="marca-u">
            <span>u</span>
          </span>
          i
        </span>
      </span>
    </a>
  )
}
