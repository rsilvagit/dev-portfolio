# Installer e Distribuicao

> Standalone .exe via PyInstaller com installer visual multi-IDE.

## Distribuicao como .exe

O poke-mcp e distribuido como executavel standalone — usuarios nao precisam instalar Python.

### Build com PyInstaller

```python
# build.py
PyInstaller(
    "src/poke_mcp/__main__.py",
    name="poke-mcp",
    onefile=True,
    hidden_imports=["poke_mcp", "poke_mcp.server", "poke_mcp.tools"],
)
```

| Aspecto | Detalhe |
|---------|---------|
| **Output** | `poke-mcp.exe` (~23MB) |
| **Hidden imports** | Necessarios porque PyInstaller nao detecta imports dinamicos do FastMCP |
| **Onefile** | Unico executavel, sem pasta de dependencias |
| **Distribuicao** | GitHub Releases |

::: tip Por que .exe?
A maioria dos usuarios de Claude Desktop/Cursor nao tem ambiente Python configurado. Um .exe elimina a barreira de instalacao.
:::

## Installer Multi-IDE

O `install.py` e um installer interativo com UI no terminal que configura automaticamente o MCP server em qualquer IDE suportada.

### IDEs suportadas

| IDE | Arquivo de config | Formato |
|-----|-------------------|---------|
| **Claude Desktop** | `%APPDATA%/Claude/claude_desktop_config.json` | JSON |
| **Cursor** | `%APPDATA%/Cursor/.cursor/mcp.json` | JSON |
| **Windsurf** | `%APPDATA%/.codeium/windsurf/mcp_config.json` | JSON |
| **Claude Code CLI** | `~/.claude/settings.json` | JSON (mcpServers) |

### Registry Pattern

```python
IDE_CONFIGS = {
    "Claude Desktop": {
        "path": os.path.expandvars(r"%APPDATA%\Claude\claude_desktop_config.json"),
        "key": "mcpServers",
    },
    "Cursor": {
        "path": os.path.expandvars(r"%APPDATA%\Cursor\.cursor\mcp.json"),
        "key": "mcpServers",
    },
    # ...
}
```

::: info Design
O Registry Pattern permite adicionar novas IDEs sem alterar a logica do installer — basta adicionar uma entrada ao dicionario.
:::

### Fluxo do installer

```
1. Detecta IDEs instaladas (verifica se config path existe)
2. Exibe menu interativo com opcoes numeradas
3. Usuario escolhe IDE(s) para configurar
4. Localiza o poke-mcp.exe (AppData ou diretorio atual)
5. Edita o JSON de config da IDE
6. Confirma instalacao com feedback visual
```

### UX do terminal

```
╔══════════════════════════════════════╗
║     poke-mcp Installer              ║
╠══════════════════════════════════════╣
║                                      ║
║  [1] Claude Desktop    ✓ Detectado   ║
║  [2] Cursor            ✓ Detectado   ║
║  [3] Windsurf          ✗ Nao encontrado ║
║  [4] Claude Code CLI   ✓ Detectado   ║
║                                      ║
║  [A] Instalar em todos               ║
║  [Q] Sair                            ║
╚══════════════════════════════════════╝
```

- ANSI colors para feedback visual (verde = sucesso, vermelho = erro)
- Deteccao automatica de IDEs instaladas
- Opcao de instalar em todas de uma vez

## Config gerada

Exemplo para Claude Desktop:

```json
{
  "mcpServers": {
    "poke-mcp": {
      "command": "C:\\Users\\...\\AppData\\Local\\poke-mcp\\poke-mcp.exe",
      "args": []
    }
  }
}
```

O installer faz merge — nao sobrescreve servers MCP ja configurados.

## Pipeline completo

```
build.py           install.py              IDE
   │                   │                    │
   v                   v                    v
PyInstaller ──> poke-mcp.exe ──> config.json ──> MCP Server ativo
   │                                              │
   │           GitHub Releases                     │  stdio
   └──────────> Download .exe                      v
                                              PokeAPI v2
```
