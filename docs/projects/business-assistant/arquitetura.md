# Arquitetura

> Minimal API .NET 9 com arquitetura flat, custom configuration via extension methods e pipeline de middleware.

## Diagrama de componentes

```mermaid
graph TB
    subgraph API["Business Assistant API"]
        direction TB
        subgraph Presentation["Presentation Layer"]
            EP["Endpoints<br/>(Minimal API)"]
            MW["Middleware<br/>(Exception + Claims)"]
            VL["Validators<br/>(FluentValidation)"]
        end

        subgraph Business["Business Layer"]
            AS["AuthService"]
            CS["CustomerService"]
            TS["TokenService"]
        end

        subgraph Infrastructure["Infrastructure Layer"]
            DB["AppDbContext<br/>(EF Core)"]
            RS["RedisService"]
            PH["PasswordHash<br/>(SHA256)"]
        end
    end

    EP --> AS
    EP --> CS
    MW --> AS
    VL --> EP
    AS --> DB
    AS --> RS
    AS --> PH
    CS --> DB
    TS --> RS

    DB --> PG[(PostgreSQL<br/>5432)]
    RS --> RD[(Redis<br/>6379)]

    style API fill:transparent,stroke:#5b6ee1,stroke-width:2px
    style Presentation fill:transparent,stroke:#7c8cf0,stroke-width:1px
    style Business fill:transparent,stroke:#7c8cf0,stroke-width:1px
    style Infrastructure fill:transparent,stroke:#7c8cf0,stroke-width:1px
    style PG fill:#336791,color:#fff,stroke:#336791
    style RD fill:#dc382d,color:#fff,stroke:#dc382d
```

## Fluxo de uma request

```mermaid
graph TD
    REQ["HTTP Request"] --> EXM["ExceptionMiddleware<br/>Captura todas as excecoes"]
    EXM --> AUTH["Authentication<br/>JWT Bearer - Valida token"]
    AUTH --> AUTHZ["Authorization<br/>Verifica Authorize"]
    AUTHZ --> CLM["ClaimsMiddleware<br/>Extrai claims para IUserClaims"]
    CLM --> RL["RateLimiter<br/>100/min geral · 10/min auth"]
    RL --> EP["Endpoint Handler<br/>Minimal API route"]
    EP --> VAL["Validator<br/>FluentValidation - Valida DTO"]
    VAL --> SVC["Service (scoped)<br/>Logica de negocio"]
    SVC --> INFRA["EF Core / Redis<br/>Persistencia e cache"]

    style REQ fill:#5b6ee1,color:#fff,stroke:#5b6ee1
    style INFRA fill:#7c8cf0,color:#fff,stroke:#7c8cf0
```

## Custom Configuration Pattern

::: tip Program.cs limpo
Cada concern e um extension method isolado. `Program.cs` tem apenas 27 linhas.
:::

```csharp
builder.Services
    .AddDatabaseConfiguration(builder.Configuration)
    .AddRedisConfiguration(builder.Configuration)
    .AddJwtAuthentication(builder.Configuration)
    .AddRateLimitConfiguration()
    .AddSwaggerConfiguration()
    .AddApplicationServices()
    .AddHttpContextAccessor();
```

| Extension Method | Responsabilidade |
|-----------------|-----------------|
| `AddDatabaseConfiguration` | EF Core + PostgreSQL + EnsureCreated |
| `AddRedisConfiguration` | IConnectionMultiplexer singleton |
| `AddJwtAuthentication` | JWT Bearer + validation params |
| `AddRateLimitConfiguration` | Fixed window policies |
| `AddSwaggerConfiguration` | OpenAPI + Bearer security |
| `AddApplicationServices` | Scoped services + validators |

## Estrutura de diretorios

```
src/BusinessAssistant.Api/
├── Configurations/             # 6 extension methods
│   ├── AuthenticationConfiguration.cs
│   ├── DatabaseConfiguration.cs
│   ├── DependencyInjectionConfiguration.cs
│   ├── RateLimitConfiguration.cs
│   ├── RedisConfiguration.cs
│   └── SwaggerConfiguration.cs
├── Data/
│   └── AppDbContext.cs         # 3 DbSets, Fluent API
├── DTOs/                       # Records imutaveis
├── Endpoints/
│   ├── AuthEndpoints.cs        # 4 rotas auth
│   └── CustomerEndpoints.cs    # 5 rotas CRUD
├── Exceptions/                 # Hierarquia customizada (8 classes)
├── Middleware/
│   ├── ExceptionMiddleware.cs  # Global exception handler
│   └── ClaimsMiddleware.cs     # JWT claims -> IUserClaims
├── Models/                     # Account, Password, Customer
├── Services/                   # 10 arquivos (interfaces + impls)
├── Validators/                 # FluentValidation
├── Program.cs                  # 27 linhas
└── Dockerfile                  # Multi-stage
```
