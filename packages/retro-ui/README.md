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
@source '../node_modules/@your-scope/retrokit/dist';
```

Adjust the `@source` path so it points from your CSS file to `node_modules`.

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
