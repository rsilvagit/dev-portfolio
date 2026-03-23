# Business Assistant API

Minimal API em .NET 9 para gerenciamento de clientes, com autenticacao JWT completa, refresh token rotation via Redis, rate limiting e deploy automatizado com ambientes staging/production.

::: info Links do projeto
**Repo**: [github.com/arbo/business-assistant](https://github.com/arbo/business-assistant) | **Swagger**: `http://localhost:8080`
:::

---

## O Projeto

Uma API RESTful completa com:
- **9 endpoints** (4 auth + 5 CRUD clientes)
- **JWT + Refresh Token** rotation via Redis
- **Hashing SHA256** com salt UUID
- **Rate limiting** por politica (geral + auth)
- **Pipeline CI/CD** com staging e production separados

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Runtime** | .NET 9 (Minimal API) | Endpoints fluentes, performance, AOT-ready |
| **Linguagem** | C# 13 | Records, pattern matching, top-level statements |
| **Banco** | PostgreSQL 16 | Relacional robusto, UUID nativo |
| **Cache** | Redis 7 | Gerenciamento de tokens com TTL nativo |
| **ORM** | EF Core 9 | Code-first, Fluent API, migrations |
| **Validacao** | FluentValidation 12 | Regras declarativas |
| **Container** | Docker + Compose | Multi-stage build |
| **CI/CD** | GitHub Actions | Staging (develop) + Production (tags) |

## Por que Minimal API sem DDD?

::: tip Decisao intencional
Arquitetura flat (sem Domain/Application/Infrastructure layers) mantendo SOLID sem over-engineering.
:::

1. **Escopo** — CRUD de clientes + auth, DDD seria over-engineering
2. **SOLID mantido** — Interfaces, SRP nos endpoints, DI via extension methods
3. **Testabilidade** — Mesma que DDD via interfaces e injecao de dependencia
4. **Evolucao** — Separacao por pastas facilita migracao futura para camadas

## Endpoints

### Autenticacao (`/api/v1/auth`)

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/signup` | Cadastro | Nao |
| POST | `/login` | Login (JWT + refresh) | Nao |
| POST | `/refresh-token` | Rotacao de tokens | Nao |
| POST | `/logout` | Blacklist no Redis | Sim |

### Clientes (`/api/v1/customers`)

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/` | Listar ativos | Sim |
| GET | `/{id}` | Buscar por ID | Sim |
| POST | `/` | Criar | Sim |
| PUT | `/{id}` | Atualizar | Sim |
| DELETE | `/{id}` | Soft delete | Sim |

## Competencias demonstradas

| Area | Tecnologias |
|------|------------|
| **Backend** | C# 13, .NET 9 Minimal API, SOLID, Extension Methods |
| **Autenticacao** | JWT, Refresh Token Rotation, SHA256 + Salt, Redis Token Management |
| **Banco de Dados** | PostgreSQL 16, EF Core 9 (Code-First, Fluent API) |
| **Cache** | Redis 7 via StackExchange.Redis (direto, sem abstracoes) |
| **Validacao** | FluentValidation com integracao no middleware de excecoes |
| **Seguranca** | Rate Limiting, Password Hashing, Token Blacklist, Soft Delete |
| **DevOps** | Docker multi-stage, Docker Compose, GitHub Actions |
| **CI/CD** | Build + Test, Deploy staging (SSH), Deploy production (tags) |

## Documentacao

| Secao | Conteudo |
|-------|---------|
| [Arquitetura](./arquitetura) | Componentes, fluxo de request, custom configuration pattern |
| [Autenticacao e Seguranca](./autenticacao) | JWT, refresh token, hashing, Redis, rate limiting |
| [Modelo de Dados](./modelo-dados) | Tabelas, EF Core Fluent API, soft delete, DTOs |
| [Excecoes e Logging](./excecoes) | Hierarquia de excecoes, middleware global, logging estruturado |
| [Deploy e CI/CD](./deploy) | Docker, GitHub Actions, staging/production, secrets |
