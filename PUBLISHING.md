# Publicar RetroKit en npm

Este monorepo publica dos paquetes:

| Carpeta | Contenido |
| --- | --- |
| `packages/retro-ui` | Componentes React + Tailwind, `styles.css` y `themes.css` |
| `packages/retro-elements` | Web Components y tipos para React |

Los nombres se derivan de `packageName` en `author.json`.

## Requisitos

1. Cuenta npm con 2FA activado.
2. Scope npm propio u organización para paquetes públicos.
3. Node 20+ y pnpm.
4. Repositorio GitHub configurado para los metadatos del paquete.

## Configurar autor

Edita `author.json` con el scope, autor, web y repositorio reales. Después ejecuta:

```bash
pnpm install
pnpm packages:build
pnpm packages:check
pnpm registry:build
```

`packages/retro-ui` se genera desde `components/retro-ui` y `components/mac-ui`. Los paquetes publicados deben contener `dist/`, `LICENSE`, `README.md` y, cuando corresponda, `styles.css`, `themes.css` y `types/`; nunca `src/`, `.env` ni archivos del sitio.

## Prueba previa

Genera tarballs e instala cada uno en un proyecto limpio:

```bash
pnpm -r --filter "./packages/*" exec npm pack --pack-destination /tmp/retrokit
```

Prueba una app React con `retrokit` y una página HTML/Next.js importando `retrokit-elements` y usando `<rt-button>`.

## Publicar

```bash
npm login
pnpm packages:publish
```

El script compila ambos paquetes y los publica como públicos. Para publicar uno:

```bash
pnpm --filter "./packages/retro-elements" publish --access public --no-git-checks
```

## Verificar

```bash
npm view @tuscope/retrokit
npm view @tuscope/retrokit-elements
```

Sustituye `@tuscope` por el scope configurado. Comprueba README, licencia, repositorio, web y archivos incluidos.

## Registry shadcn

El registry se sirve desde `public/r/` y no se publica en npm:

```bash
pnpm registry:build
```

Después despliega el sitio y prueba los JSON con `npx shadcn@latest add https://TU-DOMINIO/r/retro-ui.json`.

## Versionado

Actualiza la versión generada en `scripts/sync-package.mjs` y la del manifiesto de `retro-elements`. Ejecuta `pnpm packages:check` antes de publicar. Usa semver: patch para correcciones, minor para componentes nuevos y major para rupturas.

## Checklist

- [ ] `author.json` tiene scope y repositorio reales.
- [ ] `pnpm packages:check` termina sin errores.
- [ ] React y Web Components probados en proyectos limpios.
- [ ] `npm login` configurado con 2FA.
- [ ] `pnpm packages:publish` ejecutado.
- [ ] `npm view` muestra los dos paquetes.
- [ ] Registry shadcn probado tras desplegar.
