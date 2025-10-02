# Etapa 1: build con Node
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:alpine

# Copia el build al directorio que sirve nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Crear usuario sin privilegios
RUN adduser -D -H -u 1001 nginxuser \
    && chown -R nginxuser:nginxuser /usr/share/nginx/html \
    && chown -R nginxuser:nginxuser /etc/nginx/conf.d \
    && chown -R nginxuser:nginxuser /var/cache/nginx /var/run /var/log/nginx

# Usar el nuevo usuario
USER nginxuser

EXPOSE 80

# Healthcheck para validar que nginx está respondiendo
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
