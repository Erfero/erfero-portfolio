# Portfolio d'Erféro Keoula

Portfolio immersif de développeur Shopify freelance. Next.js 16 (App Router) · Tailwind v4 ·
GSAP 3 (ScrollTrigger, SplitText, `@gsap/react`) · Framer Motion · next-intl (FR/EN) · Supabase (admin).

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Le français est la langue par défaut (`/`), l'anglais est sur `/en`.
Les variables `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `SUPABASE_BUCKET` et `AUTH_SECRET` sont nécessaires
(elles sont configurées sur Vercel).

## L'expérience

- **Préchargeur** court (une fois par session), puis **Hero** : mur 3D de vraies boutiques en perspective,
  titre révélé ligne par ligne, plongée dans le mur au scroll.
- **Réalisations en vedette** : défilement horizontal épinglé (desktop), glissement au doigt (mobile).
  Chaque carte ouvre la **vraie boutique** dans un nouvel onglet ; au survol, la capture pleine page défile.
- Manifeste qui s'allume au scroll, vidéos en bandes inclinées selon la vitesse, chiffres animés,
  cartes empilées, méthode épinglée, catalogue avec aperçu flottant, parcours (agences), avis en colonnes,
  frise du process, FAQ, contact, grande signature en pied de page.
- Tout respecte la préférence système « réduire les animations » et fonctionne sans JavaScript.
- Pas de « smooth scroll » artificiel (Lenis retiré volontairement) : défilement natif + GSAP ScrollTrigger.

## Où modifier quoi

- `src/data/site.config.ts` — nom, email, WhatsApp, Calendly, réseaux (GitHub : `github.com/erfero`).
- `src/data/projects.ts` — les boutiques. Seules celles en `status: "live"` sont affichées.
- `public/shots/` — captures pleine page vérifiées (`<id>.webp`) et vignettes (`thumbs/<id>.webp`).
- `src/data/videos.ts` + `public/videos/` — le mur de vidéos.
- `src/messages/fr.json` / `en.json` — tous les textes. Dans les titres, entoure un mot d'astérisques
  pour le mettre en valeur en serif italique : `"Des boutiques pensées pour *vendre*"`.
- `/admin` — textes, boutiques, vidéos, avis, interrupteurs de chaque section de l'accueil.

## Règle d'affichage des boutiques

Une boutique n'est affichée que si elle a été vérifiée **dans un vrai navigateur** :
pas de page bleue « Votre licence n'est pas activée » (thème Story), pas de mot de passe,
domaine fonctionnel (ni parqué, ni à vendre, ni erreur SSL), et **jamais deux fois la même boutique**
(une boutique servie sur son `.myshopify.com` et sur son domaine perso ne compte qu'une fois).

Le vérificateur automatique (`/api/check-links`, chaque matin via Vercel Cron, voir `vercel.json`)
interroge une par une les boutiques au statut `live` de `projects.ts` :

- boutique fermée, suspendue (402), supprimée (404), sous mot de passe ou domaine mort → **masquée** du site ;
- boutique masquée qui fonctionne de nouveau → **ré-affichée** automatiquement ;
- pas de réponse claire (Shopify qui limite les requêtes, lenteur) → rien ne change.

Une boutique n'est masquée que si deux essais à quelques secondes d'intervalle concordent. Les boutiques
marquées autrement que `live` dans `projects.ts` ne sont jamais ré-affichées automatiquement, car un simple
appel HTTP ne voit pas la page de licence du thème Story (affichée en JavaScript) : elles ne reviennent
qu'après une vérification complète dans un vrai navigateur. Le bilan du dernier passage est visible dans
`/admin/projects`, avec un bouton pour lancer un contrôle immédiat.

## Ajouter des vidéos

Dépose les fichiers bruts dans `videos-a-ajouter/` (voir le `LISEZ-MOI.md` du dossier) : ils sont
dédoublonnés (empreinte binaire + visuelle), convertis en MP4 web, puis ajoutés à `public/videos/`.

## Activer le formulaire de contact

Le formulaire utilise [Formspree](https://formspree.io) : renseigne `NEXT_PUBLIC_FORMSPREE_ID` dans les
variables d'environnement Vercel, puis redéploie.

## Déploiement

Chaque `git push` sur `master` redéploie automatiquement le site sur Vercel.
