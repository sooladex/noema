#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# Noêma — mise en ligne complète, en une commande.
#
#   bash deploy.sh
#
# Ce que le script fait :
#   1. vérifie que gh et vercel sont installés et connectés
#   2. crée le dépôt GitHub privé sooladex/noema et y pousse le code
#   3. crée le projet Vercel, le relie au dépôt, déploie en production
#   4. affiche l'URL de production
#
# Aucune valeur secrète n'est écrite dans ce fichier.
# ──────────────────────────────────────────────────────────────
set -euo pipefail

REPO_NAME="${REPO_NAME:-noema}"
GH_OWNER="${GH_OWNER:-sooladex}"
PROJET_VERCEL="${PROJET_VERCEL:-noema}"

bleu()  { printf '\033[1;36m%s\033[0m\n' "$*"; }
vert()  { printf '\033[1;32m%s\033[0m\n' "$*"; }
rouge() { printf '\033[1;31m%s\033[0m\n' "$*"; }

# ── 1. Prérequis ──────────────────────────────────────────────
bleu "▸ Vérification des outils"

if ! command -v gh >/dev/null 2>&1; then
  rouge "gh (GitHub CLI) manquant."
  echo "   macOS   : brew install gh"
  echo "   Windows : winget install GitHub.cli"
  echo "   Linux   : https://github.com/cli/cli#installation"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  bleu "▸ Connexion à GitHub (une fenêtre de navigateur va s'ouvrir)"
  gh auth login
fi

if ! command -v vercel >/dev/null 2>&1; then
  bleu "▸ Installation de la CLI Vercel"
  npm install -g vercel
fi

vert "✓ Outils prêts"

# ── 2. Dépôt GitHub ───────────────────────────────────────────
bleu "▸ Dépôt GitHub"

if [ ! -d .git ]; then
  git init -q
  git branch -M main
fi

git add -A
if ! git diff --cached --quiet; then
  git -c user.name="${GIT_NAME:-El Asri Adil}" \
      -c user.email="${GIT_EMAIL:-adilelasri107@gmail.com}" \
      commit -q -m "Noêma — application Next.js : cours, fiches de révision, résumé"
  vert "✓ Commit créé"
else
  vert "✓ Rien à commiter"
fi

if gh repo view "$GH_OWNER/$REPO_NAME" >/dev/null 2>&1; then
  vert "✓ Dépôt $GH_OWNER/$REPO_NAME déjà existant"
else
  gh repo create "$GH_OWNER/$REPO_NAME" --private --source=. --remote=origin --push
  vert "✓ Dépôt créé et code poussé"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "https://github.com/$GH_OWNER/$REPO_NAME.git"
fi
git push -u origin main
vert "✓ Code sur GitHub : https://github.com/$GH_OWNER/$REPO_NAME"

# ── 3. Vercel ─────────────────────────────────────────────────
bleu "▸ Déploiement Vercel"

if [ ! -f .vercel/project.json ]; then
  vercel link --yes --project "$PROJET_VERCEL"
fi

vercel git connect --yes || true
vercel --prod --yes

# ── 4. Résultat ───────────────────────────────────────────────
echo
vert "═══════════════════════════════════════════"
vert " Mise en ligne terminée."
vert "═══════════════════════════════════════════"
echo
echo "Dépôt    : https://github.com/$GH_OWNER/$REPO_NAME"
echo "Tableau  : https://vercel.com/$GH_OWNER/$PROJET_VERCEL"
echo
bleu "Étape suivante — passer du mode « clé du visiteur » au mode service :"
echo "  vercel env add GEMINI_API_KEY production"
echo "  (collez votre clé de https://aistudio.google.com/apikey, puis : vercel --prod)"
echo
bleu "Pensez aussi à définir l'URL canonique une fois le domaine branché :"
echo "  vercel env add NEXT_PUBLIC_SITE_URL production"
echo "  vercel env add NEXT_PUBLIC_CONTACT_EMAIL production"
