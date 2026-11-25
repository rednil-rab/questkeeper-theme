# @questkeeper/theme

The shared 8-bit theme for Questkeeper and the campaign agent: design tokens, base CSS classes and a few React components.

## Install

```sh
npm i github:rednil-rab/questkeeper-theme#v1.0.1
```

Always pin a tag. React 18 is a peer dependency. The package builds itself on install (`prepare`).

## Use

Import the two sheets before your own CSS, so your app styles can build on them:

```ts
import '@questkeeper/theme/tokens.css';
import '@questkeeper/theme/base.css';
import './app.css';
```

Add the pixel fonts to your `index.html` (the tokens fall back to `monospace` if they fail to load; both fonts are SIL OFL):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
```

## Components

```tsx
import { Button, Dialog, Panel, Tag } from '@questkeeper/theme';
```

| Component | Renders |
|---|---|
| `Panel({ title?, children })` | `<section class="panel">` with an optional `panel__title` heading |
| `Tag({ tone?, children })` | `<span class="tag tag--<tone>">`, tone is `amber` (default), `cyan`, `danger` or `muted` |
| `Button({ variant?, ...button props })` | `<button class="button button--<variant>">`, `variant` is `danger` or `ghost`; `type` defaults to `button` |
| `Dialog({ title, onClose, children })` | a modal on the native `<dialog>`; mount it to open, unmount to close |

## Contract

Class names and token names (`tokens.css`, `base.css`) are the API. Renaming or removing one is a breaking change and needs a new major version. App-specific layout stays in each app.

## Releasing

1. Change the package, run `npm run lint && npm run typecheck && npm test && npm run build`.
2. Merge to `main`, bump `version` in `package.json`, and tag it (`vX.Y.Z`).
3. Bump the tag in each app's `package.json` and reinstall.
