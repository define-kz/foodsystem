# Техническая спецификация: Уведомления

## Стек
- Backend: NestJS 10 + Prisma 5 + PostgreSQL 16
- Cache: Redis 7 | Queue: BullMQ
- Auth: JWT (access 15m, refresh 30d) + RBAC

## Модуль: `src/uvedomleniya/`

### Prisma Schema
```prisma
model Uvedomleniya {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  name      String
  status    String   @default("ACTIVE")
  metadata  Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  
  @@index([tenantId])
  @@index([status])
}
```

### API Endpoints
| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/v1/uvedomleniya | List (paginated) | All |
| GET | /api/v1/uvedomleniya/:id | Get by ID | All |
| POST | /api/v1/uvedomleniya | Create | Owner, Manager |
| PATCH | /api/v1/uvedomleniya/:id | Update | Owner, Manager |
| DELETE | /api/v1/uvedomleniya/:id | Soft delete | Owner |

### DTOs
- CreateDto: name (string, required), metadata (optional)
- UpdateDto: Partial<CreateDto>
- QueryDto: page, limit, search, sortBy, sortOrder, status

### Безопасность
- JwtAuthGuard on all endpoints
- RolesGuard with @Roles() decorator
- Tenant isolation via TenantMiddleware
- Rate limit: 100 req/min per user
- class-validator + class-transformer for input validation

### Error Codes
- 400: Validation error
- 401: Unauthorized (no/invalid token)
- 403: Forbidden (wrong role)
- 404: Not found (or wrong tenant)
- 409: Conflict (duplicate)
- 429: Rate limited
