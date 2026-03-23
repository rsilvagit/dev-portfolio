# Arbo Soluções

Site institucional para uma empresa de consultoria ambiental em Porto Alegre/RS, especializada em manejo arbóreo, laudos técnicos e licenciamento ambiental.

::: info Links do projeto
**URL**: [www.arbosolucoes.com](https://www.arbosolucoes.com) | **Repo**: [github.com/rsilvagit/arbo-sparkle-refresh](https://github.com/rsilvagit/arbo-sparkle-refresh)
:::

---

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Linguagem** | TypeScript (ES2020) | Type safety, autocompletion, refactoring seguro |
| **Build** | Vite 5.4 | HMR rápido, tree-shaking, code splitting nativo |
| **Estilo** | CSS puro + Custom Properties | Zero overhead de runtime, tokens reutilizáveis |
| **Hospedagem** | GitHub Pages | Deploy automático via GitHub Actions, CDN global |

## Por que sem framework?

::: tip Decisão intencional
A escolha de não usar React, Vue ou qualquer framework SPA foi baseada em trade-offs reais, não em limitação técnica.
:::

1. **Performance** - Zero KB de JavaScript de framework. Bundle final mínimo
2. **SEO** - Páginas HTML estáticas reais - não depende de JS para renderizar conteúdo
3. **Simplicidade** - Para um site institucional com 14 páginas, um framework seria over-engineering
4. **Manutenção** - Menos dependências = menos vulnerabilidades e breaking changes
5. **Core Web Vitals** - LCP, FID e CLS otimizados naturalmente sem hydration

## Números do projeto

| Métrica | Valor |
|---------|-------|
| **Páginas** | 14 (1 home + 13 serviços) |
| **Módulos TypeScript** | 14 arquivos (~1.175 linhas) |
| **Arquivos CSS** | 22 (design system modular) |
| **Dependências runtime** | 1 |
| **Schemas JSON-LD** | 4 tipos (LocalBusiness, Service, FAQ, Breadcrumb) |
| **Custo operacional** | ~R$ 40/ano (domínio) |

## Competências demonstradas

| Área | Tecnologias |
|------|------------|
| **Frontend** | TypeScript, HTML semântico, CSS puro, DOM APIs |
| **Build Tools** | Vite, Rollup, MPA routing, env variables |
| **Design System** | CSS Custom Properties, HSL tokens, BEM, dark mode |
| **SEO** | JSON-LD, Open Graph, sitemap, robots, geo-targeting |
| **Performance** | Preload, lazy loading, IntersectionObserver, code splitting |
| **Acessibilidade** | WCAG 2.1, ARIA, focus management, keyboard navigation |
| **DevOps** | GitHub Actions, GitHub Pages, CI/CD, custom domain |
| **API Integration** | REST (CNPJ/CEP), rate limiting, input masking |
| **UX** | Formulários inteligentes, WhatsApp integration, animações |

## Documentação

| Seção | Conteúdo |
|-------|---------|
| [Arquitetura](./arquitetura) | MPA, fluxo de inicialização, decisões de design |
| [Módulos TypeScript](./modulos) | Detalhamento dos 14 módulos |
| [Design System CSS](./design-system) | Tokens, componentes, responsividade |
| [SEO e Performance](./seo-performance) | Schema markup, Core Web Vitals, a11y |
| [Deploy e CI/CD](./deploy) | GitHub Actions, domínio custom, fluxo de trabalho |
