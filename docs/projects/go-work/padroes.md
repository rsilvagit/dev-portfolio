# Padroes e Decisoes Tecnicas

> ADRs, design patterns e padroes de codigo idomiatico em Go.

## Decisoes Arquiteturais (ADRs)

### ADR-01: Go como linguagem principal

**Contexto:** Precisava de concorrencia nativa, binarios estaticos e deploy simples em CI.

**Decisao:** Go 1.25.

**Justificativa:**
- Goroutines resolvem paralelismo sem complexidade de threads
- Binario estatico — sem runtime, sem deps no host
- Cross-compilation nativa (`GOOS=linux GOARCH=amd64`)
- Stdlib robusta — `net/http`, `encoding/json`, `crypto/sha256`
- Interfaces implicitas — contratos sem acoplamento

::: info Alternativas descartadas
- **Python**: GIL limita paralelismo real; precisa de runtime no CI
- **Node.js**: Async/await resolve I/O mas ecossistema de deps e pesado
- **Rust**: Overhead de complexidade desproporcional para o escopo
:::

### ADR-02: API JSON ao inves de scraping HTML

**Decisao:** Consumir a API JSON (`employability-portal.gupy.io/api/v1/jobs`).

- Dados estruturados — sem parsing fragil de HTML/CSS selectors
- Menor volume de trafego — JSON e mais leve que HTML completo
- Menos suscetivel a quebras por redesign de frontend
- Paginacao nativa via `offset` e `limit`

::: warning Trade-off
A API nao e documentada oficialmente e pode mudar sem aviso.
:::

### ADR-03: Cache Redis opcional com graceful degradation

```go
if rURL != "" {
    jobCache, err = cache.New(rURL, *cacheTTL)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Aviso: Redis indisponivel, continuando sem cache\n")
    }
}
```

- **Opcional** — a app funciona 100% sem Redis
- No CI (GitHub Actions) o Redis nao esta disponivel, cache e ignorado
- TTL configuravel (padrao: 1h)

### ADR-04: Filtro de 24h como default

| Abordagem | Pros | Contras |
|-----------|------|---------|
| Redis set persistente | Preciso | Depende de Redis permanente |
| Arquivo local | Zero deps | Filesystem efemero no CI |
| Bloom Filter | Eficiente em memoria | Falsos positivos |
| **Filtro por data** | **Zero estado, zero deps** | **Pode perder vagas sem data** |

::: tip Decisao
A solucao mais simples que resolve o problema. Sem estado externo, sem persistencia, sem complexidade.
:::

---

## Design Patterns

### Strategy Pattern — Scrapers

```go
type Scraper interface {
    Name() string
    Search(ctx context.Context, query, location string) ([]model.Job, error)
}
```

Adicionar nova fonte (ex: LinkedIn): criar `linkedin.go` implementando `Scraper` e adicionar ao `Registry()`. Zero alteracao no `main.go`.

### Strategy Pattern — Output Writers

```go
type ResultWriter interface {
    WriteJobs(jobs []model.Job) error
}
```

Tres implementacoes: `ConsolePrinter`, `DiscordWriter`, `TelegramWriter`.

### Options Pattern

```go
type Options struct {
    ProxyURL   string
    MinDelay   time.Duration
    MaxDelay   time.Duration
    MaxRetries int
}

func (o Options) withDefaults() Options {
    if o.MinDelay == 0 { o.MinDelay = 2 * time.Second }
    if o.MaxDelay == 0 { o.MaxDelay = 5 * time.Second }
    if o.MaxRetries == 0 { o.MaxRetries = 3 }
    return o
}
```

Valores zero funcionam como "use o default".

### Chunking para limites de API

Discord (2000 chars) e Telegram (4096 chars) tem limites por mensagem:

```go
for i, j := range jobs {
    entry := formatDiscordJob(i+1, j)
    if current.Len()+len(entry) > 1900 {  // margem de seguranca
        chunks = append(chunks, current.String())
        current.Reset()
    }
    current.WriteString(entry)
}
```

### Hashing para cache keys

```go
func buildKey(scraper, query, location string) string {
    raw := strings.ToLower(scraper + ":" + query + ":" + location)
    hash := sha256.Sum256([]byte(raw))
    return fmt.Sprintf("gowork:%s:%x", strings.ToLower(scraper), hash[:8])
}
```

Formato: `gowork:gupy:a1b2c3d4` — legivel e compacto.

---

## Go Idiomatico

| Pratica | Exemplo |
|---------|---------|
| Interfaces implicitas | `Scraper` e `ResultWriter` sem `implements` |
| Composition over inheritance | Structs com metodos, sem hierarquia |
| Error wrapping | `fmt.Errorf("gupy: building request: %w", err)` |
| Context propagation | `context.WithTimeout` por toda a call chain |
| Zero value util | `filter.Options{}` funciona com defaults |
| `internal/` | Encapsulamento no nivel do modulo |
