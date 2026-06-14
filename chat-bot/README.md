# chat-bot

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
npm --prefix server install
```

### Compile and Hot-Reload for Development

Start Ollama first, then run the Vue app and API server together:

```sh
ollama serve
ollama pull llama3.1:8b
```

```sh
npm run dev
```

The app runs through Vite and proxies `/api` requests to the Express server on port 3000.

You can change the backend settings with environment variables:

```sh
$env:PORT=3000; $env:OLLAMA_URL="http://localhost:11434"; $env:OLLAMA_MODEL="llama3.1:8b"; npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
