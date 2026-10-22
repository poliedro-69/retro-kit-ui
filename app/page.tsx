import { RetroProductCard, type RetroProduct } from '@/components/retro/retro-product-card'

const products: RetroProduct[] = [
  {
    id: 'teclado',
    fileName: 'TECLADO.EXE',
    name: 'Teclado mecánico MK-101',
    image: '/products/teclado.png',
    description: 'Teclas con clic de verdad, cable PS/2 y cero latencia. Ideal para tu 486.',
    price: 89.9,
    oldPrice: 119.9,
    stock: 12,
    rating: 5,
    specs: [
      { label: 'Teclas', value: '101 (layout ES)' },
      { label: 'Conexión', value: 'PS/2 / DIN-5' },
      { label: 'Peso', value: '1,2 kg' },
    ],
    optionsLabel: 'Interruptor',
    options: ['Clicky', 'Lineal', 'Táctil'],
  },
  {
    id: 'joystick',
    fileName: 'JOYSTICK.EXE',
    name: 'Joystick Turbo Pilot',
    image: '/products/joystick.png',
    description: 'Dos botones de disparo, ajuste de trimado y ventosas en la base.',
    price: 34.5,
    stock: 3,
    rating: 4,
    specs: [
      { label: 'Botones', value: '2 + trimado' },
      { label: 'Puerto', value: 'Game Port 15 pines' },
      { label: 'Cable', value: '1,8 m' },
    ],
    optionsLabel: 'Color',
    options: ['Negro', 'Gris'],
  },
  {
    id: 'disquetes',
    fileName: 'DISKETTE.EXE',
    name: 'Pack 10 disquetes 3½"',
    image: '/products/disquetes.png',
    description: 'Alta densidad, formateados y listos para guardar tus documentos.',
    price: 12.0,
    stock: 0,
    rating: 4,
    specs: [
      { label: 'Capacidad', value: '1,44 MB' },
      { label: 'Formato', value: 'MS-DOS' },
      { label: 'Unidades', value: '10' },
    ],
    optionsLabel: 'Colores',
    options: ['Surtidos', 'Azul'],
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-win-desktop px-4 py-10 font-win">
      <h1 className="sr-only">Tienda retro: tarjetas de producto estilo Windows 3.1</h1>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <RetroProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
