# @your-scope/retrokit-vue

Vue 3 components for the Windows 3.1 and Mac System 7 UI kits, with `v-model`, typed props and named slots. Works in Vite and Nuxt.

Part of RetroKit. Built on `@your-scope/retrokit-elements`, which is installed with this package.

## Install

```bash
npm install @your-scope/retrokit-vue
```

Requires Vue 3.4 or newer.

## Register

Register every component globally:

```ts
// main.ts
import { createApp } from 'vue'
import RetroKit from '@your-scope/retrokit-vue'
import '@your-scope/retrokit-elements/themes.css' // optional: color + font themes

createApp(App).use(RetroKit).mount('#app')
```

Or import only what you need:

```vue
<script setup lang="ts">
import { RtWindow, RtButton, MacWindow } from '@your-scope/retrokit-vue'
</script>
```

## Use

```vue
<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const plan = ref('pro')
const open = ref(false)
</script>

<template>
  <RtWindow heading="Hello.exe">
    <template #status>Ready</template>
    <RtInput v-model="name" label="Your name" />
    <RtGroup legend="Plan">
      <RtRadio v-model="plan" value="free">Free</RtRadio>
      <RtRadio v-model="plan" value="pro">Pro</RtRadio>
    </RtGroup>
    <RtButton variant="primary" @click="open = true">Open dialog</RtButton>
    <RtDialog heading="Confirm" :open="open" @close="open = false">
      Save changes?
      <template #actions>
        <RtButton variant="primary" @click="open = false">OK</RtButton>
      </template>
    </RtDialog>
  </RtWindow>
</template>
```

| Windows 3.1 | Mac System 7 |
| --- | --- |
| `RtWindow`, `RtButton`, `RtInput`, `RtCheckbox`, `RtRadio`, `RtGroup`, `RtProgress`, `RtBadge`, `RtTabs`, `RtTab`, `RtDialog` | `MacWindow`, `MacButton`, `MacInput`, `MacCheckbox`, `MacRadio`, `MacGroup`, `MacProgress`, `MacAlert` |

`RtInput`, `RtCheckbox`, `RtRadio`, `RtTabs` and their Mac counterparts support `v-model`. Slots: `menu` and `status` on `RtWindow`, `actions` on `RtDialog` and `MacAlert`.

## Nuxt

The package is safe to import during SSR. Register it with a regular plugin:

```ts
// plugins/retrokit.ts
import RetroKit from '@your-scope/retrokit-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(RetroKit)
})
```

## Raw tags

To write `<rt-window>` tags yourself, tell the Vue compiler they are custom elements:

```ts
import vue from '@vitejs/plugin-vue'
import { isRetroElement } from '@your-scope/retrokit-vue'

export default {
  plugins: [vue({ template: { compilerOptions: { isCustomElement: isRetroElement } } })],
}
```

Full guides: https://machinetix.com/docs

## Attribution required

This package is free for personal and commercial use under MIT with an attribution clause. Any site or app that uses it must show a visible credit with a link to the author:

```html
Built with RetroKit by <a href="https://machinetix.com">Poliedro69</a>
```

For open-source projects that distribute the source, the same credit may go in your README:

```md
Built with RetroKit by [Poliedro69](https://machinetix.com)
```

Read the full terms in the `LICENSE` file shipped with this package.

## License

MIT with Attribution. Copyright (c) 2026 [Poliedro69](https://machinetix.com).
