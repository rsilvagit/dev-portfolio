# Arbo Solucoes

Site institucional para uma empresa de consultoria ambiental em Porto Alegre/RS, especializada em manejo arboreo, laudos tecnicos e licenciamento ambiental.

::: info Links do projeto
**URL**: [www.arbosolucoes.com](https://www.arbosolucoes.com) | **Repo**: [github.com/rsilvagit/arbo-sparkle-refresh](https://github.com/rsilvagit/arbo-sparkle-refresh)
:::

---

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Linguagem** | TypeScript (ES2020) | Type safety, autocompletion, refactoring seguro |
| **Build** | Vite 5.4 | HMR rapido, tree-shaking, code splitting nativo |
| **Estilo** | CSS puro + Custom Properties | Zero overhead de runtime, tokens reutilizaveis |
| **Hospedagem** | GitHub Pages | Deploy automatico via GitHub Actions, CDN global |

## Por que sem framework?

::: tip Decisao intencional
A escolha de nao usar React, Vue ou qualquer framework SPA foi baseada em trade-offs reais, nao em limitacao tecnica.
:::

1. **Performance** - Zero KB de JavaScript de framework. Bundle final minimo
2. **SEO** - Paginas HTML estaticas reais - nao depende de JS para renderizar conteudo
3. **Simplicidade** - Para um site institucional com 14 paginas, um framework seria over-engineering
4. **Manutencao** - Menos dependencias = menos vulnerabilidades e breaking changes
5. **Core Web Vitals** - LCP, FID e CLS otimizados naturalmente sem hydration

## Numeros do projeto

| Metrica | Valor |
|---------|-------|
| **Paginas** | 14 (1 home + 13 servicos) |
| **Modulos TypeScript** | 14 arquivos (~1.175 linhas) |
| **Arquivos CSS** | 22 (design system modular) |
| **Dependencias runtime** | 1 |
| **Schemas JSON-LD** | 4 tipos (LocalBusiness, Service, FAQ, Breadcrumb) |
| **Custo operacional** | ~R$ 40/ano (dominio) |

## Competencias demonstradas

| Area | Tecnologias |
|------|------------|
| **Frontend** | TypeScript, HTML semantico, CSS puro, DOM APIs |
| **Build Tools** | Vite, Rollup, MPA routing, env variables |
| **Design System** | CSS Custom Properties, HSL tokens, BEM, dark mode |
| **SEO** | JSON-LD, Open Graph, sitemap, robots, geo-targeting |
| **Performance** | Preload, lazy loading, IntersectionObserver, code splitting |
| **Acessibilidade** | WCAG 2.1, ARIA, focus management, keyboard navigation |
| **DevOps** | GitHub Actions, GitHub Pages, CI/CD, custom domain |
| **API Integration** | REST (CNPJ/CEP), rate limiting, input masking |
| **UX** | Formularios inteligentes, WhatsApp integration, animacoes |

## Documentacao

| Secao | Conteudo |
|-------|---------|
| [Arquitetura](./arquitetura) | MPA, fluxo de inicializacao, decisoes de design |
| [Modulos TypeScript](./modulos) | Detalhamento dos 14 modulos |
| [Design System CSS](./design-system) | Tokens, componentes, responsividade |
| [SEO e Performance](./seo-performance) | Schema markup, Core Web Vitals, a11y |
| [Deploy e CI/CD](./deploy) | GitHub Actions, dominio custom, fluxo de trabalho |
