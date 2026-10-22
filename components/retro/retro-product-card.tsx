'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { WinButton, WinCheckbox, WinGroup, WinRadio } from './win-controls'
import { WinWindow } from './win-window'

export type RetroProduct = {
  id: string
  fileName: string
  name: string
  image: string
  description: string
  price: number
  oldPrice?: number
  stock: number
  rating: number
  specs: { label: string; value: string }[]
  optionsLabel: string
  options: string[]
}

const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

export function RetroProductCard({ product }: { product: RetroProduct }) {
  const groupName = useId()
  const [option, setOption] = useState(product.options[0])
  const [quantity, setQuantity] = useState(1)
  const [gift, setGift] = useState(false)
  const [added, setAdded] = useState(0)

  const total = product.price * quantity + (gift ? 2.5 : 0)
  const soldOut = product.stock === 0

  return (
    <WinWindow
      title={product.fileName}
      className="w-full max-w-sm"
      status={
        <>
          <span className="flex-1 truncate">
            {added > 0
              ? `${added} art. en el carrito`
              : soldOut
                ? 'Agotado'
                : `Quedan ${product.stock} uds.`}
          </span>
          <span aria-hidden="true">F1=Ayuda</span>
        </>
      }
    >
      <nav aria-label="Menú" className="flex gap-4 px-1.5 pb-1 [&_span]:underline-offset-2">
        {['Archivo', 'Edición', 'Ver', 'Ayuda'].map((item) => (
          <span key={item}>
            <u>{item[0]}</u>
            {item.slice(1)}
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-2.5 border-t border-win-shadow p-2.5 shadow-[0_-1px_0_#fff]">
        <div className="win-sunken relative aspect-4/3 overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 384px, 100vw"
            className="object-cover [image-rendering:pixelated]"
          />
          {product.oldPrice ? (
            <span className="absolute top-1.5 left-1.5 border border-black bg-yellow-300 px-1.5 py-px text-[11px] font-bold">
              ¡OFERTA!
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-[15px] font-bold">{product.name}</h3>
          <p className="mt-0.5 leading-snug">{product.description}</p>
          <p
            className="mt-1.5 flex items-center gap-1 text-[12px]"
            aria-label={`Valoración ${product.rating} de 5`}
          >
            <span aria-hidden="true" className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 border border-black ${i < product.rating ? 'bg-win-title' : 'bg-white'}`}
                />
              ))}
            </span>
            <span aria-hidden="true">({product.rating}.0)</span>
          </p>
        </div>

        <WinGroup legend="Características">
          <dl className="win-sunken grid grid-cols-[auto_1fr] gap-x-3 bg-white px-2 py-1 text-[12px]">
            {product.specs.map((spec) => (
              <div key={spec.label} className="col-span-2 grid grid-cols-subgrid">
                <dt className="font-bold">{spec.label}:</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </WinGroup>

        <WinGroup legend={product.optionsLabel}>
          <div role="radiogroup" aria-label={product.optionsLabel} className="flex flex-wrap gap-x-4">
            {product.options.map((value) => (
              <WinRadio
                key={value}
                name={groupName}
                value={value}
                label={value}
                checked={option === value}
                onChange={setOption}
              />
            ))}
          </div>
          <div className="mt-1">
            <WinCheckbox label="Envolver para regalo (+2,50 €)" checked={gift} onChange={setGift} />
          </div>
        </WinGroup>

        <div className="flex items-stretch gap-2">
          <div className="flex items-center gap-1.5">
            <label htmlFor={`${groupName}-qty`}>
              <u>C</u>antidad:
            </label>
            <input
              id={`${groupName}-qty`}
              readOnly
              value={quantity}
              className="win-sunken h-6.5 w-9 bg-white text-center text-[13px] outline-none"
            />
            <div className="flex flex-col gap-px">
              <WinButton
                aria-label="Aumentar cantidad"
                className="h-3 min-h-0 w-5 px-0 text-[7px] leading-none"
                disabled={quantity >= Math.max(product.stock, 1)}
                onClick={() => setQuantity((q) => q + 1)}
              >
                ▲
              </WinButton>
              <WinButton
                aria-label="Disminuir cantidad"
                className="h-3 min-h-0 w-5 px-0 text-[7px] leading-none"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => q - 1)}
              >
                ▼
              </WinButton>
            </div>
          </div>

          <output
            aria-live="polite"
            className="win-sunken ml-auto flex flex-col items-end justify-center bg-white px-2 leading-tight"
          >
            {product.oldPrice ? (
              <span className="text-[11px] text-win-shadow line-through">
                {formatter.format(product.oldPrice * quantity)}
              </span>
            ) : null}
            <span className="text-[16px] font-bold tabular-nums">{formatter.format(total)}</span>
          </output>
        </div>

        <div className="flex gap-2">
          <WinButton
            isDefault
            className="flex-1 font-bold"
            disabled={soldOut}
            onClick={() => setAdded((n) => n + quantity)}
          >
            <u>A</u>ñadir al carrito
          </WinButton>
          <WinButton disabled={soldOut} aria-label="Comprar ahora">
            <u>C</u>omprar
          </WinButton>
        </div>
      </div>
    </WinWindow>
  )
}
