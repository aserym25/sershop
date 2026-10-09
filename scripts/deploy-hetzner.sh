#!/usr/bin/env bash
# Met en ligne sershop.fr sur le serveur Hetzner : récupère main, build, copie dist/ dans le dossier servi par nginx.
# Lancé à chaque push sur main par .github/workflows/deploy-hetzner.yml,
# ou à la main sur le serveur : bash deploy-hetzner.sh
set -euo pipefail

REPO=https://github.com/aserym25/sershop.git
SRC=$HOME/sershop-src
BRANCH=${BRANCH:-main}

command -v npm >/dev/null || { echo "npm introuvable sur le serveur : installez Node.js 20"; exit 1; }

# Dossier servi par nginx pour sershop.fr (forçable avec WEBROOT=...)
if [ -z "${WEBROOT:-}" ]; then
  WEBROOT=$(sudo -n nginx -T 2>/dev/null | awk '/server_name.*sershop\.fr/{f=1} f&&/^[[:space:]]*root /{gsub(";","");print $2;exit}' || true)
fi
[ -n "$WEBROOT" ] || { echo "root nginx introuvable : définissez WEBROOT"; exit 1; }
echo "Webroot : $WEBROOT"

if [ -d "$SRC/.git" ]; then
  git -C "$SRC" fetch --depth 1 origin "$BRANCH"
  git -C "$SRC" reset --hard FETCH_HEAD
else
  git clone --depth 1 --branch "$BRANCH" "$REPO" "$SRC"
fi
echo "Commit : $(git -C "$SRC" log --oneline -1)"

cd "$SRC"
npm ci
npm run build

# Les e-books ne doivent jamais être servis publiquement
if find dist \( -iname '*.docx' -o -iname '*.pdf' \) | grep -q .; then
  echo "Fichiers e-book trouvés dans dist/ : déploiement annulé"
  find dist \( -iname '*.docx' -o -iname '*.pdf' \)
  exit 1
fi

if [ -w "$WEBROOT" ]; then rsync -a --delete dist/ "$WEBROOT"/
else sudo -n rsync -a --delete dist/ "$WEBROOT"/; fi

# Le site en ligne doit servir exactement le index.html qui vient d'être construit
if curl -fsS https://sershop.fr/ | cmp -s - dist/index.html; then
  echo "sershop.fr est à jour"
else
  echo "sershop.fr ne sert pas le nouveau build (vérifiez le root nginx)"
  exit 1
fi
