# 🤝 Contributing to GRIMOIRE: Tale Threads

Thank you for your interest in contributing! This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Kiro Usage Guidelines](#kiro-usage-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Security](#security)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Git
- Firebase account (for testing)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/grimoire-tale-threads.git
   cd grimoire-tale-threads
   ```
3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/{{YOUR_USERNAME}}/grimoire-tale-threads.git
   ```

### Install Dependencies

```bash
pnpm install
```

### Set Up Environment

```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

### Run Development Server

```bash
pnpm dev
```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Changes

- Write code following our [Code Style](#code-style)
- Add tests for new features
- Update documentation as needed
- Keep commits focused and atomic

### 3. Test Your Changes

```bash
# Run linter
pnpm lint

# Run type checker
pnpm type-check

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

**Commit message format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Example:**
```
feat: add real-time cursor tracking to Chains

Implemented live cursor tracking using Firebase Realtime Database.
Each participant's cursor position is synced in real-time.

Closes #123
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template
5. Submit

---

## 🤖 Kiro Usage Guidelines

### Maintaining .kiro Directory

The `.kiro/` directory is essential for hackathon compliance. When contributing:

#### DO:
- ✅ Keep `.kiro/` directory in repository
- ✅ Update specs when adding features
- ✅ Document Kiro usage in `.kiro/README.md`
- ✅ Add hooks for new workflows
- ✅ Update steering docs with new patterns

#### DON'T:
- ❌ Add `.kiro/` to `.gitignore`
- ❌ Delete `.kiro/` directory
- ❌ Commit secrets to `.kiro/` files
- ❌ Remove existing specs without discussion

### Adding New Specs

When adding a major feature:

1. **Create spec directory:**
   ```bash
   mkdir -p .kiro/specs/your-feature
   ```

2. **Add requirements.md:**
   ```markdown
   # Your Feature Requirements
   
   ## User Stories
   - As a user, I want to...
   
   ## Acceptance Criteria
   - [ ] Criterion 1
   - [ ] Criterion 2
   ```

3. **Add design.md:**
   ```markdown
   # Your Feature Design
   
   ## Data Models
   ## API Contracts
   ## Component Structure
   ```

4. **Add tasks.md:**
   ```markdown
   # Your Feature Tasks
   
   - [ ] Task 1
   - [ ] Task 2
   ```

### Adding New Hooks

When automating a workflow:

1. **Create hook file:**
   ```bash
   touch .kiro/hooks/your-hook.json
   ```

2. **Define hook:**
   ```json
   {
     "name": "Your Hook",
     "description": "What it does",
     "trigger": {
       "type": "onFileSave",
       "filePattern": "src/**/*.tsx"
     },
     "action": {
       "type": "command",
       "command": "pnpm test:related ${filePath}"
     },
     "enabled": true
   }
   ```

### Updating Steering Docs

When introducing new patterns:

1. **Open `.kiro/steering.md`**
2. **Add to relevant section:**
   - Architectural Principles
   - Behavioral Rules
   - Code Style
   - etc.
3. **Provide examples**
4. **Explain rationale**

---

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const UserCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return <div>{user.name}</div>;
};

// ❌ Bad
export const UserCard = (props: any) => {
  return <div>{props.user.name}</div>;
};
```

### React Components

```typescript
// ✅ Good: Functional component with TypeScript
import React, { useState, useEffect } from 'react';

interface Props {
  userId: string;
  onUpdate: (user: User) => void;
}

export const UserProfile: React.FC<Props> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <LoadingState />;
  
  return <div>{user.name}</div>;
};
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (`useUserProfile.ts`)
- **Utils:** camelCase (`formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types:** PascalCase (`UserProfile`)

### File Organization

```
src/
├── components/
│   ├── shared/          # Reusable components
│   ├── diary/           # Feature-specific components
│   └── __tests__/       # Component tests
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # TypeScript types
└── pages/               # Route components
```

### Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Debounce to prevent excessive Firestore writes
const debouncedSave = useMemo(() => debounce(saveEntry, 500), []);

// ❌ Bad: Obvious comments
// Set the title
setTitle(newTitle);
```

---

## 🧪 Testing

### Writing Tests

```typescript
// Unit test example
describe('useDiaryEntries', () => {
  it('should fetch diary entries', async () => {
    const { result } = renderHook(() => useDiaryEntries('user123'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.entries).toHaveLength(3);
  });
});

// Integration test example
describe('Diary Flow', () => {
  it('should create and view entry', async () => {
    render(<DiaryView />);
    fireEvent.click(screen.getByText('New Entry'));
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Entry' }
    });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(screen.getByText('Test Entry')).toBeInTheDocument();
    });
  });
});
```

### Test Coverage

- Aim for > 80% coverage
- Test happy paths and edge cases
- Mock external dependencies (Firebase, etc.)

### Running Tests

```bash
# All tests
pnpm test

# Specific test file
pnpm test src/hooks/__tests__/useDiaryEntries.test.ts

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

---

## 📤 Submitting Changes

### Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Tests pass (`pnpm test`)
- [ ] No secrets committed
- [ ] `.kiro/` directory updated (if applicable)
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests pass
```

### Review Process

1. **Automated checks** run (CI)
2. **Maintainer review** (1-2 days)
3. **Feedback addressed**
4. **Approved and merged**

---

## 🔒 Security

### Reporting Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

**Instead:**
1. Email: {{YOUR_EMAIL}}
2. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Security Guidelines

- **Never commit secrets** (API keys, passwords, tokens)
- **Use `.env` files** for local secrets
- **Use GitHub Secrets** for CI secrets
- **Validate all user input**
- **Sanitize data** before rendering
- **Follow Firebase security rules**

### Checking for Secrets

```bash
# Before committing
./scripts/check-no-secrets.sh

# Check staged files
git diff --cached | grep -iE "(api_key|secret|password)"
```

---

## 🎯 Areas for Contribution

### High Priority

- [ ] Mobile responsiveness improvements
- [ ] Accessibility enhancements
- [ ] Performance optimizations
- [ ] Test coverage increases
- [ ] Documentation improvements

### Feature Requests

- [ ] Audio book support
- [ ] Customizable Dollhouse rooms
- [ ] Advanced collaborative features
- [ ] Social features (following, notifications)
- [ ] Export/import functionality

### Bug Fixes

Check [Issues]({{REPO_URL}}/issues) for open bugs.

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

## 💬 Communication

- **GitHub Issues:** Bug reports, feature requests
- **GitHub Discussions:** Questions, ideas, general discussion
- **Email:** {{YOUR_EMAIL}} (for security issues)

---

## 🙏 Thank You!

Your contributions make GRIMOIRE better for everyone. We appreciate your time and effort!

---

**Last Updated:** December 2, 2024
