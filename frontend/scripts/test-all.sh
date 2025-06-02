#!/bin/bash

# Script pour lancer tous les tests (unitaires + E2E)
# Usage: ./scripts/test-all.sh

set -e

echo "🚀 Lancement de tous les tests..."

# Tests unitaires
echo "🧪 Tests unitaires..."
npm test -- --coverage --passWithNoTests --watchAll=false

# Tests E2E
echo "🎭 Tests End-to-End..."
npm run e2e

echo "✅ Tous les tests sont passés avec succès !"