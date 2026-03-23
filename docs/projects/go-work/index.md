# go-work

Agregador inteligente de vagas de emprego escrito em Go que consome a API da Gupy, aplica filtros inteligentes e envia notificacoes via Discord e Telegram. Roda 100% serverless via GitHub Actions.

::: info Links do projeto
**Repo**: [github.com/rsilvagit/go-work](https://github.com/rsilvagit/go-work)
:::

---

## O Problema

Acompanhar vagas em plataformas como Gupy exige acesso manual diario, buscas repetitivas e triagem de resultados irrelevantes. Nao existe forma nativa de receber apenas vagas novas, filtradas por stack, modelo de trabalho ou senioridade, direto no canal que ja uso.

## A Solucao

Uma CLI em Go que:

1. **Busca** vagas na API da Gupy com multiplos termos em paralelo
2. **Filtra** por tipo, modelo de trabalho, nivel, regiao e idade (ultimas 24h)
3. **Deduplica** resultados por URL (ou titulo + empresa)
4. **Notifica** via Discord Webhook e/ou Telegram Bot API
5. **Executa automaticamente** via GitHub Actions cron — zero infra

## Numeros

| Metrica | Valor |
|---------|-------|
| **Linguagem** | Go 1.25 |
| **Linhas de codigo** | ~600 |
| **Pacotes internos** | 6 (`cache`, `filter`, `httpclient`, `model`, `output`, `scraper`) |
| **Deps externas** | 2 (`go-redis/v9`, `goquery`) |
| **Canais de saida** | 3 (Console, Discord, Telegram) |
| **Custo operacional** | R$ 0 (GitHub Actions gratuito) |

## Competencias demonstradas

| Area | Tecnologias |
|------|------------|
| **Go** | Goroutines, sync.Mutex, WaitGroup, interfaces implicitas, context propagation |
| **Arquitetura** | Clean Architecture, SOLID, Strategy Pattern, Dependency Inversion |
| **Concorrencia** | Goroutines paralelas por termo de busca, mutex para shared state |
| **Anti-ban** | UA rotation, rate limiting, retry com backoff, jitter |
| **DevOps** | GitHub Actions cron, Docker multi-stage (~13MB), secrets management |
| **Integracoes** | Gupy API, Discord Webhook, Telegram Bot API, Redis cache |

## Documentacao

| Secao | Conteudo |
|-------|---------|
| [Arquitetura](./arquitetura) | Pacotes, DAG de dependencias, concorrencia, modelo de dominio |
| [Padroes Tecnicos](./padroes) | ADRs, Strategy Pattern, Options Pattern, chunking |
| [Pipeline de Dados](./pipeline) | Fetch, dedup, filtragem, output formatado |
| [Infra e Deploy](./deploy) | GitHub Actions, Docker, secrets, fluxo de deploy |
