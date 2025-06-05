#!/bin/bash

# Script d'automation pour les tests E2E Cypress
# Usage: ./scripts/test-e2e.sh [mode]
# Modes: run (default), open, ci, headless

set -e

MODE=${1:-run}

echo "🚀 Démarrage des tests E2E en mode: $MODE"

# Vérifier que les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier que Cypress est installé
if [ ! -f "node_modules/.bin/cypress" ]; then
    echo "❌ Cypress n'est pas installé. Installation..."
    npm install --save-dev cypress
fi

case $MODE in
    "open")
        echo "🔍 Ouverture de Cypress en mode interactif..."
        npm run e2e:open
        ;;
    "ci"|"headless")
        echo "🤖 Exécution des tests en mode headless..."
        npm run e2e
        ;;
    "run"|*)
        echo "🧪 Exécution des tests E2E avec serveur automatique..."
        npm run e2e
        ;;
esac

echo "✅ Tests E2E terminés!"