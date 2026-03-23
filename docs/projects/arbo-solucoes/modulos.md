# Modulos TypeScript

> 14 modulos em `src/modules/`, totalizando ~1.175 linhas de TypeScript puro, sem dependencias de framework.

```
src/modules/
+-- config.ts              [4 linhas]   Constantes globais
+-- shared-components.ts   [269 linhas] Injecao de componentes HTML
+-- navbar.ts              [65 linhas]  Navegacao + acessibilidade
+-- contact-modal.ts       [289 linhas] Formulario PF/PJ + APIs
+-- cnpj-cep-service.ts    [85 linhas]  Masks, rate limit, API calls
+-- dark-mode.ts           [43 linhas]  Tema persistente
+-- scroll-animator.ts     [20 linhas]  Animacoes on-scroll
+-- testimonials.ts        [48 linhas]  Depoimentos randomizados
+-- clients.ts             [63 linhas]  Logos com variantes dark/light
+-- city-flip.ts           [73 linhas]  Carrossel de cidades
+-- related-services.ts    [154 linhas] Cross-linking entre servicos
+-- cookie-consent.ts      [19 linhas]  Banner LGPD
+-- footer.ts              [4 linhas]   Ano dinamico
+-- toast.ts               [38 linhas]  Notificacoes transientes
```

---

## shared-components.ts - Component Injection

O modulo mais critico. Gera HTML para componentes globais e injeta no DOM.

| Funcao | Responsabilidade |
|--------|-----------------|
| `renderNavbar()` | Header com links, tema, hamburger |
| `renderFooter()` | Footer com credenciais e navegacao |
| `renderContactModal()` | Dialog com formulario completo PF/PJ |
| `renderCookieConsent()` | Banner de cookies LGPD |
| `injectSharedComponents()` | Orquestra injecao no DOM |

**Idempotencia**: Cada injecao verifica se o elemento ja existe antes de criar, permitindo override via HTML.

**Deteccao de contexto**: `isHomePage()` gera `href` correto (relativo vs absoluto).

**Acessibilidade integrada**: `aria-label`, `aria-expanded`, `aria-selected`, `role="tablist"`, skip link.

---

## navbar.ts - Navegacao Responsiva

### Funcionalidades

1. **Scroll Detection**: `.navbar--scrolled` quando `scrollY > 50`
2. **Mobile Menu**: Toggle do hamburger com troca de icone (menu/X)
3. **Focus Trap**: Tab cycling dentro do menu mobile aberto
4. **Escape Key**: Fecha menu ao pressionar ESC
5. **Body Lock**: `menu-open` previne scroll do body

### Focus Trap (Acessibilidade)

```typescript
menu.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusable = menu.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
```

::: tip Acessibilidade
Usuarios de teclado/screen reader nao ficam "presos" fora do menu. Essencial para WCAG 2.1 compliance.
:::

---

## contact-modal.ts - Formulario Inteligente

O modulo mais complexo (289 linhas). Formulario de orcamento com:

### Sistema de Tabs PF/PJ

```
+------------------+-------------------+
|  Pessoa Fisica   |  Pessoa Juridica  |  <-- Tabs com aria-selected
+------------------+-------------------+
|  Nome / Razao Social  (label muda)  |
|  CNPJ (so aparece para PJ)          |
|  Telefone, Email                     |
|  CEP  [auto-fill endereco]           |
|  Endereco, Numero, Bairro            |
|  Cidade, UF                          |
|  Servico desejado (dropdown)         |
|  Descricao                           |
|  [Solicitar Orcamento via WhatsApp]  |
+--------------------------------------+
```

### Integracoes API

**CNPJ Lookup** (publica.cnpj.ws):
- Dispara ao digitar 14 digitos
- Rate limit: 3 requests/minuto
- Auto-preenche: razao social, endereco, telefone
- Feedback visual: indicador verde/vermelho

**CEP Lookup** (viacep.com.br):
- Dispara ao digitar 8 digitos
- Auto-preenche: logradouro, bairro, cidade, UF

