# Arquitetura

> Estrutura de pacotes com DAG aciclico, concorrencia via goroutines e modelo de dominio imutavel.

## Visao de alto nivel

```
┌─────────┐    ┌───────────┐    ┌─────────────┐    ┌───────┐    ┌─────────┐    ┌──────────┐
│ CLI/Env  ├───>│ HTTPClient├───>│ Gupy API    ├───>│ Dedup ├───>│ Filtros ├───>│ Output   │
└─────────┘    └─────┬─────┘    └──────┬──────┘    └───────┘    └────┬────┘    └──────────┘
                     │                 │                             │          ├─ Console
                     │ Anti-ban        │ Cache Redis                 │ MaxAge   ├─ Discord
                     │ UA Rotation     │ (opcional)                  │ Tipo     └─ Telegram
                     │ Rate Limit                                    │ Modelo
                     │ Retry/Backoff                                 │ Nivel
```

O fluxo e linear e unidirecional: **entrada -> busca -> deduplicacao -> filtragem -> saida**. Simplicidade intencional.

## Estrutura de pacotes

```
go-work/
├── cmd/go-work/           # Entrypoint — orquestracao e wiring
│   └── main.go
├── internal/              # Codigo privado do modulo
│   ├── cache/             # Cache Redis (opcional)
│   ├── filter/            # Engine de filtragem
│   ├── httpclient/        # HTTP client com protecoes anti-ban
│   ├── model/             # Dominio — struct Job
│   ├── output/            # Writers de resultado
│   │   ├── printer.go     # Interface + ConsolePrinter
│   │   ├── discord.go     # DiscordWriter
│   │   └── telegram.go    # TelegramWriter
│   └── scraper/           # Scrapers de vagas
│       ├── scraper.go     # Interface + Registry
│       └── gupy.go        # Implementacao Gupy
├── .github/workflows/
│   └── deploy.yml         # CI/CD + Cron
├── Dockerfile             # Multi-stage build
└── docker-compose.yml     # Redis + app
```

## Principios de design

### Separacao por responsabilidade

| Pacote | Responsabilidade | Sabe sobre |
|--------|-----------------|------------|
| `model` | Definir a entidade `Job` | Nada (zero deps internas) |
| `scraper` | Buscar vagas em fontes externas | `model`, `httpclient` |
| `filter` | Aplicar criterios de filtragem | `model` |
| `output` | Entregar resultados ao usuario | `model` |
| `cache` | Evitar chamadas repetidas a API | `model` |
| `httpclient` | HTTP resiliente e discreto | Nada (zero deps internas) |
| `cmd/go-work` | Orquestrar tudo | Todos os pacotes |

::: tip DAG aciclico
O grafo de dependencias nao tem imports circulares. `model` e `httpclient` sao folhas sem dependencias internas.
:::

### Dependency Inversion via interfaces

```go
// scraper.Scraper — contrato para fontes de dados
type Scraper interface {
    Name() string
    Search(ctx context.Context, query, location string) ([]model.Job, error)
}

// output.ResultWriter — contrato para canais de saida
type ResultWriter interface {
    WriteJobs(jobs []model.Job) error
}
```

Adicionar nova fonte (LinkedIn) ou novo canal (Slack) nao altera o core.

### Composicao no main.go

O `main.go` e o **composition root**: parseia config, cria dependencias, orquestra execucao. Nenhum pacote interno cria suas proprias dependencias — tudo e injetado.

## Modelo de dominio

```go
type Job struct {
    Title       string
    Company     string
    Location    string
    URL         string
    Description string
    Source      string
    PostedAt    time.Time
    JobType     string    // full-time, part-time, estagio
    WorkModel   string    // remoto, hibrido, presencial
    Level       string    // junior, pleno, senior
    Salary      string
}
```

::: info Value Object
`Job` e imutavel — sem metodos mutaveis, sem ponteiros, sem estado compartilhado. Pode ser copiado e passado entre goroutines sem locks.
:::

Metodos auxiliares:
- `FullText()` — concatena campos pesquisaveis em lowercase para full-text search
- `Key()` — chave de deduplicacao (URL ou titulo+empresa)

## Concorrencia

```
main goroutine
    │
    ├── goroutine: Gupy × "golang"
    ├── goroutine: Gupy × "python"
    └── goroutine: Gupy × "c#"
         │
         └── append(allJobs) ← protegido por sync.Mutex
```

- Cada combinacao `scraper x termo` roda em **goroutine dedicada**
- `sync.WaitGroup` controla ciclo de vida
- `sync.Mutex` protege o slice compartilhado
- Deduplicacao e filtragem acontecem **apos** `wg.Wait()`, em single-threaded
