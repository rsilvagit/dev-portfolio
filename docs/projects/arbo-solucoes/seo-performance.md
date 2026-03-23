# SEO e Performance

Estrategia completa de SEO on-page, structured data, Core Web Vitals e acessibilidade.

## Estrategia SEO

### Objetivo

Ranquear para buscas locais de servicos ambientais em Porto Alegre:

- "poda de arvores porto alegre"
- "consultoria ambiental rs"
- "laudo tecnico arboreo"
- "licenciamento ambiental porto alegre"

### Pilares

```
1. SEO Tecnico     --> HTML semantico, sitemap, robots, canonicals
2. SEO On-page     --> Titulos, meta descriptions, headings, keywords
3. SEO Local       --> Geo-targeting, LocalBusiness schema, NAP
4. Structured Data --> JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb)
5. Content SEO     --> Landing pages por servico, FAQ, cross-linking
```

---

## Meta Tags

### Homepage
```html
<title>Arbo Solucoes | Consultoria Ambiental em Porto Alegre</title>
<meta name="description" content="Consultoria ambiental em Porto Alegre
  desde 2014. Laudos tecnicos, poda e remocao de arvores..." />
```

### Paginas de servico
```html
<title>Poda de Arvore com Responsavel Tecnico | Arbo Solucoes</title>
<meta name="description" content="Servico de poda de arvores em Porto Alegre
  com responsavel tecnico conforme ABNT NBR 16246-1." />
```

### Tags comuns (todas as paginas)
```html
<meta name="robots" content="index, follow" />
<meta name="geo.region" content="BR-RS" />
<meta name="geo.placename" content="Porto Alegre" />
<link rel="canonical" href="https://www.arbosolucoes.com/servicos/poda/" />
```

---

## Open Graph e Twitter Cards

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="Poda de Arvores | Arbo Solucoes" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.arbosolucoes.com/servicos/poda/" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:image" content=".../og-image.png" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="400" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Poda de Arvores | Arbo Solucoes" />
```

---

## Structured Data (JSON-LD)

### 1. LocalBusiness (Homepage)

```json
{
  "@type": "LocalBusiness",
  "name": "Arbo Solucoes",
  "telephone": "+5551984843008",
  "email": "arbopodasejardinagem@gmail.com",
  "address": {
    "addressLocality": "Porto Alegre",
    "addressRegion": "RS",
    "addressCountry": "BR"
  },
  "geo": {
    "latitude": "-30.0346",
    "longitude": "-51.2177"
  },
  "foundingDate": "2014",
  "aggregateRating": {
    "ratingValue": "5",
    "ratingCount": "19"
  },
  "hasOfferCatalog": {
    "itemListElement": ["13 servicos"]
  }
}
```

**Impacto**: Rich snippets no Google (estrelas, telefone, endereco).

### 2. Service (Paginas de servico)

```json
{
  "@type": "Service",
  "name": "Poda de Arvores",
  "provider": { "@type": "LocalBusiness", "name": "Arbo Solucoes" },
  "areaServed": "Porto Alegre e regiao metropolitana",
  "aggregateRating": { "ratingValue": "5", "ratingCount": "19" }
}
```

### 3. BreadcrumbList

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home" },
    { "position": 2, "name": "Servicos" },
    { "position": 3, "name": "Poda de Arvores" }
  ]
}
```

### 4. FAQPage

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Preciso de autorizacao para podar uma arvore?",
      "acceptedAnswer": { "text": "Sim, em Porto Alegre..." }
    }
  ]
}
```

---

## SEO Local

| Sinal | Implementacao |
|-------|--------------|
| **Meta geo.region** | `BR-RS` |
| **Meta geo.placename** | `Porto Alegre` |
| **Schema GeoCoordinates** | -30.0346, -51.2177 |
| **Schema areaServed** | Porto Alegre e regiao metropolitana |
| **City Flip** | 14 cidades rotativas no hero |
| **NAP Consistency** | Dados identicos em schema, footer, modal, config.ts |

---

## Cross-linking

Cada servico linka para 5 relacionados via `related-services.ts`:

```
Poda ---------> Corte, Analise Risco, Laudos, Autorizacoes, ART
Corte --------> Poda, Analise Risco, Autorizacoes, Laudos, RT
Analise ------> Poda, Corte, Laudos, Monitoramento, Licenciamento
```

**Impacto**: Distribui autoridade, aumenta tempo de permanencia, melhora crawlability.

---

## Performance

### Core Web Vitals

| Metrica | Estrategia |
|---------|-----------|
| **LCP** | Preload do hero image, fontes com swap |
| **FID** | Zero framework JS, listeners passivos |
| **CLS** | Dimensoes explicitas em imagens, font swap |

### Otimizacoes

#### Preload de assets criticos
```html
<link rel="preload" as="image" href="/images/hero-bg.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

#### Critical CSS inline
```html
<style>
  html { opacity: 0; transition: opacity 0.15s; }
  html.hydrated { opacity: 1; }
</style>
```

#### Lazy loading
```html
<img src="/images/clients/logo.png" loading="lazy"
     width="120" height="60" alt="Cliente" />
```

#### Code splitting MPA
Cada entry point gera bundle independente. Rollup deduplica modulos compartilhados.

#### Animacoes GPU-accelerated
Usam `transform` e `opacity` (GPU). Nunca `width`, `height`, `top` (layout reflow).

#### IntersectionObserver
Em vez de scroll events que bloqueiam main thread.

### Caching

| Dado | Storage | Duracao |
|------|---------|---------|
| Tema | localStorage | Permanente |
| Cookie consent | localStorage | Permanente |
| Assets | HTTP cache (CDN) | Long-term |
| Fontes | Browser cache | Long-term |

---

## Acessibilidade (WCAG 2.1)

| Feature | Implementacao |
|---------|--------------|
| **Skip link** | Primeiro elemento do DOM, visivel no focus |
| **Semantic HTML** | `<main>`, `<nav>`, `<header>`, `<footer>`, `<dialog>` |
| **ARIA labels** | Todos botoes e links interativos |
| **ARIA expanded** | Estado do hamburger menu |
| **Focus trap** | Tab cycling no menu mobile |
| **Escape key** | Fecha dialogs e menus |
| **Contraste** | Tokens ajustados para AA em ambos temas |
| **Font scaling** | Unidades `rem` em todo o projeto |
| **Alt text** | Todas as imagens com descricao |

---

## Checklist por pagina

Cada uma das 14 paginas implementa:

- [x] Title unico (&lt;60 chars)
- [x] Meta description (~155 chars)
- [x] Canonical URL
- [x] robots: index, follow
- [x] Geo-targeting
- [x] Open Graph completo
- [x] Twitter Card
- [x] JSON-LD schema
- [x] Heading hierarchy (h1 > h2 > h3)
- [x] Links internos (breadcrumb + related)
- [x] Imagens com alt text
- [x] Preload de assets criticos
- [x] Critical CSS inline