### Submissao via WhatsApp

```typescript
const message = `*Solicitacao de Orcamento*
*ID*: #${quoteId}
*Tipo*: ${personType === 'pf' ? 'Pessoa Fisica' : 'Pessoa Juridica'}
*Nome*: ${name}
*Servico*: ${service}`;

window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
```

### Dialog Management
- Elemento nativo `<dialog>` (semanticamente correto)
- Click fora fecha, Escape fecha
- Previne scroll do body quando aberto

---

## cnpj-cep-service.ts - Masks e API Layer

### Input Masking

```typescript
export function applyCnpjMask(value: string): string {
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}
// 12345678000190 -> 12.345.678/0001-90
```

### Rate Limiting

```typescript
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000; // 1 minuto
const timestamps: number[] = [];

function checkRateLimit(): boolean {
  const now = Date.now();
  while (timestamps.length && timestamps[0] < now - RATE_WINDOW) {
    timestamps.shift();
  }
  return timestamps.length < RATE_LIMIT;
}
```

::: warning Rate Limiting
APIs publicas brasileiras tem rate limits agressivos. Proteger no client evita bloqueio do IP e melhora a experiencia do usuario.
:::

---

## dark-mode.ts - Theme System

### Hierarquia de preferencia

```
1. localStorage('arbo_theme')    --> Escolha explicita do usuario
2. prefers-color-scheme: dark    --> Preferencia do OS
3. Light mode                    --> Fallback padrao
```

### Implementacao

```typescript
export function initDarkMode() {
  const stored = localStorage.getItem('arbo_theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }

  // Reage a mudanca do OS
  matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('arbo_theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
}
```

**CSS-driven**: JS so adiciona/remove `.dark`. Todas as cores resolvidas por Custom Properties.

---

## scroll-animator.ts - Animacoes on-scroll

Apenas 20 linhas. Performance via IntersectionObserver:

```typescript
export function initScrollAnimator() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.style.animationDelay = el.dataset.animDelay || '0ms';
        el.classList.add('anim-visible');
        observer.unobserve(el); // Single-fire
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.anim-target').forEach(el => observer.observe(el));
}
```

::: info Padrao
JavaScript como trigger, CSS como motor de animacao. Zero dependencias de animation libraries.
:::

---

## testimonials.ts e clients.ts - Fetch + Shuffle

### Padrao compartilhado

```typescript
// Fisher-Yates shuffle
for (let i = data.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [data[i], data[j]] = [data[j], data[i]];
}
```

- Dados em JSON estatico (`public/data/`)
- Shuffle client-side a cada visita
- Animacao staggered (0, 100, 200, 300ms)
- `clients.ts` suporta logos light/dark mode com `loading="lazy"`

---

## related-services.ts - Cross-linking

### Service Map + Relationship Map

```typescript
const SERVICE_MAP = {
  'poda': { slug: 'poda', title: 'Poda de Arvores', icon: '...' },
  // ... 13 servicos
};

const RELATED: Record<string, string[]> = {
  'poda': ['corte-arvores', 'analise-risco', 'laudos-tecnicos', 'autorizacoes', 'art'],
  'corte-arvores': ['poda', 'analise-risco', 'autorizacoes', 'laudos-tecnicos', 'rt'],
  // ... cada servico -> 5 relacionados
};
```

Detecta pagina atual via `window.location.pathname`, gera cards e injeta antes do `.contact-cta`.

**Impacto SEO**: Links internos distribuem autoridade entre paginas e reduzem bounce rate.

---

## Padroes recorrentes

| Padrao | Modulos | Descricao |
|--------|---------|-----------|
| **IntersectionObserver** | scroll-animator, city-flip | JS detecta visibilidade, CSS anima |
| **localStorage** | dark-mode, cookie-consent | Persistencia leve entre sessoes |
| **Fetch + Shuffle** | testimonials, clients | JSON estatico, conteudo fresco a cada visita |
| **Progressive Enhancement** | Todos | Site funciona sem JS, modulos sao opcionais |
