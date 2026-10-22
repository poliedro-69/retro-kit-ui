# RetroKit - Plan de SEO

Cubre dos frentes: la **web** (Next.js) y la **ficha de npm** de los paquetes.

## 1. Estado actual

Ya existe:
- `app/layout.tsx`: `title`, `description`, iconos (`icon-light/dark-32x32.png`, `icon.svg`, `apple-icon.png`) y `viewport.themeColor`.
- `metadata` propio en `/docs`, `/license`, `/showcase` y `/elements`.
- HTML semántico y `alt` en imágenes.
- Todos los textos en inglés.

No existe:
- `metadataBase`, URLs canónicas, Open Graph, Twitter Card.
- `app/sitemap.ts` y `app/robots.ts`.
- Imagen social (`opengraph-image`).
- Datos estructurados (JSON-LD).
- Contenido indexable por componente (todo vive en el cliente de `/showcase`).

## 2. Metadata base (`app/layout.tsx`)

Añadir `metadataBase` con el dominio final y plantilla de título, de modo que las rutas hijas hereden:

```ts
import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: 'RetroKit - Free retro UI kits for React, Vue and Tailwind CSS',
    template: '%s | RetroKit',
  },
  description:
    'Free Windows 3.1 and Mac System 7 inspired UI kits. React, Vue and Web Components with Tailwind CSS, classic bevels and modern focus states.',
  applicationName: 'RetroKit',
  authors: [{ name: site.authorName, url: site.authorUrl }],
  keywords: [
    'retro ui kit', 'windows 3.1 ui', 'system 7 ui', 'tailwind css components',
    'react retro components', 'vue retro components', 'web components',
    'free ui kit', 'pixel ui', '90s ui',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'RetroKit',
    title: 'RetroKit - Free retro UI kits',
    description: 'Windows 3.1 and Mac System 7 UI kits for React, Vue and Tailwind CSS.',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
```

Comprobar los nombres reales de las claves en `lib/site.ts` antes de copiar. Además:

- Quitar `generator: 'v0.app'`.
- Poner `lang="en"` en `<html>` (verificar que ya está).
- Cada página debe definir su propio `alternates.canonical` (`/docs`, `/license`, `/showcase`).

## 3. Títulos y descripciones por página

Longitud orientativa: título 50-60 caracteres, descripción 140-160.

| Ruta | Title | Idea de description |
| --- | --- | --- |
| `/` | RetroKit - Free retro UI kits for React, Vue and Tailwind | Descarga gratuita de kits Windows 3.1 y Mac System 7 |
| `/docs` | Installation guide | npm, shadcn registry, Web Components, Vue, React y Svelte paso a paso |
| `/showcase` | Component explorer | Más de 20 componentes retro con vista previa y código |
| `/license` | License | MIT con atribución: qué debes enlazar y cómo |
| `/elements` | (ver punto 7) | Página de pruebas, no indexar |

Evitar títulos duplicados entre páginas.

## 4. Imagen social (Open Graph)

Crear `app/opengraph-image.tsx` (o un PNG fijo `opengraph-image.png` de 1200x630) con una ventana estilo Windows 3.1 y el nombre del producto. Next la enlaza automáticamente en `og:image`. Opcional: `twitter-image` con la misma imagen.

Debe verse bien recortada y con el texto legible a tamaño miniatura.

