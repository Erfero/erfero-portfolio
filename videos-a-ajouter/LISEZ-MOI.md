# Dépose tes nouvelles vidéos ici

Glisse dans ce dossier toutes les vidéos de boutiques que tu veux ajouter au portfolio,
telles quelles (`.mov` de l'iPhone, `.mp4`, peu importe le nom ou le poids).

Ensuite, demande simplement à Claude : « J'ai ajouté des vidéos dans videos-a-ajouter ».
Il se chargera de :

1. **Écarter les doublons** — une vidéo identique (même fichier) ou quasi identique
   (même vidéo ré-exportée / renommée, détectée par empreinte visuelle) n'est jamais
   ajoutée deux fois, ni par rapport aux 27 vidéos déjà en ligne, ni entre les nouvelles.
2. **Convertir et compresser** chaque vidéo en `.mp4` web (lecture fluide sur mobile)
   et générer son image d'aperçu.
3. Les ranger dans `public/videos/` et les ajouter au mur de vidéos du site.

Ce dossier n'est **pas envoyé sur GitHub/Vercel** (voir `.gitignore`) : seules les versions
optimisées le sont. Tu peux le vider une fois les vidéos ajoutées.
