# Sanjeevan Portfolio

## Run locally

Install the frontend packages once:

```bash
npm install
```

Install the API server packages once:

```bash
cd server
npm install
cd ..
```

Copy `.env.example` to `server/.env` and set `NVIDIA_API_KEY`. Then start both apps on Windows:

```bash
npm run dev:full
```

Or use two terminals: run `npm run dev` in one and `npm run dev:server` in the other. The website is available at `http://localhost:5173` and the API server at `http://localhost:4000`.

MongoDB is optional for the portfolio agent. Without it, locally bundled project cards remain visible, but the projects and contact API endpoints cannot store or retrieve database data.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
