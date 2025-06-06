# nestjs-cqrs-event-sourcing

Proyecto de ejemplo utilizando **NestJS**, **CQRS** y **Event Sourcing**.

## Descripción
Este proyecto implementa una arquitectura basada en comandos, consultas y eventos, utilizando NestJS como framework principal. Se emplean bases de datos MongoDB y PostgreSQL, y mensajería con NATS para la comunicación entre servicios.

## Arquitectura
```mermaid
graph TD
    A[API Gateway / Cliente] -->|HTTP| B[Orders Service (CQRS + Event Sourcing)]
    B -->|Eventos| C[MongoDB (Event Store)]
    B -->|Eventos| D[NATS (Event Bus)]
    D -->|Eventos| E[Read Models Service]
    E -->|Proyecciones| F[PostgreSQL (Read DB)]
    A -->|HTTP| E
```

## Instalación
```bash
pnpm install
```

## Uso
Levanta los servicios con Docker Compose:
```bash
docker-compose up -d
```

Compila y ejecuta los servicios:
```bash
pnpm build
pnpm start
```

## Tests
Para ejecutar los tests unitarios y e2e:
```bash
pnpm test
pnpm test:e2e
```

## Contribuir
1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Realiza tus cambios y haz commit
4. Haz push a tu rama y abre un Pull Request

---

> Esta documentación es una base. ¡Suma tus aportes y mejoras!