## 5. Sitemap y robots

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ['', '/docs', '/showcase', '/license'].map((path) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
```

`app/robots.ts`:

```ts
import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/elements'] },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  }
}
```

Si más adelante se crean páginas por componente (punto 6), añadirlas al sitemap generándolas desde el registro del explorador.

## 6. Contenido indexable: una página por componente

Es la mejora con más impacto. Hoy `/showcase` es una sola URL con el contenido cambiando por estado en el cliente, así que buscadores y enlaces compartidos solo ven una página.

Propuesta:

- Rutas `/components/[kit]/[slug]` (por ejemplo `/components/windows/table`), generadas con `generateStaticParams` a partir del registro de `components/showcase/explorer/registry.tsx`.
- Cada página con `<h1>` único (por ejemplo "Windows 3.1 Table for React"), descripción, vista previa, bloque de código y enlaces a los componentes relacionados.
- `generateMetadata` con título y descripción propios por componente.
- `/showcase` pasa a ser el explorador interactivo, y cada nodo del árbol enlaza a su página.
- Búsquedas objetivo: "windows 3.1 button css", "retro tree view component", "system 7 tailwind", "retro dropdown menu react".

## 7. Qué no indexar

- `/elements` es una página de pruebas: añadir `robots: { index: false, follow: false }` en su metadata y el `disallow` del punto 5. O moverla bajo `/docs`.
- Archivos `public/r/*.json` (registry) no tienen valor SEO. Si molestan, bloquear `/r/` en robots.

## 8. Datos estructurados (JSON-LD)

En la landing, un `SoftwareSourceCode` o `SoftwareApplication` gratuito:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RetroKit',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Poliedro69', url: 'https://machinetix.com' },
    }),
  }}
/>
```

Y en `/docs`, `FAQPage` si hay sección de preguntas frecuentes (la landing ya tiene FAQ). Validar con el [Rich Results Test](https://search.google.com/test/rich-results).

## 9. Rendimiento y accesibilidad (influyen en el ranking)

- Medir con Lighthouse y Web Vitals (LCP, CLS, INP) en landing, `/docs` y `/showcase`.
- Las fuentes se cargan con `next/font`; confirmar `display: 'swap'` y que solo se cargan las usadas por defecto (las fuentes Pixel y Mono del selector de themes no deben bloquear el primer render).
- Imágenes con `next/image`, `width`/`height` y `alt` descriptivo.
- Contraste suficiente en todos los themes (especialmente Phosphor Green y Amber Terminal).
- Un solo `<h1>` por página y jerarquía de encabezados sin saltos.

## 10. Backlinks y distribución

- Enlace a la web desde el campo `homepage` de los tres paquetes npm y desde el README del repositorio.
- La cláusula de atribución de la licencia genera enlaces de vuelta de forma natural: mantener la página `/license` clara y con un snippet copiable.
- Publicar en: Product Hunt, Hacker News (Show HN), Reddit (r/webdev, r/reactjs, r/vuejs), awesome-lists de UI kits y de Tailwind, directorios de componentes y de shadcn registries.
- Un artículo corto de lanzamiento ("Building a Windows 3.1 UI kit with Tailwind") con enlace a la web.

## 11. Search Console y medición

1. Verificar el dominio en Google Search Console y Bing Webmaster Tools.
2. Enviar `https://TU-DOMINIO/sitemap.xml`.
3. Instalar analítica (Vercel Web Analytics es la opción más simple en Vercel).
4. Revisar a las 2-4 semanas: páginas indexadas, consultas con impresiones, CTR.

## 12. SEO de la ficha de npm

La búsqueda de npm usa nombre, descripción, `keywords` y README.

- **Nombre**: incluir "retro" o "retrokit"; fácil de teclear.
- **`description`**: frase corta con las palabras clave ("Free Windows 3.1 and Mac System 7 inspired React + Tailwind CSS components").
- **`keywords`**: ya hay `react`, `tailwindcss`, `retro`, `windows-3.1`, `system-7`, `components`. Añadir `ui-kit`, `design-system`, `90s`, `nostalgia`, `vintage`, `pixel` y, según el paquete, `web-components` / `vue`.
- **README**: primera pantalla con qué es, una captura o GIF, instalación en 3 líneas y enlace a `/docs`. Las capturas deben estar en una URL absoluta (npm no resuelve rutas relativas a imágenes del repo).
- **`homepage`** y **`repository`** correctos para que la ficha enlace a la web y a GitHub.
- Mantener las versiones actualizadas: npm penaliza paquetes sin releases en mucho tiempo.

## 13. Checklist

- [ ] `metadataBase`, plantilla de título, Open Graph y Twitter en el layout
- [ ] Quitar `generator: 'v0.app'`
- [ ] `canonical` en cada página
- [ ] `app/sitemap.ts` y `app/robots.ts`
- [ ] `opengraph-image`
- [ ] `/elements` con `noindex`
- [ ] JSON-LD en la landing (y FAQPage)
- [ ] Páginas por componente con `generateStaticParams`
- [ ] Lighthouse y Web Vitals revisados
- [ ] Search Console y Bing: dominio verificado y sitemap enviado
- [ ] `keywords` y README de los paquetes npm revisados
- [ ] Plan de lanzamiento (Product Hunt, Reddit, Show HN)
