# Portfolio d'Erféro Keoula

Site portfolio pour développeur Shopify freelance. Next.js 16 (App Router) + Tailwind v4 + Framer Motion + GSAP/ScrollTrigger + Lenis (smooth scroll) + next-intl (FR/EN).

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Le français est la langue par défaut (`/`), l'anglais est sur `/en`.

```bash
npm run build   # build de production (à faire avant chaque déploiement important)
```

## Structure du projet

- `src/data/site.config.ts` — tes infos (nom, email, WhatsApp, réseaux, métriques affichées). **C'est le premier fichier à modifier.**
- `src/data/projects.ts` — les 6 boutiques Shopify (URL, statut, couleur d'accent).
- `src/data/videos.ts` — la liste des vidéos verticales affichées sur le site.
- `src/messages/fr.json` et `src/messages/en.json` — tous les textes du site, en français et en anglais. Modifie ces fichiers pour changer n'importe quel texte (titres, descriptions de projets, FAQ, etc.).
- `src/components/sections/` — chaque section du site (Hero, Services, FAQ, Contact...).
- `src/app/[locale]/realisations/page.tsx` — la page dédiée à toutes tes réalisations.

## Ajouter tes vidéos (format TikTok / vertical)

Tu as 200+ vidéos enregistrées via l'enregistreur d'écran de l'iPhone (format `.mov`, souvent lourd). Deux options :

**Option simple (recommandée pour démarrer) — fichiers locaux :**
1. Convertis tes `.mov` en `.mp4` compressé. Sur Mac, l'app **HandBrake** (gratuite) fait ça en 2 clics (preset "Fast 1080p30" ou "Web" suffit largement pour du contenu vertical).
2. Dépose les fichiers dans `public/videos/` (ex: `public/videos/cisse-glow.mp4`).
3. Ajoute une entrée dans `src/data/videos.ts` pour chaque nouvelle vidéo (copie une ligne existante et change `id`, `src`, `captionKey`).

⚠️ Limite : Vercel gratuit a un quota de bande passante. Avec 200+ vidéos en local, tu risques de le dépasser vite si le site devient populaire — passe à l'option Cloudinary ci-dessous dès que tu en ajoutes beaucoup.

**Option scalable (recommandée dès que tu ajoutes beaucoup de vidéos) — Cloudinary :**
1. Crée un compte gratuit sur [cloudinary.com](https://cloudinary.com) (25 Go de stockage et 25 Go de bande passante offerts par mois).
2. Upload tes vidéos là-bas (compression et streaming adaptatif automatiques).
3. Remplace les valeurs `src` dans `src/data/videos.ts` par les URLs Cloudinary (`https://res.cloudinary.com/...`).

Tant qu'une vidéo n'existe pas encore, la carte affiche automatiquement "Vidéo à venir" — rien ne casse.

## Activer le formulaire de contact

Le formulaire est prêt mais a besoin d'un service gratuit pour envoyer les emails (aucun backend à héberger) :

1. Crée un compte gratuit sur [formspree.io](https://formspree.io) (50 soumissions/mois gratuites).
2. Crée un formulaire, tu obtiens un ID du type `xlandvqr`.
3. En local : copie `.env.example` en `.env.local` et colle l'ID dans `NEXT_PUBLIC_FORMSPREE_ID`.
4. Sur Vercel : ajoute la même variable d'environnement dans Project Settings → Environment Variables, puis redéploie.

## Créer ton lien Calendly gratuit

1. Crée un compte gratuit sur [calendly.com](https://calendly.com).
2. Crée un type d'événement "Appel découverte" (15-30 min).
3. Copie ton lien (ex: `https://calendly.com/ton-nom/appel-decouverte`) et colle-le dans `calendlyUrl` de `src/data/site.config.ts`.

## Modifier tes métriques

Les chiffres affichés (années d'expérience, boutiques lancées, etc.) sont dans `src/data/site.config.ts` et dans `metrics.items` de `src/messages/fr.json` / `en.json`. Ce sont des estimations honnêtes de départ — ajuste-les librement à mesure que ton activité évolue. Quand tu auras de vrais avis clients, remplace la section "Pourquoi me faire confiance" (`src/components/sections/Trust.tsx` + `trust` dans les messages) par de vrais témoignages.

## Réseaux sociaux

Renseigne tes URLs dans `src/data/site.config.ts` (`socials`). GitHub est pré-rempli avec une supposition (`github.com/Erfero`) — vérifie/corrige-la. Upwork/Fiverr/Malt sont vides : ajoute-les dès que tu as ces profils.

## Déployer sur Vercel (gratuit)

1. Pousse ce projet sur GitHub (créer un repo, `git remote add origin ...`, `git push`).
2. Va sur [vercel.com](https://vercel.com), "Add New Project", importe ton repo GitHub.
3. Ajoute la variable d'environnement `NEXT_PUBLIC_FORMSPREE_ID` (voir plus haut).
4. Déploie. Ton site est en ligne sur `ton-projet.vercel.app` en quelques minutes, gratuitement, avec HTTPS et déploiement automatique à chaque `git push`.

## Nom de domaine

Il n'existe plus vraiment de service fiable de "nom de domaine gratuit" en 2026 (les anciens comme Freenom ont fermé les inscriptions suite à des poursuites judiciaires) — et les domaines gratuits restants (`.tk`, `.ml`...) sont mal vus par les navigateurs et les clients potentiels.

- **Vraiment gratuit et propre** : ton sous-domaine Vercel (`ton-nom.vercel.app`), illimité, HTTPS inclus. Largement suffisant pour démarrer.
- **Recommandé dès que tu as les premiers clients** : un vrai domaine `.com` ou `.dev` coûte en général 10-15$/an (Namecheap, Porkbun, Cloudflare Registrar sont fiables et pas chers). Idées : `erferokeoula.com`, `erferokeoula.dev`, `erfero.dev`. Une fois acheté, tu le connectes à Vercel en 5 minutes (Project Settings → Domains).

## Stack technique

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis (smooth scroll) · next-intl (FR/EN) · lucide-react (icônes).
