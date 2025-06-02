# Configuration CI/CD

Ce dossier contient toute la configuration pour l'intégration et le déploiement continus (CI/CD) du projet Todo App.

## 🚀 Workflows GitHub Actions

### 1. `ci.yml` - Pipeline CI Principal
- **Déclenchement**: Push et PR sur `main` et `develop`
- **Jobs**:
  - `test-and-quality`: Linting, type checking (Node 18.x et 20.x)
  - `e2e-tests`: Tests end-to-end avec Cypress
  - `build`: Build de production
  - `security-audit`: Audit de sécurité npm

### 2. `deploy.yml` - Déploiement Production
- **Déclenchement**: Push sur `main` après succès du CI
- **Jobs**:
  - `deploy`: Déploiement sur GitHub Pages
  - `deploy-server`: Déploiement sur serveur (optionnel)


## 🔑 Secrets Optionnels

Pour le déploiement sur serveur custom, configurez ces secrets dans GitHub:

```
DEPLOY_HOST      # Adresse IP ou nom de domaine du serveur
DEPLOY_USER      # Nom d'utilisateur SSH
DEPLOY_KEY       # Clé privée SSH (format PEM)
DEPLOY_PORT      # Port SSH (optionnel, défaut: 22)
SLACK_WEBHOOK    # URL webhook Slack pour notifications
```

## 🛠️ Configuration Locale


### Scripts Disponibles
```bash
npm run test:all        # Tests E2E seulement
npm run e2e            # Tests E2E avec serveur auto
npm run lint:fix       # Correction automatique du code
npm run setup          # Configuration environnement complet
```


## 📊 Métriques et Monitoring



## 🚀 Déploiement

### GitHub Pages (Automatique)
1. Push sur `main`
2. CI passe avec succès
3. Déploiement automatique sur GitHub Pages

### Serveur Custom (Optionnel)
1. Configurer les secrets SSH
2. Le workflow `deploy.yml` se charge du déploiement
3. Notifications Slack automatiques

## 📋 Checklist Déploiement

Avant de merger vers `main`:

- [ ] Tous les tests E2E passent
- [ ] L'application fonctionne correctement
- [ ] Documentation mise à jour si nécessaire