'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { RetroBadge } from '../retro-feedback'
import { RetroButton } from '../retro-button'
import { RetroCheckbox, RetroGroup, RetroRadio } from '../retro-fields'
import { RetroMenubar } from '../retro-menubar'
import { RetroWindow } from '../retro-window'

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

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const GIFT_PRICE = 2.5

export function RetroProductCard({ product }: { product: RetroProduct }) {
  const groupName = useId()
  const [quantity, setQuantity] = useState(1)
  const [gift, setGift] = useState(false)
  const [added, setAdded] = useState(0)

  const total = product.price * quantity + (gift ? GIFT_PRICE : 0)
  const soldOut = product.stock === 0

  return (
    <RetroWindow
      title={product.fileName}
      className="w-full max-w-sm"
      menu={<RetroMenubar items={['File', 'Edit', 'View', 'Help']} />}
      status={
        <>
          <span className="flex-1 truncate">
            {added > 0 ? `${added} in cart` : soldOut ? 'Sold out' : `${product.stock} left in stock`}
          </span>
          <span aria-hidden="true" className="font-rt-mono text-[11px] text-rt-shadow">
            F1=Help
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-3 p-3">
        <div className="rt-sunken relative aspect-4/3 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 384px, 100vw"
            className="object-cover [image-rendering:pixelated]"
          />
          {product.oldPrice ? (
            <RetroBadge tone="warn" className="absolute top-2 left-2">
              Sale
            </RetroBadge>
          ) : null}
          {soldOut ? (
            <RetroBadge tone="danger" className="absolute top-2 right-2">
              Sold out
            </RetroBadge>
          ) : null}
        </div>

        <div>
          <h3 className="text-[16px] font-semibold">{product.name}</h3>
          <p className="mt-0.5 leading-snug text-rt-ink/80">{product.description}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px]" aria-label={`Rated ${product.rating} out of 5`}>
            <span aria-hidden="true" className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`size-2.5 rounded-[1px] border border-rt-line ${i < product.rating ? 'bg-rt-accent' : 'bg-rt-paper'}`}
                />
              ))}
            </span>
            <span aria-hidden="true">({product.rating}.0)</span>
          </p>
        </div>

        <RetroGroup legend="Specs">
          <dl className="rt-sunken grid grid-cols-[auto_1fr] gap-x-3 px-2 py-1.5 text-[12px]">
            {product.specs.map((spec) => (
              <div key={spec.label} className="col-span-2 grid grid-cols-subgrid">
                <dt className="font-semibold">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </RetroGroup>

        <RetroGroup legend={product.optionsLabel}>
          <div role="radiogroup" aria-label={product.optionsLabel} className="flex flex-wrap gap-x-4">
            {product.options.map((value, index) => (
              <RetroRadio key={value} name={groupName} value={value} label={value} defaultChecked={index === 0} />
            ))}
          </div>
          <RetroCheckbox
            label={`Gift wrap (+${formatter.format(GIFT_PRICE)})`}
            checked={gift}
            onChange={(event) => setGift(event.target.checked)}
          />
        </RetroGroup>

        <div className="flex items-stretch gap-2">
          <div className="flex items-center gap-1.5">
            <label htmlFor={`${groupName}-qty`} className="font-medium">
              Quantity
            </label>
            <input
              id={`${groupName}-qty`}
              readOnly
              value={quantity}
              className="rt-sunken h-7 w-9 text-center text-[13px] outline-none"
            />
            <div className="flex flex-col gap-px">
              <RetroButton
                size="sm"
                aria-label="Increase quantity"
                className="h-3 min-h-0 w-5 px-0 text-[7px] leading-none"
                disabled={quantity >= Math.max(product.stock, 1)}
                onClick={() => setQuantity((q) => q + 1)}
              >
                ▲
              </RetroButton>
              <RetroButton
                size="sm"
                aria-label="Decrease quantity"
                className="h-3 min-h-0 w-5 px-0 text-[7px] leading-none"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => q - 1)}
              >
                ▼
              </RetroButton>
            </div>
          </div>

          <output
            aria-live="polite"
            className="rt-sunken ml-auto flex flex-col items-end justify-center px-2.5 leading-tight"
          >
            {product.oldPrice ? (
              <span className="text-[11px] text-rt-shadow line-through">
                {formatter.format(product.oldPrice * quantity)}
              </span>
            ) : null}
            <span className="font-rt-mono text-[16px] font-semibold tabular-nums">{formatter.format(total)}</span>
          </output>
        </div>

        <div className="flex gap-2">
          <RetroButton
            variant="primary"
            className="flex-1 font-semibold"
            disabled={soldOut}
            onClick={() => setAdded((n) => n + quantity)}
          >
            Add to cart
          </RetroButton>
          <RetroButton disabled={soldOut}>Buy now</RetroButton>
        </div>
      </div>
    </RetroWindow>
  )
}
