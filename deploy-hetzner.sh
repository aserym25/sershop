#!/usr/bin/env bash
# À lancer sur le serveur Hetzner : ssh mohamed@62.238.105.149, puis bash deploy-hetzner.sh
set -euo pipefail

REPO=https://github.com/aserym25/sershop.git
SRC=$HOME/sershop-src

# Dossier servi par nginx pour sershop.fr
WEBROOT=$(sudo nginx -T 2>/dev/null | awk '/server_name.*sershop\.fr/{f=1} f&&/^\s*root /{gsub(";","");print $2;exit}')
[ -n "$WEBROOT" ] || { echo "root nginx introuvable : définissez WEBROOT à la main"; exit 1; }
echo "Webroot : $WEBROOT"

if [ -d "$SRC/.git" ]; then git -C "$SRC" fetch origin && git -C "$SRC" reset --hard origin/main
else git clone "$REPO" "$SRC"; fi

cd "$SRC"
npm ci
npm run build

sudo rsync -a --delete dist/ "$WEBROOT"/
curl -s https://sershop.fr/python-module6.html | grep -o '<title>[^<]*'
