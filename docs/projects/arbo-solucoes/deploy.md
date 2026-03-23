# Deploy e CI/CD

Pipeline automatizado com GitHub Actions, deploy no GitHub Pages com dominio custom.

## Pipeline

```
git push main
     |
     v
GitHub Actions (.github/workflows/static.yml)
     |
     +-- Checkout codigo
     +-- Setup Node 20
     +-- npm ci (install deps)
     +-- npm run build (vite build)
     +-- Upload artifact (dist/)
     +-- Deploy to GitHub Pages
     |
     v
https://www.arbosolucoes.com (via CNAME)
```

## GitHub Actions Workflow

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]     # Deploy automatico
  workflow_dispatch:        # Deploy manual

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
```

### Decisoes

| Config | Valor | Justificativa |
|--------|-------|---------------|
| **Trigger** | push main | Deploy continuo sem staging |
| **workflow_dispatch** | Habilitado | Deploy manual quando necessario |
| **cancel-in-progress** | false | Nao interrompe deploys ativos |
| **npm ci** | (vs npm install) | Reprodutivel via lockfile |
| **Node 20** | LTS | Estabilidade |

## Build Process (Vite)

```
vite build
  |
  +-- Resolve 14 entry points
  +-- Transpila TypeScript -> JavaScript (ES2020)
  +-- Processa CSS imports -> bundle
  +-- Tree-shaking + code splitting
  +-- Minificacao (Rollup + esbuild)
  +-- Substitui %VITE_SITE_URL% (.env)
  +-- Copia public/ -> dist/
  |
  v
  dist/
  +-- index.html
  +-- servicos/*/index.html
  +-- assets/index-[hash].js
  +-- assets/index-[hash].css
  +-- images/, data/
  +-- robots.txt, sitemap.xml, CNAME
```

## Variaveis de ambiente

```
# .env
VITE_SITE_URL=https://www.arbosolucoes.com
```

Vite substitui `%VITE_SITE_URL%` no HTML durante o build para canonical URLs, Open Graph e schema markup.

## Dominio Custom

**CNAME**: `public/CNAME` contem `www.arbosolucoes.com`

```
www.arbosolucoes.com  -->  CNAME  -->  rsilvagit.github.io
```

SSL automatico via Let's Encrypt (GitHub Pages).

## Fluxo de desenvolvimento

```
1. git checkout -b feature/nome
2. npm run dev (localhost:8080 com HMR)
3. git commit + push
4. Pull Request no GitHub
5. Review + Merge na main
6. GitHub Actions -> deploy (~2 min)
7. Site atualizado
```

## Seguranca

| Aspecto | Implementacao |
|---------|--------------|
| **HTTPS** | Let's Encrypt via GitHub Pages |
| **Permissions** | GITHUB_TOKEN com minimo privilegio |
| **Dependencies** | 1 runtime + 2 devDeps |
| **npm ci** | Lockfile-only (previne supply chain) |
| **Static site** | Sem backend, sem banco, sem servidor |

## Custos

| Recurso | Custo |
|---------|-------|
| Hosting | Gratuito (GitHub Pages) |
| SSL | Gratuito (Let's Encrypt) |
| CI/CD | Gratuito (GitHub Actions) |
| Dominio | ~R$ 40/ano |
| **Total** | **~R$ 40/ano** |
