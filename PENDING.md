# RetroKit - Pendiente

Estado actualizado después de consolidar las distribuciones React y Web Components.

## Publicación

- [ ] Sustituir los placeholders de `author.json` (`@your-scope`, `your-name` y datos del repositorio).
- [ ] Crear el repositorio remoto y configurar su URL en `author.json`.
- [ ] Probar la instalación real de `retrokit` y `retrokit-elements` en proyectos limpios.
- [ ] Decidir si `package.json` debe declarar `MIT` en lugar de `SEE LICENSE IN LICENSE`.

## Cobertura de componentes

| Distribución | Cobertura |
| --- | --- |
| React (`retrokit`) y registry shadcn | Ambos kits completos, Windows y Mac |
| Web Components (`retrokit-elements`) | Componentes base de Windows y Mac |

Los elementos existentes incluyen botones, inputs, checkbox, radio, grupos, progreso, ventanas, diálogos, tabs, badges y alertas. Faltan equivalentes Web Components para Textarea, Scroll Area, Listbox, Slider, Dropdown Menu, Menubar, Tooltip, Toast, Table, Tree View, Accordion, Breadcrumb y Pagination.

Si se amplía la cobertura hay que actualizar `packages/retro-elements/src/{windows,mac}.ts`, `types/react.d.ts`, los README de los paquetes y el registry.

## Registry shadcn

- [ ] `public/r/retro-themes.json` debe comprobarse porque su lista de archivos aparecía vacía.
- [ ] Valorar items individuales por componente.
- [ ] Probar `npx shadcn@latest add <url>` contra el dominio desplegado.

## Calidad y mantenimiento

- [ ] Añadir tests automáticos de renderizado, teclado y accesibilidad.
- [ ] Añadir CI para `tsc --noEmit`, `pnpm packages:check` y `registry:build`.
- [ ] Verificar los componentes en todos los themes y fuentes.
- [ ] Revisar `/showcase` en móvil.
- [ ] Añadir `CHANGELOG.md` y `CONTRIBUTING.md`.

## Producto y web

- [ ] Conectar los botones de la landing con npm, shadcn o un ZIP real.
- [ ] Decidir el futuro de `/elements`, actualmente una página técnica.
- [ ] Limpiar placeholders sin uso en `public/`.
- [ ] Retirar `generator: 'v0.app'` del metadata si se publica fuera de v0.
