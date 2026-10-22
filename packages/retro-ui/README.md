# RetroKit

Free Windows 3.1 and Mac System 7 inspired UI kits for React and Tailwind CSS v4.

## Install

```bash
npm install @your-scope/retrokit
```

Peer dependencies: `react` 18 or 19 and `tailwindcss` 4.

## Set up Tailwind

Import the tokens and tell Tailwind to scan the package, because Tailwind ignores `node_modules` by default.

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@your-scope/retrokit/styles.css';
@import '@your-scope/retrokit/themes.css'; /* optional: color + font themes */
@source '../node_modules/@your-scope/retrokit/dist';
```

Adjust the `@source` path so it points from your CSS file to `node_modules`.

## Themes

Colors and fonts are independent. Set `data-rt-theme` and `data-rt-font` on any element (usually `<html>`), or wrap a subtree in `<RetroTheme>`.

| `data-rt-theme` | Look |
| --- | --- |
| `navy` (default) | Classic Navy |
| `hotdog` | Hot Dog Stand |
| `phosphor` | Phosphor Green terminal |
| `amber` | Amber Terminal |
| `rose` | Rose / Pastel |
| `dark` | Dark Mode |

| `data-rt-font` | Font |
| --- | --- |
| `plex` (default) | IBM Plex Sans + Mono |
| `pixel` | VT323 + Press Start 2P |
| `system` | Chicago-like system stack |
| `mono` | IBM Plex Mono everywhere |

```tsx
import { RetroTheme, RetroWindow } from '@your-scope/retrokit/windows'

<RetroTheme theme="phosphor" font="pixel">
  <RetroWindow title="Terminal.exe">...</RetroWindow>
</RetroTheme>
```

Fonts read the CSS variables `--font-plex-sans`, `--font-plex-mono`, `--font-vt323` and `--font-press-start` (for example from `next/font`), and fall back to the font names if you load them another way.

## Use

```tsx
import { RetroWindow, RetroButton } from '@your-scope/retrokit/windows'
import { MacWindow, MacButton } from '@your-scope/retrokit/mac'

export function Demo() {
  return (
    <RetroWindow title="Hello.exe">
      <RetroButton variant="primary">OK</RetroButton>
    </RetroWindow>
  )
}
```

Entry points: `@your-scope/retrokit` (both kits), `/windows`, `/mac` and `/styles.css`.

## Prefer to own the code?

Copy the components into your project with the shadcn CLI:

```bash
npx shadcn@latest add https://retrokit.example.com/r/retro-ui.json
npx shadcn@latest add https://retrokit.example.com/r/mac-ui.json
```

## License

MIT with Attribution. Free for personal and commercial use, as long as you show the credit
"Built with RetroKit by Your Name" linking to https://example.com. See `LICENSE`.
