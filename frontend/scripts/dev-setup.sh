#!/bin/bash

# Script d'automation pour la configuration de l'environnement de développement
# Usage: ./scripts/dev-setup.sh

set -e

echo "🔧 Configuration de l'environnement de développement..."

# Installation des dépendances
echo "📦 Installation des dépendances npm..."
npm install

# Vérification des outils de développement
echo "🔍 Vérification des outils..."

# ESLint
if [ ! -f "node_modules/.bin/eslint" ]; then
    echo "❌ ESLint manquant"
    exit 1
fi

# Prettier
if [ ! -f "node_modules/.bin/prettier" ]; then
    echo "❌ Prettier manquant"
    exit 1
fi

# Cypress
if [ ! -f "node_modules/.bin/cypress" ]; then
    echo "❌ Cypress manquant"
    exit 1
fi

# TypeScript
if [ ! -f "node_modules/.bin/tsc" ]; then
    echo "❌ TypeScript manquant"
    exit 1
fi

echo "✅ Tous les outils de développement sont disponibles!"

# Création des répertoires nécessaires
echo "📁 Création des répertoires..."
mkdir -p cypress/screenshots
mkdir -p cypress/videos
mkdir -p cypress/downloads

# Rendre les scripts exécutables
echo "🔐 Configuration des permissions..."
chmod +x scripts/*.sh

# Test des configurations
echo "🧪 Test de la configuration..."

# Vérification ESLint
echo "  - Test ESLint..."
npm run lint --silent || echo "    ⚠️ Quelques problèmes ESLint détectés"

# Vérification TypeScript
echo "  - Test TypeScript..."
npx tsc --noEmit || echo "    ⚠️ Quelques erreurs TypeScript détectées"

echo "🎉 Configuration terminée! Vous pouvez maintenant:"
echo "  - Démarrer le serveur de dev: npm start"
echo "  - Lancer les tests: npm test"
echo "  - Lancer les tests E2E: ./scripts/test-e2e.sh"
echo "  - Formater le code: npm run format"