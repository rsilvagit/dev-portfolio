# poke-mcp

MCP Server que expoe a PokeAPI v2 como ferramentas para agentes de IA. Funciona com Claude Desktop, Cursor, Windsurf e Claude Code CLI.

::: info Links do projeto
**Repo**: [github.com/rsilvagit/poke-mcp](https://github.com/rsilvagit/poke-mcp)
:::

---

## O que e MCP?

**Model Context Protocol** e o padrao aberto da Anthropic para conectar LLMs a fontes de dados externas. Um MCP Server expoe "tools" que agentes de IA podem invocar para buscar informacoes em tempo real.

## O Projeto

Um MCP Server com 10 ferramentas especializadas para consultar dados Pokemon:

### Pokemon
| Tool | Descricao |
|------|-----------|
| `get_pokemon` | Stats, tipos, abilities, sprites, altura, peso |
| `get_pokemon_species` | Flavor text, habitat, evolution chain, egg groups |
| `list_pokemon` | Listagem paginada (1-100 por pagina) |
| `get_pokemon_encounters` | Locais de encontro por versao do jogo |

### Batalha
| Tool | Descricao |
|------|-----------|
| `get_type` | Relacoes de dano (2x, 0.5x, 0x) para ataque e defesa |
| `get_move` | Power, accuracy, PP, efeitos, meta info |
| `get_ability` | Descricao da ability e lista de Pokemon |

### Itens e Evolucao
| Tool | Descricao |
|------|-----------|
| `get_item` | Custo, categoria, efeitos |
| `get_berry` | Tempo de crescimento, sabores, natural gift |
| `get_evolution_chain` | Arvore completa com triggers (level-up, item, trade) |

## Numeros

| Metrica | Valor |
|---------|-------|
| **Linguagem** | Python 3.11+ |
| **Framework** | FastMCP (MCP SDK >= 1.2.0) |
| **Tools** | 10 ferramentas especializadas |
| **HTTP Client** | httpx async com connection pooling |
| **Distribuicao** | Standalone .exe via PyInstaller |
| **IDEs suportadas** | 4 (Claude Desktop, Cursor, Windsurf, Claude Code) |

## Competencias demonstradas

| Area | Tecnologias |
|------|------------|
| **MCP Protocol** | FastMCP, stdio transport, tool registration |
| **Python Async** | asynccontextmanager, httpx async, connection pooling |
| **Design Patterns** | Singleton (HTTP client), Registry (installer), Gateway (fetch) |
| **Packaging** | PyInstaller com hidden imports, standalone .exe |
| **Testing** | pytest async, HTTP mocking, fixtures |
| **UX** | Installer visual com ANSI colors, menu interativo multi-IDE |

## Documentacao

| Secao | Conteudo |
|-------|---------|
| [Arquitetura](./arquitetura) | FastMCP, lifespan, Gateway pattern, Markdown output |
| [Installer e Distribuicao](./distribuicao) | PyInstaller, multi-IDE installer, registry pattern |
