#!/bin/bash

# Instalar nginx si no está
if ! command -v nginx &> /dev/null; then
    sudo apt-get update && sudo apt-get install -y nginx
    sudo rm /etc/nginx/sites-enabled/default
fi

# Crear carpeta si no existe
sudo mkdir -p /var/www/frontend
sudo chown -R $USER:$USER /var/www/frontend

# Configurar nginx si no está ya configurado
if [ ! -f /etc/nginx/sites-available/frontend ]; then
    sudo tee /etc/nginx/sites-available/frontend > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    root /var/www/frontend;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
    sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
    #sudo nginx -t && sudo systemctl reload nginx
fi