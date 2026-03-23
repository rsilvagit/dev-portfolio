# Arquitetura

## Multi-Page Application (MPA)

```
                    +-------------------+
                    |   vite.config.ts  |
                    |  (14 entry points)|
                    +--------+----------+
                             |
              +--------------+--------------+
              |                             |
     +--------v--------+          +--------v--------+
     |   index.html    |          | servicos/*/     |
     |   (Homepage)    |          | index.html (x13)|
     +--------+--------+          +--------+--------+
              |                             |
              +-------------+---------------+
                            |
                   +--------v--------+
                   |    src/main.ts  |
                   |  (Entry point)  |
                   +--------+--------+
                            |
              +-------------+-------------+
              |             |             |
     +--------v--+  +------v------+ +---v-----------+
     | modules/  |  | styles/     | | public/       |
     | (14 .ts)  |  | (22 .css)  | | (data, imgs)  |
     +-----------+  +-------------+ +---------------+
```

## Roteamento baseado em arquivos

Cada pagina de servico e um entry point independente no Vite:

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, "index.html"),
      "poda": resolve(__dirname, "servicos/poda/index.html"),
      "corte-arvores": resolve(__dirname, "servicos/corte-arvores/index.html"),
      // ... 13 paginas de servico
    }
  }
}
```

**Beneficios**:
- Cada pagina carrega apenas o JS necessario
- SEO-friendly: HTML real servido pelo servidor
- Code splitting automatico pelo Rollup
- Funciona sem JavaScript (progressive enhancement)

## Fluxo de inicializacao

```
DOMContentLoaded
  |
  v
injectSharedComponents()  --> Navbar, Footer, Modal, Cookie Banner
  |
  v
initDarkMode()            --> Tema (localStorage + system preference)
  |
  v
initNavbar()              --> Scroll detection, mobile menu, focus trap
  |
  v
await initTestimonials()  --> Fetch JSON, shuffle, render 4 cards
await initClients()       --> Fetch JSON, shuffle, render 8 logos
  |
  v
initScrollAnimator()      --> IntersectionObserver para animacoes
initCityFlip()            --> Carrossel de cidades
injectRelatedServices()   --> Cross-linking entre servicos
  |
  v
initContactModal()        --> Dialog, tabs PF/PJ, CNPJ/CEP lookup
initFooter()              --> Ano dinamico
initCookieConsent()       --> Banner LGPD
```

A ordem importa: componentes injetados primeiro, depois tema, depois interatividade.

## Estrutura de diretorios

```
arbo-sparkle-refresh/
|
+-- index.html                    # Homepage
+-- servicos/                     # 13 landing pages de servico
|   +-- poda/index.html
|   +-- corte-arvores/index.html
|   +-- analise-risco/index.html
|   +-- laudos-tecnicos/index.html
|   +-- consultoria-ambiental/index.html
|   +-- licenciamento-ambiental/index.html
|   +-- plantios-compensatorios/index.html
|   +-- monitoramento-vegetacao/index.html
|   +-- cobertura-vegetal/index.html
|   +-- autorizacoes/index.html
|   +-- biologo/index.html
|   +-- art/index.html
|   +-- rt/index.html
|
+-- src/
|   +-- main.ts                   # Entry point unico
|   +-- modules/                  # 14 modulos TypeScript
|   +-- styles/                   # 22 arquivos CSS modulares
|
+-- public/
|   +-- data/                     # JSON (clientes, depoimentos)
|   +-- images/                   # Assets estaticos
|   +-- robots.txt, sitemap.xml
|
+-- .github/workflows/static.yml # CI/CD
+-- vite.config.ts                # Build + MPA routing
+-- tsconfig.json                 # TypeScript strict mode
```

## Decisoes arquiteturais

### 1. Component Injection Pattern

Em vez de usar um framework com componentes, o projeto injeta HTML via JavaScript:

```typescript
// shared-components.ts
export function injectSharedComponents() {
  // Injeta navbar no topo
  document.body.insertAdjacentHTML('afterbegin', renderNavbar());
  // Cria <main> wrapper
  // Injeta footer antes do fechamento do body
  // Injeta modal de contato
  // Injeta cookie consent
}
```

**Trade-off**: Menos ergonomico que JSX, mas zero overhead de virtual DOM.

### 2. Data Layer via JSON

Dados dinamicos (clientes, depoimentos) vivem em `public/data/*.json`:

- Facil de atualizar sem tocar no codigo
- Versionado junto com o projeto
- Servido estaticamente com cache do CDN
- Randomizacao client-side para conteudo fresco

### 3. API Integration Pattern

O modulo `cnpj-cep-service.ts` implementa:

- **Input masking**: Formatacao automatica de CNPJ/CEP
- **Rate limiting client-side**: 3 requests/min para proteger APIs publicas
- **Auto-fill**: Busca CNPJ preenche razao social, endereco, telefone
- **Error handling**: Mensagens especificas para cada tipo de falha

### 4. Theme System

Dark mode implementado com CSS Custom Properties:

```css
:root { --background: 40 20% 97%; }      /* Light */
.dark { --background: 40 18% 5%; }        /* Dark */
```

JavaScript apenas faz toggle da classe `.dark` no `<html>`. Toda a logica visual e CSS-only.

## Configuracao TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

- **strict: true** - Type checking completo
- **noEmit** - Vite transpila, TS so valida tipos
- **bundler resolution** - Otimizado para Vite
- **Path alias** - `@/modules/navbar` em vez de caminhos relativos
