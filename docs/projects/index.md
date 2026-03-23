# Projetos

Documentacao tecnica detalhada dos meus projetos, cobrindo arquitetura, decisoes de design, padroes utilizados e deploy.

---

## Arbo Solucoes

**Site institucional para consultoria ambiental** | TypeScript + Vite + CSS puro

| | |
|---|---|
| **Stack** | TypeScript, Vite, CSS Custom Properties |
| **URL** | [www.arbosolucoes.com](https://www.arbosolucoes.com) |
| **Repo** | [github.com/rsilvagit/arbo-sparkle-refresh](https://github.com/rsilvagit/arbo-sparkle-refresh) |
| **Deploy** | GitHub Pages (CI/CD automatico) |

**Highlights:**
- Zero-framework: TypeScript puro com 14 modulos (~1.175 linhas)
- MPA com 14 entry points e code splitting automatico
- Design system CSS com 22 arquivos modulares e dark mode
- SEO avancado com 4 tipos de JSON-LD schema
- Acessibilidade WCAG 2.1 com focus trap e keyboard navigation
- Integracoes CNPJ/CEP com rate limiting

[Ver documentacao completa](/projects/arbo-solucoes/)

---

## go-work

**Agregador inteligente de vagas** | Go + Redis + Discord/Telegram

| | |
|---|---|
| **Stack** | Go 1.25, Redis, Docker, GitHub Actions |
| **Repo** | [github.com/rsilvagit/go-work](https://github.com/rsilvagit/go-work) |
| **Deploy** | Serverless (GitHub Actions cron) |
| **Custo** | R$ 0/mes |

**Highlights:**
- CLI em Go com ~600 linhas e 6 pacotes internos
- Concorrencia com goroutines paralelas por termo de busca
- Sistema anti-ban: UA rotation, jitter, retry com exponential backoff
- Strategy Pattern para scrapers e output writers extensiveis
- Docker multi-stage com imagem de 13MB
- Cache Redis opcional com graceful degradation

[Ver documentacao completa](/projects/go-work/)

---

## poke-mcp

**MCP Server para PokeAPI** | Python + FastMCP + PyInstaller

| | |
|---|---|
| **Stack** | Python 3.11+, FastMCP, httpx, PyInstaller |
| **Repo** | [github.com/rsilvagit/poke-mcp](https://github.com/rsilvagit/poke-mcp) |
| **IDEs** | Claude Desktop, Cursor, Windsurf, Claude Code |

**Highlights:**
- 10 ferramentas MCP especializadas para dados Pokemon
- Singleton HTTP client com connection pooling (httpx async)
- Gateway Pattern para centralized error handling
- Markdown output otimizado para reducao de token usage
- Standalone .exe via PyInstaller (~23MB, sem Python necessario)
- Installer visual multi-IDE com deteccao automatica

[Ver documentacao completa](/projects/poke-mcp/)
