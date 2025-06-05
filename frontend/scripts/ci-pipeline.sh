#!/bin/bash

# Script d'automation pour pipeline CI/CD
# Usage: ./scripts/ci-pipeline.sh

set -e

echo "🚀 Démarrage du pipeline CI..."

# 1. Installation des dépendances
echo "📦 Étape 1/5: Installation des dépendances..."
npm ci

# 2. Vérification de la qualité du code
echo "🔍 Étape 2/5: Vérification de la qualité..."
./scripts/quality-check.sh

# 3. Build de l'application
echo "🏗️ Étape 3/5: Build de l'application..."
npm run build


# 4. Tests E2E
echo "🎭 Étape 4/5: Tests End-to-End..."
./scripts/test-e2e.sh headless

# 5. Vérification de sécurité
echo "🔒 Étape 5/5: Audit de sécurité..."
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
#!/bin/bash

# Script d'automation pour pipeline CI/CD
# Usage: ./scripts/ci-pipeline.sh

set -e

echo "🚀 Démarrage du pipeline CI..."

# 1. Installation des dépendances
echo "📦 Étape 1/5: Installation des dépendances..."
npm ci

# 2. Vérification de la qualité du code
echo "🔍 Étape 2/5: Vérification de la qualité..."
./scripts/quality-check.sh

# 3. Build de l'application
echo "🏗️ Étape 3/5: Build de l'application..."
npm run build


# 4. Tests E2E
echo "🎭 Étape 4/5: Tests End-to-End..."
./scripts/test-e2e.sh headless

# 5. Vérification de sécurité
echo "🔒 Étape 5/5: Audit de sécurité..."
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