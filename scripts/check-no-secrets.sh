#!/bin/bash

# Script to check for accidentally committed secrets
# Used in CI to prevent secret leaks

set -e

echo "🔍 Checking for accidentally committed secrets..."

# Patterns to search for
PATTERNS=(
  "API_KEY"
  "SECRET"
  "PRIVATE_KEY"
  "PASSWORD"
  "TOKEN"
  "GEMINI"
  "firebase.*apiKey"
  "AIzaSy"
  "sk-[a-zA-Z0-9]{32,}"
)

# Files to exclude from search
EXCLUDE_PATTERNS=(
  ".git"
  "node_modules"
  "dist"
  "coverage"
  "*.md"
  "*.example"
  "*.test.*"
  "*.spec.*"
  "check-no-secrets.sh"
  "SECURITY.md"
  "README.md"
  ".env.example"
)

# Build exclude arguments for grep
EXCLUDE_ARGS=""
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
  EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude=$pattern"
done

# Search for secrets
FOUND_SECRETS=0

for pattern in "${PATTERNS[@]}"; do
  echo "  Checking for: $pattern"
  
  # Search in all files except excluded ones
  if grep -r -i -E "$pattern" . $EXCLUDE_ARGS --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=coverage 2>/dev/null; then
    echo "  ⚠️  Found potential secret: $pattern"
    FOUND_SECRETS=1
  fi
done

# Check for .env files (should not be committed)
if [ -f ".env" ]; then
  echo "  ⚠️  Found .env file (should be in .gitignore)"
  FOUND_SECRETS=1
fi

if [ -f ".env.local" ]; then
  echo "  ⚠️  Found .env.local file (should be in .gitignore)"
  FOUND_SECRETS=1
fi

if [ -f ".env.production" ]; then
  echo "  ⚠️  Found .env.production file (should be in .gitignore)"
  FOUND_SECRETS=1
fi

# Check if any secrets were found
if [ $FOUND_SECRETS -eq 1 ]; then
  echo ""
  echo "❌ ERROR: Potential secrets found in repository!"
  echo ""
  echo "Please review the files above and ensure no secrets are committed."
  echo "Secrets should be stored in:"
  echo "  - .env files (gitignored)"
  echo "  - GitHub Secrets (for CI)"
  echo "  - Environment variables (for deployment)"
  echo ""
  echo "See SECURITY.md for more information."
  exit 1
else
  echo ""
  echo "✅ No secrets found. Repository is clean!"
  exit 0
fi
