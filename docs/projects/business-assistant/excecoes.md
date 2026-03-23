# Excecoes e Logging

> Hierarquia de excecoes mapeada para HTTP status codes, middleware global e logging estruturado.

## Hierarquia

```
ExceptionCustomAbstract<T>
├── BadRequest400Exception        # Validacao, input invalido
├── Unauthorized401Exception      # Nao autenticado
├── Forbidden403Exception         # Sem permissao
│   ├── .EmailOrPassword()        # "Invalid email or password."
│   ├── .RefreshToken()           # "Invalid or expired refresh token."
│   └── .TokenInvalid()           # "Token is invalid or has been revoked."
├── NotFound404Exception          # Recurso nao encontrado
├── Conflict409Exception          # Email duplicado
├── UnprocessableEntity422Exception
└── InternalServer500Exception    # Erro inesperado
```

::: info Padrao
Cada tipo de excecao mapeia para um HTTP status code. `Forbidden403Exception` tem factory methods para cenarios comuns de auth.
:::

## ExceptionMiddleware

Primeiro middleware no pipeline — captura tudo:

```csharp
var (statusCode, errors) = exception switch
{
    BadRequest400Exception ex       => (400, ...),
    Unauthorized401Exception ex     => (401, ...),
    Forbidden403Exception ex        => (403, ...),
    NotFound404Exception ex         => (404, ...),
    Conflict409Exception ex         => (409, ...),
    _                               => (500, ...)
};
```

### Response padronizado

**Validacao (400):**
```json
{
  "messages": "There are validation errors.",
  "validationProperties": [
    { "property": "Email", "messages": ["Email is required."] },
    { "property": "Password", "messages": ["Min 6 characters."] }
  ]
}
```

**Negocio (403):**
```json
{
  "messages": "Invalid email or password.",
  "validationProperties": []
}
```

## FluentValidation integrado

```csharp
group.MapPost("/login", async (LoginDto request,
    IValidator<LoginDto> validator, IAuthService authService) =>
{
    var validation = await validator.ValidateAsync(request);
    if (!validation.IsValid)
        throw BadRequest400Exception.ValidationResult(validation.Errors);

    return Results.Ok(await authService.LoginAsync(request));
});
```

::: tip Endpoints limpos
Sem try-catch nos endpoints. Services lancam excecoes tipadas, middleware converte para JSON.
:::

## Logging estruturado

### Padrao

```
[ClassName:MethodName] Mensagem com {ParametrosEstruturados}
```

### Exemplos

```csharp
// Sucesso
_logger.LogInformation("[AuthService:LoginAsync] Login successful for {AccountId}", user.Id);

// Falha
_logger.LogWarning("[AuthService:LoginAsync] Login failed: invalid password for {AccountId}", user.Id);

// Erro 500
_logger.LogError(exception, "[ExceptionMiddleware] Rota: {Path}", context.Request.Path);
```

### Niveis por ambiente

| Ambiente | Default | Microsoft.AspNetCore |
|----------|---------|---------------------|
| Development | Debug | Warning |
| Staging | Information | Warning |
| Production | Information | Warning |
