This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Installation des dépendances

Installez les dépendances du projet :

```bash
npm install
# ou
yarn install
```

### 2. Lancement du serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

- `src/` : Contient toute la logique applicative (pages, hooks, composants, etc)
- `public/` : Contient les images et assets statiques utilisés dans l'application (logos, captures d'écran...)
- `lib/` : Fonctions utilitaires et appels API
- `components/` : Composants réutilisables (ex : SkeletonBox)

### Détail de `src/`

```
banque-frontend/
├── src/
│   ├── app/                # Pages Next.js (ex: dashboard, login, register...)
│   ├── hook/               # Hooks personnalisés (ex: useProfile)
│   ├── middleware.ts       # Middleware Next.js
│   └── ...
```

---

## Images et captures d'écran

Les images suivantes illustrent l'interface de l'application. Elles sont stockées dans le dossier `public/` et utilisées dans l'app ou dans ce README :

### Page de connexion
![Login](/login_1.png)

### Page d'inscription
![Register](/register_1.png)
![Register confirmation](/register_2.png)

### Tableau de bord
![Dashboard](/dashboard_1.png)
![Dashboard - suite](/dashboard_2.png)

### Effectuer un transfert
![Transfert](/make_transaction.png)

### Logo de l'application
![Logo](/logo.png)

---

## Configuration du fichier `.env`

Avant de lancer l'application, créez un fichier `.env` à la racine du projet (s'il n'existe pas déjà) et ajoutez-y la variable suivante :

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

> Remplacez la valeur par l'URL de votre backend (par exemple : `http://127.0.0.1:8000/api`). Cette variable permet à l'application de communiquer avec votre API.

- Les images du dossier `public/` sont accessibles via `/nom_image.png` dans le code ou dans le navigateur.
- Pour ajouter de nouvelles images, placez-les simplement dans `public/` et utilisez-les avec la balise `<Image src="/nom_image.png" ... />` de Next.js.

---

## Démarrage rapide

1. Clonez le repo
2. Installez les dépendances
3. Configurez `.env`
4. Lancez le serveur
5. Rendez-vous sur [http://localhost:3000](http://localhost:3000)

---

Pour toute question ou contribution, ouvrez une issue ou une pull request !


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# banque-frontend
