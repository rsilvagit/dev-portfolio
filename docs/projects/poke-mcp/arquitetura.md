# Arquitetura

> FastMCP server com singleton HTTP client, Gateway pattern e output otimizado para LLMs.

## Estrutura do projeto

```
poke-mcp/
├── src/poke_mcp/
│   ├── __init__.py        # Package version (0.1.0)
│   ├── __main__.py        # Entry point
│   ├── server.py          # FastMCP instance, lifespan, shared httpx client
│   └── tools.py           # 10 MCP tools com @mcp.tool() decorator
├── tests/
│   └── test_tools.py      # Testes com mocked HTTP responses
├── build.py               # PyInstaller build script
├── install.py             # Installer multi-IDE
└── pyproject.toml         # Config, deps, ruff/pytest
```

## Stack

| Tecnologia | Versao | Proposito |
|-----------|--------|-----------|
| Python | 3.11+ | Runtime |
| MCP SDK | >= 1.2.0 | Framework (FastMCP, stdio transport) |
| httpx | >= 0.27.0 | HTTP client async com connection pooling |
| PyInstaller | >= 6.0 | Packaging em .exe |
| pytest | >= 8.0 | Testing framework |
| ruff | >= 0.6.0 | Linting e formatting |

## Padroes de arquitetura

### 1. Singleton HTTP Client via Lifespan

```python
@asynccontextmanager
async def app_lifespan(server: FastMCP):
    async with httpx.AsyncClient(
        base_url="https://pokeapi.co/api/v2",
        timeout=30.0,
        limits=httpx.Limits(
            max_connections=20,
            max_keepalive_connections=5
        )
    ) as client:
        server.state["client"] = client
        yield
```

::: tip Por que Singleton?
Um unico `httpx.AsyncClient` compartilhado entre todas as tools evita overhead de criar conexoes a cada request. Connection pooling com 20 conexoes e 5 keep-alive.
:::

### 2. Gateway Pattern

Todas as 10 tools usam uma unica funcao `fetch()`:

```python
async def fetch(client: httpx.AsyncClient, path: str) -> dict:
    response = await client.get(path)
    response.raise_for_status()
    return response.json()
```

::: info Beneficio
Centralized error handling, URL construction e logging em um unico ponto. Adicionar retry, cache ou metrics requer mudanca em um so lugar.
:::

### 3. Markdown Output (nao JSON)

As tools retornam texto formatado em Markdown, nao JSON bruto:

```python
@mcp.tool()
async def get_pokemon(name: str) -> str:
    data = await fetch(client, f"/pokemon/{name.lower()}")
    stats = "\n".join(f"- **{s['stat']['name']}**: {s['base_stat']}"
                      for s in data["stats"])
    return f"""# {data['name'].title()}
**Types**: {', '.join(t['type']['name'] for t in data['types'])}
**Height**: {data['height']/10}m | **Weight**: {data['weight']/10}kg

## Base Stats
{stats}"""
```

::: warning Decisao de design
JSON bruto consome muitos tokens do LLM. Markdown pre-formatado reduz token usage e melhora a qualidade da resposta do agente.
:::

### 4. Decorator-Based Registration

```python
@mcp.tool()
async def get_pokemon(name: str) -> str:
    """Get Pokemon stats, types, abilities, sprites, height and weight."""
    ...
```

- `@mcp.tool()` registra a funcao como ferramenta MCP
- Docstring serve como descricao da tool para o LLM
- Type hints definem o schema dos parametros automaticamente

## Fluxo de execucao

```
Claude/Cursor/Windsurf
       │
       │  stdio (stdin/stdout)
       v
   FastMCP Server
       │
       │  @mcp.tool() dispatch
       v
   tools.py (10 tools)
       │
       │  fetch() via shared httpx client
       v
   PokeAPI v2
       │
       │  JSON response
       v
   Markdown formatting
       │
       │  tool result
       v
   LLM response
```

## Testes

```python
@pytest.fixture
def mock_client():
    """httpx mock que retorna dados Pokemon falsos"""
    ...

async def test_get_pokemon(mock_client):
    result = await get_pokemon("pikachu")
    assert "Pikachu" in result
    assert "electric" in result.lower()
```

- Fixtures async com `pytest-asyncio`
- HTTP responses mockadas (sem chamadas reais a API)
- Cobertura de todas as 10 tools
