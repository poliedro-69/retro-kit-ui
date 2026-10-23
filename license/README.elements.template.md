# {{elementsPackage}}

Free Windows 3.1 and Mac System 7 inspired Web Components. Works in Next.js and plain HTML with a bundler.

Part of {{product}}. Looking for React components? Use `{{reactPackage}}`.

## Install

```bash
npm install {{elementsPackage}}
```

## Register the elements

Importing the package defines every custom element. It is safe to import on the server, so SSR frameworks need no special handling.

```js
import '{{elementsPackage}}'
import '{{elementsPackage}}/themes.css' // optional: color + font themes
```

Import a single kit to ship less code:

```js
import '{{elementsPackage}}/windows' // rt-* elements
import '{{elementsPackage}}/mac' // mac-* elements
```

## Use

```html
<rt-window heading="Hello.exe">
  <rt-input label="Your name"></rt-input>
  <rt-checkbox>Subscribe to updates</rt-checkbox>
  <rt-button variant="primary">OK</rt-button>
</rt-window>
```

| Windows 3.1 | Mac System 7 |
| --- | --- |
| `rt-window`, `rt-button`, `rt-input`, `rt-checkbox`, `rt-radio`, `rt-group`, `rt-progress`, `rt-badge`, `rt-tabs`, `rt-tab`, `rt-dialog` | `mac-window`, `mac-button`, `mac-input`, `mac-checkbox`, `mac-radio`, `mac-group`, `mac-progress`, `mac-alert` |

Props are attributes in kebab-case, and booleans are present or absent. Elements fire native `input`, `change` and `close` events that bubble through the shadow root.

## Frameworks

- **React and Next.js:** add `/// <reference types="{{elementsPackage}}/react" />` for JSX typings.

Full guides: {{siteUrl}}/docs

## Themes

Colors and fonts are independent. Set `data-rt-theme` and `data-rt-font` on `<html>` or any ancestor.

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

## Attribution required

This package is free for personal and commercial use under MIT with an attribution clause. Any site or app that uses it must show a visible credit with a link to the author:

```html
{{creditHtml}}
```

For open-source projects that distribute the source, the same credit may go in your README:

```md
{{creditMarkdown}}
```

Read the full terms in the `LICENSE` file shipped with this package.

## License

MIT with Attribution. Copyright (c) {{year}} [{{authorName}}]({{authorUrl}}).
