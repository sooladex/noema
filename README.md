# Noêma

Transforme un texte en **cours détaillé**, **fiches de révision** et **résumé**.

Vous collez un chapitre, des notes de TD ou un article ; Noêma identifie les notions
qui y sont citées et les enseigne : définition, raison d'être, explication progressive,
analogie concrète, exemple résolu pas à pas, erreurs fréquentes, points à retenir.

---

## Pile technique

| Élément | Choix |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript strict |
| Rendu | SSG pour toutes les pages publiques, SSR pour `/generer` |
| Styles | CSS natif (`app/globals.css`), aucune dépendance UI |
| Modèle | Google Gemini via l'API Generative Language |
| Hébergement | Vercel |

Aucune base de données, aucun compte, aucun cookie : le texte transite, il n'est pas stocké.

---

## Deux modes de fonctionnement

L'application bascule automatiquement selon la présence de `GEMINI_API_KEY`.

| | `GEMINI_API_KEY` définie | `GEMINI_API_KEY` absente |
|---|---|---|
| Mode | **service** | **byok** (*bring your own key*) |
| Clé utilisée | celle du serveur | celle saisie par le visiteur |
| Quota | `RATE_LIMIT_MAX` par IP et par fenêtre | aucun |
| Champ « clé API » affiché | non | oui |

C'est ce qui permet de déployer avant d'avoir une clé, puis de passer en mode service
en ajoutant simplement la variable d'environnement — sans toucher au code.

---

## Démarrer en local

```bash
git clone <url-du-depot>
cd noema
npm install
cp .env.example .env.local   # puis renseigner GEMINI_API_KEY si vous en avez une
npm run dev                  # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

Node 20.9 ou supérieur est requis.

---

## Variables d'environnement

Toutes sont optionnelles : sans aucune, l'app démarre en mode *byok*.

| Variable | Rôle | Défaut |
|---|---|---|
| `GEMINI_API_KEY` | Clé serveur. Sa présence active le mode service. **Secret — côté serveur uniquement.** | — |
| `GEMINI_MODEL` | Modèle utilisé | `gemini-2.5-flash` |
| `RATE_LIMIT_MAX` | Générations gratuites par IP et par fenêtre | `5` |
| `RATE_LIMIT_WINDOW` | Durée de la fenêtre, en secondes | `86400` |
| `NEXT_PUBLIC_SITE_URL` | URL canonique publique, sans slash final | `https://noema.vercel.app` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Adresse affichée dans les pages légales | `contact@example.com` |

`GEMINI_API_KEY` n'est **jamais** exposée au navigateur : elle n'est lue que dans
`app/api/generate/route.ts`, qui s'exécute côté serveur. Les messages d'erreur du
fournisseur sont filtrés avant d'être renvoyés au client.

Obtenir une clé : <https://aistudio.google.com/apikey>

---

## Structure

```
app/
  layout.tsx              coquille, métadonnées globales, JSON-LD (Organization, WebSite, SoftwareApplication)
  page.tsx                landing SSG + FAQPage JSON-LD
  generer/page.tsx        page produit (SSR)
  api/generate/route.ts   appel Gemini, validation, quota, gestion d'erreurs
  guides/…                3 pages de contenu (Article JSON-LD)
  cgu, confidentialite, mentions-legales, contact
  not-found.tsx, error.tsx
  sitemap.ts, robots.ts, manifest.ts, icon.tsx, apple-icon.tsx, opengraph-image.tsx
components/
  Background.tsx          décor 3D (canvas 2D, projection maison) — client
  Intro.tsx               intro cinématique de la page d'accueil — client
  Generateur.tsx          formulaire et appel API — client
  Resultat.tsx            rendu du cours, des fiches et du résumé — client
  Riche.tsx               rendu du balisage inline sans injection HTML
lib/
  gemini.ts               prompt, schéma de réponse structurée, appel HTTP
  ratelimit.ts            compteur en mémoire par IP
  markdown.ts             export Markdown
  types.ts, site.ts
```

---

## Sécurité

- En-têtes définis dans `next.config.mjs` : CSP, HSTS, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- La CSP restreint `connect-src` à `self` et à l'API Google.
- Aucun `dangerouslySetInnerHTML` sur du contenu généré : le balisage inline du modèle
  est converti en nœuds React par `components/Riche.tsx`.
- Entrées validées côté serveur : longueur du texte, valeurs des listes déroulantes.

### Limite connue

Le limiteur de débit est **en mémoire, par instance serverless**. Sur Vercel, chaque
instance a son propre compteur : la limite effective est donc « `RATE_LIMIT_MAX` par
instance active », pas une limite globale. Suffisant pour freiner l'abus au lancement,
à remplacer par un compteur partagé (Vercel KV ou Upstash Redis) dès qu'il y a du trafic.

---

## SEO

Rendu serveur sur toutes les pages publiques — le contenu est présent dans le HTML brut,
sans exécution de JavaScript. `title` et `meta description` uniques par page, `canonical`,
Open Graph et Twitter Card avec image 1200×630 générée, JSON-LD (`Organization`,
`WebSite` + `SearchAction`, `SoftwareApplication`, `FAQPage`, `Article`),
`sitemap.xml` et `robots.txt` cohérents.

---

## Déploiement

Le projet se déploie sur Vercel sans configuration : framework détecté automatiquement,
`npm run build` comme commande de build. Définir les variables d'environnement dans
*Project Settings → Environment Variables*, en séparant `Production` et `Preview`.

---

## Licence

Tous droits réservés. Les cours produits par le service appartiennent à leurs auteurs.
