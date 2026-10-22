<div align="center">

# retro-kit-ui

### Interfaces retro para la web moderna

Componentes React con la personalidad visual de **Windows 3.1** y **Mac System 7**.
Construye formularios, dashboards y bloques completos con estética de software clásico.

[![Windows 3.1](https://img.shields.io/badge/Windows_3.1-1f4e9e?style=for-the-badge&logoColor=white)](./packages/retro-ui)
[![Mac System 7](https://img.shields.io/badge/Mac_System_7-111111?style=for-the-badge&logo=apple&logoColor=white)](./packages/retro-vue)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br />

[Explorar la galería](https://retro-kit-ui.vercel.app) · [Ver componentes](./packages/retro-ui) · [Contribuir](#contribuir)

</div>

---

## `C:\RETROKIT>`

retro-kit-ui es una colección de componentes y bloques reutilizables para crear productos con una identidad retro auténtica, sin renunciar a React, TypeScript ni a una base accesible.

Incluye dos lenguajes visuales:

| Kit | Inspiración | Ideal para |
| --- | --- | --- |
| **Windows 3.1** | Azul marino, superficies grises, bevels y pixel UI | Aplicaciones, herramientas y dashboards |
| **Mac System 7** | Blanco y negro, ventanas compactas y controles 1-bit | Interfaces editoriales y experiencias nostálgicas |

## Incluido

- Controles básicos: botones, inputs, textarea, checkbox, radio, select y switch.
- Navegación: menubar, tabs, dropdown menu, listbox, breadcrumbs y pagination.
- Feedback: tooltip, toast, alert, progress y separator.
- Data display: table, tree view, accordion y scroll area.
- Bloques listos para usar, como tarjetas de producto y galerías de imágenes.
- Previews interactivas para comparar ambos kits desde el explorador.
- Paquetes para React, Web Components y Vue.

## Inicio rápido

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000` para explorar la galería de componentes.

### React

```tsx
import { RetroButton } from "@your-scope/retrokit-ui"

export function Example() {
  return <RetroButton>Ejecutar</RetroButton>
}
```

Consulta la documentación específica de cada paquete:

- [`@your-scope/retrokit-ui`](./packages/retro-ui) — componentes React Windows 3.1.
- [`@your-scope/retrokit-elements`](./packages/retro-elements) — Web Components.
- [`@your-scope/retrokit-vue`](./packages/retro-vue) — componentes Vue.

## Filosofía visual

retro-kit-ui no intenta suavizar el pasado: conserva bordes definidos, jerarquías claras, contrastes fuertes y controles reconocibles. Cada detalle está pensado para que el resultado parezca una aplicación de escritorio real de los años 90, pero funcione correctamente en una interfaz actual.

## Estructura

```text
components/
├── retro-ui/       # Kit Windows 3.1 para React
├── mac-ui/         # Kit Mac System 7 para React
└── showcase/       # Explorador y demos interactivas

packages/
├── retro-ui/       # Paquete React
├── retro-elements/ # Web Components
└── retro-vue/      # Paquete Vue
```

## Contribuir

Las contribuciones son bienvenidas. Antes de abrir un pull request:

1. Crea una rama descriptiva para tu cambio.
2. Mantén la estética y los patrones del kit correspondiente.
3. Añade o actualiza el preview del componente.
4. Ejecuta los checks del proyecto:

```bash
pnpm packages:check
pnpm build
```

Para nuevas ideas y tareas pendientes, consulta [`PENDING.md`](./PENDING.md).

## Licencia

Consulta los archivos de licencia incluidos en cada paquete.

<div align="center">

[![Hecho con nostalgia](https://img.shields.io/badge/Hecho_con-nostalgia-f5c542?style=flat-square&labelColor=1f4e9e)](https://github.com/poliedro-69/retro-kit-ui)

</div>
