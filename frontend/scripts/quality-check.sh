#!/bin/bash

# Script d'automation pour vérifier la qualité du code
# Usage: ./scripts/quality-check.sh [--fix]

set -e

FIX_MODE=false

# Traitement des arguments
for arg in "$@"; do
    case $arg in
        --fix)
            FIX_MODE=true
            shift
            ;;
    esac
done

echo "🔍 Vérification de la qualité du code..."

# ESLint
echo "📝 Vérification ESLint..."
if [ "$FIX_MODE" = true ]; then
    npm run lint -- --fix
    echo "  ✅ ESLint - corrections automatiques appliquées"
else
    npm run lint
    echo "  ✅ ESLint - vérification terminée"
fi

# Prettier
echo "🎨 Vérification Prettier..."
if [ "$FIX_MODE" = true ]; then
    npm run format
    echo "  ✅ Prettier - formatage appliqué"
else
    npx prettier --check ../ --write
    npx prettier --check ../../backend/ --write
    echo "  ✅ Prettier - vérification terminée"
fi

# TypeScript
echo "🔧 Vérification TypeScript..."
npx tsc --noEmit
echo "  ✅ TypeScript - compilation vérifiée"


echo "🎉 Vérification de qualité terminée!"

if [ "$FIX_MODE" = false ]; then
    echo ""
    echo "💡 Pour corriger automatiquement les problèmes détectés:"
    echo "   ./scripts/quality-check.sh --fix"
fi
