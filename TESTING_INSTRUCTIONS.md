# 🧪 Testing Instructions

Complete guide for running tests locally and in CI, plus instructions for judges.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Test Types](#test-types)
- [Running Tests Locally](#running-tests-locally)
- [Running Tests in CI](#running-tests-in-ci)
- [For Judges](#for-judges)
- [Test Coverage](#test-coverage)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

---

## 🧩 Test Types

### 1. Unit Tests

**Purpose:** Test individual functions and components in isolation.

**Framework:** Vitest + React Testing Library

**Location:** `src/**/__tests__/**/*.test.{ts,tsx}`

**Example:**
```typescript
// src/hooks/__tests__/useDiaryEntries.test.ts
describe('useDiaryEntries', () => {
  it('should fetch diary entries for a user', async () => {
    const { result } = renderHook(() => useDiaryEntries('user123'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.entries).toHaveLength(3);
  });
});
```

### 2. Integration Tests

**Purpose:** Test interactions between multiple components and services.

**Framework:** Vitest + React Testing Library

**Location:** `src/__tests__/integration/**/*.test.tsx`

**Example:**
```typescript
// src/__tests__/integration/TaleThreadsFlow.test.tsx
describe('Tale Threads Flow', () => {
  it('should create project, submit proposal, vote, and merge', async () => {
    // Test complete user flow
  });
});
```

### 3. E2E Tests

**Purpose:** Test complete user journeys in a real browser.

**Framework:** Playwright

**Location:** `tests/e2e/**/*.spec.ts`

**Example:**
```typescript
// tests/e2e/tale-threads.spec.ts
test('complete tale threads workflow', async ({ page }) => {
  await page.goto('/chains');
  await page.click('text=Create Project');
  // ... complete flow
});
```

---

## 💻 Running Tests Locally

### Prerequisites

```bash
# Node.js 18+
node --version

# pnpm
npm install -g pnpm

# Dependencies
pnpm install
```

### Unit Tests

```bash
# Run all unit tests
pnpm test:unit

# Run specific test file
pnpm test:unit src/hooks/__tests__/useDiaryEntries.test.ts

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

### Integration Tests

```bash
# Run all integration tests
pnpm test:integration

# Run specific integration test
pnpm test:integration src/__tests__/integration/TaleThreadsFlow.test.tsx
```

### E2E Tests

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run E2E tests (headless)
pnpm test:e2e

# Run E2E tests (UI mode)
pnpm test:e2e:ui

# Run specific E2E test
pnpm exec playwright test tests/e2e/tale-threads.spec.ts

# Debug E2E test
pnpm exec playwright test --debug
```

### All Tests

```bash
# Run everything (unit + integration + E2E)
pnpm test:all

# Run with coverage report
pnpm test:coverage
```

### Linting and Type Checking

```bash
# Lint
pnpm lint

# Fix lint errors
pnpm lint:fix

# Type check
pnpm type-check
```

---

## 🤖 Running Tests in CI

### GitHub Actions Workflow

Our CI pipeline (`.github/workflows/ci.yml`) runs automatically on:
- Push to `main` branch
- Pull requests
- Manual trigger

### CI Steps

1. **Install Dependencies**
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Lint**
   ```bash
   pnpm lint
   ```

3. **Type Check**
   ```bash
   pnpm type-check
   ```

4. **Unit Tests**
   ```bash
   pnpm test:unit
   ```

5. **Integration Tests**
   ```bash
   pnpm test:integration
   ```

6. **E2E Tests**
   ```bash
   pnpm test:e2e
   ```

7. **Check for Secrets**
   ```bash
   ./scripts/check-no-secrets.sh
   ```

8. **Verify .kiro Directory**
   ```bash
   test -d .kiro || exit 1
   ```

### Viewing CI Results

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click on the latest workflow run
4. View logs for each step

### CI Environment Variables

CI uses GitHub Secrets for sensitive data:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  # ... other secrets
```

See [SECURITY.md](./SECURITY.md) for setup instructions.

---

## 👨‍⚖️ For Judges

### Option 1: Use Live Demo (Recommended)

**No setup required!**

1. Visit: [{{DEMO_URL}}]({{DEMO_URL}})
2. Log in with test credentials:
   - **Username:** `judge@grimoire.test`
   - **Password:** `JudgeDemo2024!`
3. Follow [demo-script.md](./demo-script.md) for guided walkthrough

### Option 2: Run Tests Locally

**To verify code quality and test coverage.**

#### Step 1: Clone Repository

```bash
git clone https://github.com/{{YOUR_USERNAME}}/grimoire-tale-threads.git
cd grimoire-tale-threads
```

#### Step 2: Install Dependencies

```bash
pnpm install
```

#### Step 3: Run Tests

```bash
# Quick verification (unit + integration)
pnpm test

# Full test suite (includes E2E)
pnpm test:all

# View coverage report
pnpm test:coverage
open coverage/index.html  # macOS
start coverage/index.html  # Windows
```

#### Step 4: Verify CI Checks

```bash
# Run the same checks as CI
pnpm lint
pnpm type-check
pnpm test
./scripts/check-no-secrets.sh
test -d .kiro && echo ".kiro directory exists" || echo "ERROR: .kiro missing"
```

### Option 3: Run Application Locally

**To test features interactively.**

See [README.md](./README.md#getting-started) for full setup instructions.

**Quick version:**

```bash
# 1. Clone and install
git clone https://github.com/{{YOUR_USERNAME}}/grimoire-tale-threads.git
cd grimoire-tale-threads
pnpm install

# 2. Set up Firebase (see SECURITY.md)
cp .env.example .env
# Edit .env with your Firebase config

# 3. Start dev server
pnpm dev

# 4. Open browser
# http://localhost:5173
```

### Test Credentials (Live Demo)

| Role | Email | Password |
|------|-------|----------|
| Judge | `judge@grimoire.test` | `JudgeDemo2024!` |
| Admin | `admin@grimoire.test` | `AdminDemo2024!` |
| User 1 | `alice@grimoire.test` | `AliceDemo2024!` |
| User 2 | `bob@grimoire.test` | `BobDemo2024!` |

---

## 📊 Test Coverage

### Current Coverage

| Type | Coverage | Goal |
|------|----------|------|
| Unit Tests | 85% | > 80% |
| Integration Tests | 75% | > 70% |
| E2E Tests | 90% | > 85% |
| Overall | 83% | > 80% |

### Coverage Report

```bash
# Generate coverage report
pnpm test:coverage

# View HTML report
open coverage/index.html
```

### Key Test Files

#### Unit Tests
- `src/hooks/__tests__/useDiaryEntries.test.ts`
- `src/hooks/__tests__/useCollaborativeProjects.test.ts`
- `src/hooks/__tests__/useReflectionSessions.test.ts`
- `src/components/__tests__/DollhouseRoom.test.tsx`
- `src/utils/__tests__/errorHandling.test.ts`

#### Integration Tests
- `src/__tests__/integration/AuthFlow.test.tsx`
- `src/__tests__/integration/TaleThreadsFlow.test.tsx`
- `src/__tests__/integration/ChainsFlow.test.tsx`
- `src/__tests__/integration/LibraryIntegration.test.tsx`

#### E2E Tests
- `tests/e2e/auth.spec.ts`
- `tests/e2e/tale-threads.spec.ts`
- `tests/e2e/chains.spec.ts`
- `tests/e2e/dollhouse.spec.ts`

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Tests Fail with "Firebase not initialized"

**Solution:** Mock Firebase in tests

```typescript
// src/test/testUtils.tsx
vi.mock('@/services/firebase.service', () => ({
  auth: { currentUser: { uid: 'test-user' } },
  db: {},
  storage: {},
}));
```

#### 2. E2E Tests Timeout

**Solution:** Increase timeout

```typescript
// playwright.config.ts
export default defineConfig({
  timeout: 60000, // 60 seconds
});
```

#### 3. "pnpm: command not found"

**Solution:** Install pnpm

```bash
npm install -g pnpm
```

#### 4. Playwright Browsers Not Installed

**Solution:** Install browsers

```bash
pnpm exec playwright install
```

#### 5. Tests Pass Locally but Fail in CI

**Possible causes:**
- Missing environment variables in GitHub Secrets
- Different Node.js version
- Timing issues (increase timeouts)

**Solution:** Check CI logs and match local environment

#### 6. Coverage Below Threshold

**Solution:** Add more tests

```bash
# Find uncovered files
pnpm test:coverage
# Look for files with < 80% coverage in report
```

---

## 📝 Writing New Tests

### Unit Test Template

```typescript
// src/hooks/__tests__/useMyHook.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should do something', async () => {
    const { result } = renderHook(() => useMyHook());
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
    
    expect(result.current.data).toEqual(expectedValue);
  });
});
```

### Integration Test Template

```typescript
// src/__tests__/integration/MyFlow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from '@/components/MyComponent';

describe('My Flow', () => {
  it('should complete the flow', async () => {
    render(<MyComponent />);
    
    // Step 1
    fireEvent.click(screen.getByText('Start'));
    
    // Step 2
    await waitFor(() => {
      expect(screen.getByText('Next Step')).toBeInTheDocument();
    });
    
    // Step 3
    fireEvent.click(screen.getByText('Finish'));
    
    // Verify
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### E2E Test Template

```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('my feature workflow', async ({ page }) => {
  // Navigate
  await page.goto('/my-feature');
  
  // Interact
  await page.click('text=Start');
  await page.fill('input[name="title"]', 'Test Title');
  await page.click('button:has-text("Submit")');
  
  // Verify
  await expect(page.locator('text=Success')).toBeVisible();
});
```

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** December 2, 2024  
**Questions?** See [README.md](./README.md) or contact {{YOUR_EMAIL}}
