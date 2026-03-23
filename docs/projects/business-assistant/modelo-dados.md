# Modelo de Dados

> PostgreSQL 16 com EF Core 9, tabelas separadas para Account e Password, soft delete em Customer.

## Diagrama

```
┌──────────────────────────┐       ┌──────────────────────────┐
│        Account            │       │        Password           │
├──────────────────────────┤       ├──────────────────────────┤
│ Id         PK, UUID       │◄─────│ AccountId   FK, UUID      │
│ Name       varchar(200)   │       │ Id          PK, UUID      │
│ Email      varchar(200) U │       │ Salt        UUID           │
│ Phone      varchar(20)    │       │ Password    varchar(100)   │
│ Role       varchar(50)    │       │ Actived     bool?          │
│ Status     smallint       │       │ CreatedAt   timestamp      │
│ CreatedAt  timestamp      │       └──────────────────────────┘
└──────────────────────────┘

┌──────────────────────────┐
│        Customer           │
├──────────────────────────┤
│ Id         PK, UUID       │
│ Name       varchar(200)   │
│ Email      varchar(200) U │
│ Phone      varchar(20)    │
│ Document   varchar(20)  U │
│ IsActive   bool           │
│ CreatedAt  timestamp      │
│ UpdatedAt  timestamp?     │
└──────────────────────────┘
U = Unique Index
```

## Senha em tabela separada

::: info Por que nao PasswordHash na tabela Account?
1. **Historico** — Multiplas senhas por conta (ativa, anteriores, pendentes)
2. **Campo Actived** — `null` (pendente), `true` (ativa), `false` (revogada)
3. **Reset** — Cria novo registro sem alterar Account
:::

## EF Core Fluent API

```csharp
// Account
entity.ToTable("Account");
entity.HasIndex(u => u.Email).IsUnique();
entity.Property(u => u.Name).HasMaxLength(200).IsRequired();

// Password
entity.HasOne(p => p.Account)
    .WithMany()
    .HasForeignKey(p => p.AccountId)
    .OnDelete(DeleteBehavior.Cascade);

// Customer
entity.HasIndex(c => c.Email).IsUnique();
entity.HasIndex(c => c.Document).IsUnique();
```

## DTOs (Records imutaveis)

```csharp
// Auth
public record LoginDto(string Email, string Password);
public record SignupDto(string Email, string Password,
    string ConfirmPassword) : LoginDto(Email, Password);
public record AuthResponse(string AccessToken, string RefreshToken);

// Customer
public record CreateCustomerRequest(string Name, string Email,
    string Phone, string Document);
public record CustomerResponse(Guid Id, string Name, string Email,
    string Phone, string Document, bool IsActive, DateTime CreatedAt);
```

::: tip Records
Records (nao classes) para imutabilidade, value equality e desconstrucao nativa.
:::

## Soft Delete

```csharp
public async Task DeleteAsync(Guid id)
{
    var customer = await _context.Customers.FindAsync(id)
        ?? throw new NotFound404Exception("Customer not found.");

    customer.IsActive = false;
    customer.UpdatedAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();
}
```

Listagem retorna apenas clientes ativos: `.Where(c => c.IsActive)`.
