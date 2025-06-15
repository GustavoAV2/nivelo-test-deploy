    # Etapa 1: Build
    FROM node:22-alpine AS builder

    WORKDIR /app

    # Copia apenas os arquivos necessários para instalar as dependências
    COPY web/package*.json ./web/

    # Instala as dependências dentro da pasta /web
    WORKDIR /app/web
    RUN npm install

    # Copia o restante do projeto
    COPY web/ /app/web

    # Executa o build do Next.js
    RUN npm run build

    # Etapa 2: Produção
    FROM node:22-alpine

    WORKDIR /app/web/

    # Copia os arquivos da etapa de build
    COPY --from=builder /app/web/public ./public
    COPY --from=builder /app/web/.next ./.next
    COPY --from=builder /app/web/node_modules ./node_modules
    COPY --from=builder /app/web/package.json ./package.json

    # Variáveis de ambiente para produção
    ENV NODE_ENV=production
    ENV PORT=8080

    # Expor a porta para o Cloud Run
    EXPOSE 8080

    # Comando para iniciar o Next.js em SSR
    CMD ["npx", "next", "start", "-p", "8080"]
