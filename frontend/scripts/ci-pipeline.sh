#!/bin/bash

# Script d'automation pour pipeline CI/CD
# Usage: ./scripts/ci-pipeline.sh

set -e

echo "🚀 Démarrage du pipeline CI..."

# 1. Installation des dépendances
echo "📦 Étape 1/6: Installation des dépendances..."
npm ci

# 2. Vérification de la qualité du code
echo "🔍 Étape 2/6: Vérification de la qualité..."
./scripts/quality-check.sh

# 3. Build de l'application
echo "🏗️ Étape 3/6: Build de l'application..."
npm run build

# 4. Tests unitaires avec coverage
echo "🧪 Étape 4/6: Tests unitaires..."
npm test -- --coverage --passWithNoTests --watchAll=false

# 5. Tests E2E
echo "🎭 Étape 5/6: Tests End-to-End..."
./scripts/test-e2e.sh headless

# 6. Vérification de sécurité
echo "🔒 Étape 6/6: Audit de sécurité..."
npm audit --audit-level=moderate

echo "✅ Pipeline CI terminé avec succès!"

# Génération du rapport
echo "📊 Génération du rapport..."
echo "=============================="
echo "📅 Date: $(date)"
echo "🏷️ Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"
echo "📁 Taille du build: $(du -sh build/ 2>/dev/null || echo 'N/A')"
echo "=============================="