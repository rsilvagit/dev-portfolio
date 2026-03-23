# Projetos

Documentação técnica detalhada dos meus projetos, cobrindo arquitetura, decisões de design, padrões utilizados e deploy.

---

## Business Assistant API

**Minimal API .NET 9 para gerenciamento de clientes** | C# + PostgreSQL + Redis

| | |
|---|---|
| **Stack** | .NET 9, C# 13, PostgreSQL 16, Redis 7, Docker |
| **Repo** | [github.com/arbo/business-assistant](https://github.com/arbo/business-assistant) |
| **Deploy** | GitHub Actions (staging + production) |

**Highlights:**
- Minimal API .NET 9 com arquitetura flat mantendo SOLID
- JWT + Refresh Token rotation via Redis com blacklist
- Hashing SHA256 com SaltObject e ClaimsMiddleware
- Hierarquia de exceções mapeada para HTTP status codes
- FluentValidation integrado com middleware global
- CI/CD com ambientes separados (staging via develop, prod via tags)

[Ver documentação completa](/projects/business-assistant/)

---

## Arbo Soluções

**Site institucional para consultoria ambiental** | TypeScript + Vite + CSS puro

| | |
|---|---|
| **Stack** | TypeScript, Vite, CSS Custom Properties |
| **URL** | [www.arbosolucoes.com](https://www.arbosolucoes.com) |
| **Repo** | [github.com/rsilvagit/arbo-sparkle-refresh](https://github.com/rsilvagit/arbo-sparkle-refresh) |
| **Deploy** | GitHub Pages (CI/CD automático) |

**Highlights:**
- Zero-framework: TypeScript puro com 14 módulos (~1.175 linhas)
- MPA com 14 entry points e code splitting automático
- Design system CSS com 22 arquivos modulares e dark mode
- SEO avançado com 4 tipos de JSON-LD schema
- Acessibilidade WCAG 2.1 com focus trap e keyboard navigation
- Integrações CNPJ/CEP com rate limiting

[Ver documentação completa](/projects/arbo-solucoes/)

---

## go-work

**Agregador inteligente de vagas** | Go + Redis + Discord/Telegram

| | |
|---|---|
| **Stack** | Go 1.25, Redis, Docker, GitHub Actions |
| **Repo** | [github.com/rsilvagit/go-work](https://github.com/rsilvagit/go-work) |
| **Deploy** | Serverless (GitHub Actions cron) |
| **Custo** | R$ 0/mês |

**Highlights:**
- CLI em Go com ~600 linhas e 6 pacotes internos
- Concorrência com goroutines paralelas por termo de busca
- Sistema anti-ban: UA rotation, jitter, retry com exponential backoff
- Strategy Pattern para scrapers e output writers extensíveis
- Docker multi-stage com imagem de 13MB
- Cache Redis opcional com graceful degradation

[Ver documentação completa](/projects/go-work/)

---

## poke-mcp

**MCP Server para PokeAPI** | Python + FastMCP + PyInstaller

| | |
|---|---|
| **Stack** | Python 3.11+, FastMCP, httpx, PyInstaller |
| **Repo** | [github.com/rsilvagit/poke-mcp](https://github.com/rsilvagit/poke-mcp) |
| **IDEs** | Claude Desktop, Cursor, Windsurf, Claude Code |

**Highlights:**
- 10 ferramentas MCP especializadas para dados Pokémon
- Singleton HTTP client com connection pooling (httpx async)
- Gateway Pattern para centralized error handling
- Markdown output otimizado para redução de token usage
- Standalone .exe via PyInstaller (~23MB, sem Python necessário)
- Installer visual multi-IDE com detecção automática

[Ver documentação completa](/projects/poke-mcp/)
