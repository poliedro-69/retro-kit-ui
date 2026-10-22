# RetroKit - Pendiente

Estado a fecha de esta revisión. Ordenado por prioridad: lo que bloquea publicar va primero.

## 1. Bloqueantes antes de publicar

- [ ] **Sustituir los placeholders de `author.json`**
  - `packageName`: ahora es `@your-scope/retrokit`. De aquí derivan los nombres de los otros dos paquetes (`-elements`, `-vue`).
  - `repository`: ahora es `https://github.com/your-name/retrokit`.
  - Revisar `name`, `url`, `email`, `year` y `siteUrl` (ya tienen datos reales).
  - Después ejecutar `pnpm package:build` para que se regenere todo.
- [ ] **Corregir los manifiestos de `retro-elements` y `retro-vue`**: tienen `@your-scope` y `your-name` escritos a mano en `package.json` (nombre, `repository.url` y la dependencia `@your-scope/retrokit-elements` de `retro-vue`). El script `sync-package.mjs` los reescribe, pero hay que comprobarlo tras el cambio.
- [ ] **Crear el repositorio en GitHub** (no hay `git remote` configurado ni carpeta `.github`).
- [ ] **Probar la instalación real** de cada paquete en un proyecto limpio (ver `PUBLISHING.md`). Hasta ahora solo se ha comprobado `npm pack --dry-run`.
- [ ] **Decidir la política de la licencia en `package.json`**: ahora es `"SEE LICENSE IN LICENSE"`. npm y los buscadores no lo reconocen como MIT. Valorar `MIT` en el campo `license` y dejar la cláusula de atribución en el archivo `LICENSE`, o mantener el texto actual a sabiendas.

## 2. Cobertura de componentes por distribución

El kit React/registry es el más completo. Los Web Components y el paquete Vue solo cubren los componentes de las primeras rondas.

| Distribución | Cobertura |
| --- | --- |
| React (`retrokit`) y registry shadcn | Ambos kits completos (Windows y Mac), 20 y 17 componentes aprox. |
| Web Components (`retrokit-elements`) | 19 elementos |
| Vue (`retrokit-vue`) | Mismos 19 wrappers |

Elementos existentes hoy:
- Windows: `rt-badge`, `rt-button`, `rt-checkbox`, `rt-dialog`, `rt-group`, `rt-input`, `rt-progress`, `rt-radio`, `rt-tab`, `rt-tabs`, `rt-window`.
- Mac: `mac-alert`, `mac-button`, `mac-checkbox`, `mac-group`, `mac-input`, `mac-progress`, `mac-radio`, `mac-window`.

Faltan en Web Components y Vue (existen solo en React):
- [ ] Textarea, Scroll Area (scrollbar), Listbox, Slider, Dropdown Menu, Menubar
- [ ] Label / Separator, Tooltip, Toast
- [ ] Table, Tree View
- [ ] Accordion, Breadcrumb, Pagination
- [ ] Dialog en Mac (solo existe `rt-dialog`)
- [ ] Equivalentes Mac de varios elementos de Windows (tabs, badge)

Si se amplía la lista hay que actualizar a la vez: `packages/retro-elements/src/{windows,mac}.ts`, `packages/retro-vue/src/index.ts`, los tipos de `types/react.d.ts` y `types/svelte.d.ts`, y la sección de componentes de los README (`license/README.*.template.md`).

## 3. Svelte

- [ ] Solo hay declaraciones de tipos (`types/svelte.d.ts`). No existe paquete `retrokit-svelte` ni se ha probado en un proyecto SvelteKit real.
- [ ] Decidir si basta con la guía de Web Components o si se crea un paquete con wrappers (estado, `bind:value`).
- [ ] Probar SSR en SvelteKit: los custom elements no se renderizan en servidor.

## 4. Registry shadcn

- [ ] `public/r/retro-themes.json` no lista ningún archivo. Comprobar que `registry:build` genera bien ese elemento.
- [ ] Los elementos son gruesos: `retro-ui` y `mac-ui` instalan el kit entero. Valorar items por componente (`retro-button`, `retro-table`, ...) con `registryDependencies`.
- [ ] Probar `npx shadcn@latest add <url>` contra el dominio desplegado. Ahora se ha verificado solo el JSON generado.
- [ ] Revisar que la URL base del registry coincide con el dominio final (`siteUrl` en `author.json`).

## 5. Calidad y mantenimiento

- [ ] Sin tests automáticos (ni unitarios ni de componentes). Mínimo recomendado: render + teclado de Tree, Listbox, Dropdown, Accordion.
- [ ] Sin CI. Añadir un workflow que ejecute `tsc --noEmit`, `pnpm packages:check` y `registry:build`.
- [ ] Auditoría de accesibilidad: navegación por teclado (flechas, Home/End, type-ahead) y roles ARIA en Tree, Listbox, Table ordenable, Dropdown y Tabs.
- [ ] Verificar los componentes nuevos en los 6 themes de color y las 4 fuentes (hasta ahora solo se comprobaron Classic Navy y unas pocas combinaciones).
- [ ] Verificar `/showcase` en móvil: el explorador de 3 paneles no se ha revisado en pantallas estrechas.
- [ ] Glifos no soportados por las fuentes pixel (ya se sustituyó `⌘` por `Cmd+`). Revisar el resto de símbolos Unicode de los previews.
- [ ] Control de versiones: `retro-ui` tiene `version: '0.1.0'` fijo dentro de `scripts/sync-package.mjs`; los otros dos tienen la suya en su `package.json`. Unificar (por ejemplo con Changesets) para que no se desincronicen.
- [ ] Añadir `CHANGELOG.md` y `CONTRIBUTING.md`.

## 6. Producto / web

- [ ] **Los botones de descarga de la landing son de demostración.** Conectarlos con el paquete real (enlace a npm, comando `npx shadcn add` o un ZIP).
- [ ] `/elements` es una página de pruebas técnicas; decidir si se queda, se mueve a `/docs` o se oculta (ver `SEO.md`).
- [ ] Limpiar `public/`: `placeholder-logo.*`, `placeholder-user.jpg`, `placeholder.jpg`, `placeholder.svg` no se usan.
- [ ] Quitar `generator: 'v0.app'` del metadata de `app/layout.tsx`.
- [ ] Páginas por componente (`/components/windows/table`...) para poder enlazarlas y posicionarlas. Hoy todo vive dentro de un único `/showcase`.
- [ ] Capturas o GIFs en los README de los paquetes (en npm se ven en la ficha).

## 7. Documentación

- [ ] Guía de migración / actualización entre versiones.
- [ ] Documentar las props de cada componente (tabla de API). Hoy solo hay ejemplos de código.
- [ ] Documentar cómo personalizar un theme propio (variables `--rt-*`) más allá de los 6 incluidos.
- [ ] Revisar que la página `/license` y el `LICENSE` de cada paquete dicen exactamente lo mismo.
