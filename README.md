# Updev Profile Api

## Installation et Configuration
### Étape 1: Cloner le projet

Clonez le dépôt du projet avec la commande suivante :

```bash
git clone git@github.com:UPTODATE-DEV/profile-devcommunity-api.git
```

### Étape 2: Installez les dépendances du projet en utilisant l'une des commandes suivantes :

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### Étape 3: Ajouter les variables d'environnement :
```bash
cp .env.exemple .env
```
### Étape 4: Exécutez les migrations de la base de données avec la commande suivante :
```bash
node ace migration:run
```
### Étape 5: Exécuter les seeders :
```bash
node ace db:seed
```
### Étape 5: Exécuter les seeders :
```bash
node ace db:seed
```
### Étape 6: Build le projet :
```bash
npm run build
# ou
yarn build
# ou
pnpm run build
```
### Étape 7: Démarrez le projet en utilisant l'une des commandes suivantes :
```bash
npm run start
# ou
yarn start
# ou
pnpm run start
```