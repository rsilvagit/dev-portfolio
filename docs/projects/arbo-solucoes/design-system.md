# Design System CSS

> 22 arquivos CSS modulares com design tokens HSL, dark mode nativo e responsividade mobile-first.

::: tip Princípios
- **CSS puro** - Sem Sass, Less, PostCSS ou Tailwind
- **Custom Properties** - Variáveis nativas substituem pré-processadores
- **Zero runtime** - Nenhum CSS-in-JS, tudo cacheable pelo browser
- **BEM-like** - Nomenclatura semântica previne colisões sem scoping
:::

## Arquitetura de arquivos

```
src/styles/main.css (Index de imports)
  |
  +-- Fundação
  |   +-- variables.css       Design tokens (cores, fontes, gradientes)
  |   +-- reset.css           Normalização baseline
  |   +-- base.css            Tipografia global
  |   +-- layout.css          Container, spacing, skip link
  |   +-- animations.css      Keyframes + triggers
  |   +-- buttons.css         Variantes de botão
  |
  +-- Seções
  |   +-- navbar.css          Navegação fixa
  |   +-- hero.css            Hero section
  |   +-- about.css           Sobre a empresa
  |   +-- services.css        Grid de serviços
  |   +-- testimonials.css    Depoimentos
  |   +-- clients.css         Logos de clientes
  |   +-- contact.css         CTA de contato
  |   +-- footer.css          Rodapé
  |
  +-- Componentes
  |   +-- modal.css           Dialog de formulário
  |   +-- toast.css           Notificações
  |   +-- cookie-consent.css  Banner LGPD
  |   +-- city-flip.css       Animação de cidades
  |
  +-- Templates
  |   +-- service-page.css    Páginas de serviço
  |   +-- ads-landing.css     Landing pages
  |
  +-- Temas
      +-- dark-mode.css       Overrides dark theme
```

---

## Design Tokens

### Cores HSL

HSL permite manipulação fácil de opacidade: `hsl(var(--color) / 0.5)`

```css
:root {
  /* Backgrounds */
  --background: 40 20% 97%;           /* Off-white quente */
  --foreground: 150 30% 12%;          /* Verde escuro */
  --card: 40 20% 99%;
  --muted: 40 15% 92%;
  --muted-foreground: 150 10% 40%;

  /* Brand */
  --primary: 145 45% 22%;            /* Verde profundo */
  --primary-foreground: 40 20% 97%;
  --accent: 90 50% 40%;              /* Verde lima vibrante */
  --accent-foreground: 0 0% 100%;

  /* Feedback */
  --destructive: 0 84.2% 60.2%;     /* Vermelho erro */

  /* UI */
  --border: 150 15% 85%;
  --ring: 145 45% 22%;
  --radius: 0.75rem;
}
```

### Dark Mode

```css
.dark {
  --background: 40 18% 5%;           /* Quase preto */
  --foreground: 40 20% 95%;          /* Off-white */
  --primary: 90 50% 45%;            /* Verde mais brilhante */
  --accent: 90 55% 50%;             /* Accent mais vibrante */
  --border: 40 10% 18%;
}
```

::: info Decisão de contraste
Cores primárias ficam mais brilhantes no dark mode para manter contraste WCAG AA.
:::

### Tipografia

```css
:root {
  --font-display: 'Playfair Display', serif;   /* Headings */
  --font-sans: 'Source Sans 3', sans-serif;    /* Body */
}
```

- **Playfair Display**: Serifas elegantes para headings
- **Source Sans 3**: Sans-serif otimizada para leitura em tela
- Google Fonts com `preconnect` + `font-display: swap`

### Gradientes

```css
:root {
  --hero-gradient: linear-gradient(135deg,
    hsla(150, 40%, 10%, 0.85),
    hsla(150, 35%, 18%, 0.75));

  --cta-gradient: linear-gradient(135deg,
    hsl(145 45% 22%),
    hsl(90 50% 35%));
}
```

---

## Nomenclatura BEM-like

```css
.navbar { }                    /* Block */
.navbar__brand { }             /* Block__Element */
.navbar__link { }
.navbar--scrolled { }          /* Block--Modifier */
.services__card--link { }      /* Block__Element--Modifier */
.clients__logo--dark { }
.btn--cta { }
```

---

## Sistema de animações

### Keyframes

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes cta-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 35px rgba(255,255,255,0.4); }
}
```

### Trigger Pattern

```css
/* Estado inicial: invisível */
.anim-target { opacity: 0; }

/* Ativado via IntersectionObserver */
.anim-visible[data-anim="fade-up"] {
  animation: fade-up 0.6s ease forwards;
}
```

Separação de responsabilidades: JS detecta, CSS executa. `data-anim-delay` permite stagger.

---

## Responsividade

### Breakpoints

| Breakpoint | Largura | Uso |
|-----------|---------|-----|
| **sm** | 640px | 2 colunas em grids |
| **md** | 768px | Headings maiores, tablet |
| **lg** | 1024px | Desktop nav, 3-4 colunas |

### Mobile-first

```css
/* Mobile (default) */
.services__grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .services__grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .services__grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Navbar progressiva

```css
/* Mobile: compacto */
.navbar__logo { height: 2.75rem; }
.navbar__title { font-size: 1.125rem; }

/* Tablet (640px): cresce */
@media (min-width: 640px) {
  .navbar__logo { height: 3.25rem; }
  .navbar__title { font-size: 1.25rem; }
}

/* Desktop (1024px): links aparecem, hamburger desaparece */
@media (min-width: 1024px) {
  .navbar__links { display: flex; }
  .navbar__mobile-actions { display: none; }
  .navbar__logo { height: 4rem; }
}
```

---

## Dark Mode

### Transição suave

```css
* {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease;
}
```

### Overrides específicos

```css
.dark .hero__overlay {
  background: linear-gradient(135deg,
    hsla(150, 40%, 5%, 0.92),
    hsla(150, 35%, 10%, 0.85));
}

.dark img:not(.navbar__logo):not(.clients__logo) {
  filter: brightness(0.9);
}
```

---

## Botões

4 variantes com hover effects:

| Variante | Uso | Visual |
|----------|-----|--------|
| `.btn--cta` | CTA principal | Gradiente verde + scale |
| `.btn--outline-light` | Sobre fundos escuros | Borda branca transparente |
| `.btn--cta-inverse` | Destaque especial | Branco + glow pulsante |
| `.btn--submit` | Formulário | Full-width + gradiente |
