# Tupperware Club · Vide-dressing

## 1. Brancher la Google Sheet (10 min)

1. Crée une Google Sheet vide, nomme-la « Tupperware Club ».
2. Menu **Extensions > Apps Script**. Efface le contenu du fichier `Code.gs` et colle celui fourni. Enregistre.
3. En haut à droite : **Déployer > Nouveau déploiement**. Roue crantée > type **Application web**.
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
4. Clique sur **Déployer**, autorise l'accès à ton compte (Google affiche un avertissement « application non validée » : clique sur *Paramètres avancés* puis *Accéder à…*, c'est ton propre script).
5. Copie l'URL de l'application web (elle se termine par `/exec`).
6. Dans `index.html`, colle-la dans `CONFIG.API_URL: "..."`.

Les onglets `likes` et `commentaires` se créent tout seuls au premier vote. Tu peux y supprimer une ligne à la main si besoin.

Si tu modifies `Code.gs` plus tard : **Déployer > Gérer les déploiements > crayon > Nouvelle version**, sinon l'ancienne reste active.

## 2. Mettre en ligne sur GitHub Pages

1. Crée un dépôt (ex. `tupperware-club`), public.
2. Dépose `index.html` à la racine et un dossier `photos/` avec les images.
3. **Settings > Pages** : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`.
4. Ton lien : `https://<ton-pseudo>.github.io/tupperware-club/`

## 3. Ajouter ou modifier les paires

Tout est dans le tableau `ITEMS` en haut du script de `index.html`. Une ligne par paire, avec un `id` unique qui ne change plus une fois les votes ouverts (sinon les likes se détachent de la paire).

## À savoir

N'importe qui ayant le lien peut voter sous n'importe quel prénom : c'est du déclaratif, adapté à un groupe de copines, pas à un usage public. Les données vivent uniquement dans ta Sheet.
