# Publicar RetroKit en npm

Se publican **tres paquetes** desde este monorepo (workspace pnpm):

| Carpeta | Nombre (tras configurar `author.json`) | Contenido |
| --- | --- | --- |
| `packages/retro-ui` | `@scope/retrokit` | Componentes React + Tailwind, `styles.css`, `themes.css` |
| `packages/retro-elements` | `@scope/retrokit-elements` | Web Components, tipos para React/Svelte, `themes.css` |
| `packages/retro-vue` | `@scope/retrokit-vue` | Wrappers Vue 3 con `v-model`. Depende de `retrokit-elements` |

Los nombres de `-elements` y `-vue` se derivan del `packageName` de `author.json`.

`packages/retro-ui` es **generado**: `src/`, `dist/` y su `package.json` están en `.gitignore`. La fuente de verdad son `components/retro-ui` y `components/mac-ui`.

## 1. Requisitos previos

1. Cuenta en [npmjs.com](https://www.npmjs.com) con 2FA activado.
2. Un scope: tu usuario (`@tuusuario`) o una organización creada en npm (gratis para paquetes públicos).
3. Node 20+ y pnpm instalados.
4. Repositorio en GitHub creado (para `repository` y para el enlace de la ficha de npm).

## 2. Configurar los datos del autor

Edita `author.json`:

```json
{
  "name": "Poliedro69",
  "url": "https://machinetix.com",
  "email": "poliedro69@gmail.com",
  "year": 2026,
  "productName": "RetroKit",
  "packageName": "@tuscope/retrokit",
  "siteUrl": "https://machinetix.com",
  "repository": "https://github.com/tuusuario/retrokit"
}
```

- `packageName` debe llevar tu scope real. Si el nombre `retrokit` está ocupado, cámbialo (comprueba con `npm view @tuscope/retrokit`, un 404 significa que está libre).
- Estos datos alimentan: `package.json` de los tres paquetes, el `LICENSE`, los README y la página `/license`.

## 3. Generar y comprobar

```bash
pnpm install
pnpm packages:build   # sincroniza + compila los 3 paquetes
pnpm packages:check   # igual que lo anterior y ejecuta `npm pack --dry-run` en cada uno
pnpm registry:build   # regenera public/r/*.json (registry shadcn)
```

Qué revisar en la salida de `npm pack --dry-run`:

- Aparecen `dist/`, `LICENSE`, `README.md` y (según el paquete) `styles.css`, `themes.css`, `types/`.
- **No** aparecen `src/`, `node_modules/`, `.env` ni archivos del sitio Next.
- El nombre y la versión son los esperados.

Antes de seguir, busca restos de placeholders:

```bash
grep -rn "your-scope\|your-name\|Your Name" packages/*/package.json packages/*/README.md packages/*/LICENSE
```

No debe devolver nada.

## 4. Probar la instalación real (recomendado)

Genera los tarballs e instálalos en un proyecto vacío:

```bash
pnpm -r --filter "./packages/*" exec npm pack --pack-destination /tmp/retrokit
```

Pruebas mínimas:

1. **React**: proyecto Next.js + Tailwind. Instala el tarball de `retrokit`, importa `styles.css`, renderiza `RetroWindow` y `MacWindow`.
2. **Web Components**: página HTML o Next.js. Importa `retrokit-elements` y usa `<rt-button>`.
3. **Vue**: proyecto Vite + Vue 3. Instala `retrokit-elements` y `retrokit-vue` (en ese orden) y usa `RtInput` con `v-model`.

Si algo falla aquí, es más barato arreglarlo que despublicar.

## 5. Publicar

```bash
npm login                       # una sola vez; pide 2FA
pnpm packages:publish
```

Ese script ejecuta `pnpm packages:build` y luego `pnpm -r --filter "./packages/*" publish --access public --no-git-checks`.

Notas importantes:

- `--access public` es obligatorio la primera vez en paquetes con scope; si no, npm los trata como privados y falla.
- `pnpm publish` sustituye `workspace:*` por la versión real en `retrokit-vue`, y publica en orden topológico (primero `-elements`, después `-vue`).
- Con 2FA activo, npm pedirá un código OTP por cada paquete. Puedes pasarlo con `--otp=123456` o usar un token de automatización.
- `--no-git-checks` permite publicar con cambios sin commitear. Si prefieres el chequeo estricto, quítalo y haz commit antes.

Publicar un solo paquete:

```bash
pnpm --filter "./packages/retro-elements" publish --access public --no-git-checks
```

## 6. Verificar tras publicar

```bash
npm view @tuscope/retrokit
npm view @tuscope/retrokit-elements
npm view @tuscope/retrokit-vue
```

Y en un proyecto limpio:

```bash
pnpm add @tuscope/retrokit
pnpm add @tuscope/retrokit-elements @tuscope/retrokit-vue
```

Comprueba también la ficha en `https://www.npmjs.com/package/@tuscope/retrokit`: README renderizado, licencia visible, enlace al repositorio y a la web.

## 7. Registry shadcn

El registry no se publica en npm: son archivos estáticos en `public/r/`, servidos por el sitio desplegado.

1. Ejecuta `pnpm registry:build`.
2. Despliega el sitio (botón Publish de v0 o `vercel --prod`).
3. Prueba en un proyecto con shadcn:

```bash
npx shadcn@latest add https://TU-DOMINIO/r/retro-ui.json
npx shadcn@latest add https://TU-DOMINIO/r/mac-ui.json
npx shadcn@latest add https://TU-DOMINIO/r/retro-themes.json
```

Revisa que `retro-themes.json` instala algo: en la revisión actual su lista de archivos aparecía vacía.

## 8. Versionado y nuevas versiones

Seguimos semver: `0.x` mientras la API pueda cambiar; `patch` para correcciones, `minor` para componentes nuevos, `major` para rupturas.

Para subir versión:

1. `packages/retro-elements/package.json` y `packages/retro-vue/package.json`: edita `version`. Mantén ambas iguales.
2. `retro-ui`: su `package.json` es generado y la versión está fija en `scripts/sync-package.mjs` (`version: '0.1.0'`). Cámbiala ahí.
3. `pnpm packages:check` y luego `pnpm packages:publish`.
4. Crea el tag y la release en GitHub:

```bash
git tag v0.1.1 && git push --tags
```

No se puede volver a publicar una versión ya subida. Si te equivocas, sube una `patch` nueva. `npm deprecate` marca una versión como obsoleta con un mensaje; `npm unpublish` solo está permitido en las primeras 72 horas y si nadie depende de ella.

## 9. Atribución y licencia

Los tres paquetes incluyen el mismo `LICENSE` (MIT + cláusula de atribución con enlace al autor), generado desde `license/LICENSE.template` con los datos de `author.json`. Si cambias el texto, edita la plantilla, no los `LICENSE` generados, y vuelve a ejecutar `pnpm package:build`.

El campo `license` de `package.json` vale `SEE LICENSE IN LICENSE`. npm lo muestra tal cual y no lo reconoce como MIT. Si quieres que aparezca como MIT, ponlo en `sync-package.mjs` y en los dos `package.json` manuales, dejando la cláusula de atribución en el archivo.

## 10. Mejoras opcionales

- **Provenance**: publicar desde GitHub Actions con `--provenance` añade una insignia de verificación en npm.
- **Token de automatización**: crea uno en npm (tipo *Automation*) y guárdalo como `NPM_TOKEN` en los secrets del repositorio.
- **Changesets** (`@changesets/cli`) para gestionar versiones y changelog de los tres paquetes a la vez.

## Lista rápida

- [ ] `author.json` con scope y repositorio reales
- [ ] `pnpm packages:check` sin errores y sin placeholders
- [ ] Probado en proyecto limpio (React, Web Components, Vue)
- [ ] `npm login` con 2FA
- [ ] `pnpm packages:publish`
- [ ] `npm view` correcto en los tres
- [ ] Sitio desplegado y registry shadcn probado
- [ ] Tag y release en GitHub
