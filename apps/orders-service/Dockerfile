FROM node:20-alpine AS builder

WORKDIR /app

# Copiar todo el monorepo (requerido por pnpm y turborepo)
COPY . .

# Instalar pnpm y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Build específico del servicio
RUN pnpm build --filter=orders-service...

FROM node:20-alpine AS stage-1

WORKDIR /app

COPY --from=builder /app/apps/orders-service/dist ./dist
COPY --from=builder /app/apps/orders-service/package.json ./
COPY --from=builder /app/packages/shared/dist ./node_modules/@nestjs-cqrs-event-sourcing/shared
COPY --from=builder /app/packages/shared/package.json ./node_modules/@nestjs-cqrs-event-sourcing/shared/

RUN sed -i '/"@nestjs-cqrs-event-sourcing\/shared": "1.0.0"/d' package.json && npm install --omit=dev

CMD ["node", "dist/main"]
