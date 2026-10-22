import { RetroBadge, RetroMenubar, RetroWindow } from '@/components/retro-ui'
import { RetroProductCard } from '@/components/retro-ui/blocks/retro-product-card'
import { ControlsDemo } from '@/components/showcase/controls-demo'
import { products } from '@/components/showcase/products'
import { TabsDialogDemo } from '@/components/showcase/tabs-dialog-demo'

export default function Page() {
  return (
    <main className="rt-desktop min-h-screen px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <RetroWindow
          title="Retro UI - Léeme.txt"
          menu={<RetroMenubar items={['Archivo', 'Componentes', 'Temas', 'Ayuda']} />}
          status={
            <>
              <span className="flex-1">React + Tailwind CSS</span>
              <RetroBadge tone="info">v1.0</RetroBadge>
            </>
          }
        >
          <div className="p-4">
            <h1 className="font-mono text-2xl font-semibold tracking-tight text-balance">
              Estructura de Windows 3.1, acabado de hoy.
            </h1>
            <p className="mt-2 max-w-2xl leading-relaxed text-pretty text-rt-ink/80">
              Una librería de componentes básicos con bordes biselados, barras de título y cajas de grupo clásicas,
              combinados con degradados suaves, sombras difusas, tipografía actual y estados de foco accesibles.
            </p>
          </div>
        </RetroWindow>

        <section aria-labelledby="basicos" className="flex flex-col gap-4">
          <h2 id="basicos" className="sr-only">
            Componentes básicos
          </h2>
          <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
            <ControlsDemo />
            <TabsDialogDemo />
          </div>
        </section>

        <section aria-labelledby="bloque" className="flex flex-col gap-4">
          <RetroWindow title="Bloque - Tarjeta de producto" className="self-start">
            <h2 id="bloque" className="px-3 py-2 text-[13px] text-rt-ink/80">
              Ejemplo de composición: ecommerce con los componentes anteriores.
            </h2>
          </RetroWindow>
          <div className="grid grid-cols-1 items-start justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <RetroProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
