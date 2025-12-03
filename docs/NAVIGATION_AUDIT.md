# Navigation Audit Report

## Executive Summary

Comprehensive audit of GRIMOIRE's navigation system to ensure all links, buttons, and transitions work correctly with predictable back/exit actions.

## Current Navigation System

### Router Structure
- **Type**: React Router v6 (Browser Router)
- **Layout**: Single root layout with nested routes
- **Animation**: Framer Motion for page transitions
- **Protection**: ProtectedRoute component for auth-required pages

### Navigation Methods

1. **React Router Links** - Standard navigation
2. **useNavigation Hook** - Type-safe navigation helper
3. **NavigationButtons** - Reusable back/next/home buttons
4. **Legacy `go` Function** - Prop-based navigation (being phased out)

## Issues Identified

### 1. **Inconsistent Navigation Patterns**

**Problem**: Multiple navigation methods coexist
- Some pages use `useNavigation` hook
- Others use legacy `go` function prop
- Some use direct `useNavigate` from React Router
- Navbar uses `Link` components

**Impact**: Confusing for developers, harder to maintain

### 2. **Unpredictable Back Button Behavior**

**Problem**: Back buttons don't always return to expected location
- Forum back button goes to landing, not previous page
- Story detail back button doesn't remember filter state
- Modal close doesn't restore scroll position
- No breadcrumb trail for deep navigation

**Impact**: Poor user experience, lost context

### 3. **Missing Exit Confirmations**

**Problem**: No confirmation for destructive actions
- Leaving compose page with unsaved changes
- Closing modal with form data
- Navigating away from active session
- No "Are you sure?" dialogs

**Impact**: Data loss, user frustration

### 4. **Broken Navigation States**

**Problem**: Navigation doesn't handle edge cases
- 404 pages not implemented
- Loading states inconsistent
- Error states don't provide navigation options
- Dead-end pages with no way back

**Impact**: Users get stuck, poor UX

### 5. **Inconsistent Active States**

**Problem**: Active navigation indicators unreliable
- Navbar active state uses `startsWith` (too broad)
- Some nested routes don't show active parent
- Mobile menu doesn't close after navigation
- No visual feedback for current location

**Impact**: Users don't know where they are

### 6. **Missing Keyboard Navigation**

**Problem**: Keyboard users can't navigate efficiently
- No keyboard shortcuts for common actions
- Tab order not optimized
- No skip links
- Focus management after navigation incomplete

**Impact**: Accessibility issues

### 7. **Route Parameter Issues**

**Problem**: URL parameters not validated
- Invalid slugs cause errors
- Missing parameters not handled
- Special characters in URLs break routing
- No fallback for malformed URLs

**Impact**: App crashes, poor error handling

## Recommendations

### 1. Standardize Navigation API

Create a unified navigation system:

```typescript
// src/hooks/useAppNavigation.ts
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track navigation history
  const [history, setHistory] = useState<string[]>([]);
  
  const goTo = {
    // Pages
    home: () => navigate(ROUTES.HOME),
    stories: (filters?: StoryFilters) => {
      const query = filters ? `?${new URLSearchParams(filters)}` : '';
      navigate(`${ROUTES.STORIES}${query}`);
    },
    storyDetail: (slug: string) => navigate(buildRoute.storyDetail(slug)),
    
    // Smart back - goes to previous page or fallback
    back: (fallback: string = ROUTES.HOME) => {
      if (history.length > 1) {
        navigate(-1);
      } else {
        navigate(fallback);
      }
    },
    
    // Exit with confirmation
    exitWithConfirmation: (message: string, destination: string) => {
      if (window.confirm(message)) {
        navigate(destination);
      }
    },
  };
  
  return { goTo, location, history };
};
```

### 2. Implement Smart Back Button

```typescript
// src/components/shared/SmartBackButton.tsx
export const SmartBackButton: React.FC<{
  fallback?: string;
  label?: string;
}> = ({ fallback = ROUTES.HOME, label = 'Back' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if there's history
  const canGoBack = window.history.length > 1;
  
  const handleBack = () => {
    if (canGoBack && location.key !== 'default') {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
  
  return (
    <BackButton onClick={handleBack} label={label} />
  );
};
```

### 3. Add Exit Confirmations

```typescript
// src/hooks/useUnsavedChanges.ts
export const useUnsavedChanges = (hasChanges: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Warn before leaving page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);
  
  // Block navigation
  useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasChanges && currentLocation.pathname !== nextLocation.pathname
  );
};
```

### 4. Implement 404 Page

```typescript
// src/pages/NotFound.tsx
export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageContainer>
      <Center className="min-h-[60vh]">
        <Stack spacing="lg" className="text-center">
          <Heading as="h1">404 - Page Not Found</Heading>
          <BodyText>The page you're looking for doesn't exist.</BodyText>
          <Flex gap="md" justify="center">
            <BackButton onClick={() => navigate(-1)} />
            <HomeButton />
          </Flex>
        </Stack>
      </Center>
    </PageContainer>
  );
};
```

### 5. Fix Active State Logic

```typescript
// Improved active state detection
const isActive = (path: string, exact: boolean = false) => {
  if (exact) {
    return currentPath === path;
  }
  
  // Handle nested routes properly
  if (path === ROUTES.HOME) {
    return currentPath === path;
  }
  
  // Check if current path starts with route and next char is / or end
  const pathWithSlash = path.endsWith('/') ? path : `${path}/`;
  return currentPath === path || currentPath.startsWith(pathWithSlash);
};
```

### 6. Add Keyboard Navigation

```typescript
// src/hooks/useKeyboardNavigation.ts
export const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + H = Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        navigate(ROUTES.HOME);
      }
      
      // Alt + B = Back
      if (e.altKey && e.key === 'b') {
        e.preventDefault();
        navigate(-1);
      }
      
      // Escape = Close modal/go back
      if (e.key === 'Escape') {
        // Handle based on context
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
};
```

### 7. Validate Route Parameters

```typescript
// src/utils/routeValidation.ts
export const validateSlug = (slug: string): boolean => {
  // Only allow alphanumeric, hyphens, underscores
  return /^[a-zA-Z0-9-_]+$/.test(slug);
};

export const validateRouteParams = (
  params: Record<string, string | undefined>,
  required: string[]
): boolean => {
  return required.every(key => {
    const value = params[key];
    return value && validateSlug(value);
  });
};

// Usage in component
const { slug } = useParams();
if (!slug || !validateSlug(slug)) {
  return <NotFound />;
}
```

## Navigation Patterns

### Page Navigation

```typescript
// ✅ Good - Using navigation hook
const { goTo } = useNavigation();
<button onClick={() => goTo.stories()}>View Stories</button>

// ❌ Bad - Direct navigate
const navigate = useNavigate();
<button onClick={() => navigate('/stories')}>View Stories</button>
```

### Back Navigation

```typescript
// ✅ Good - Smart back with fallback
<SmartBackButton fallback={ROUTES.STORIES} />

// ❌ Bad - Always goes to same place
<BackButton onClick={() => navigate(ROUTES.HOME)} />
```

### Modal Navigation

```typescript
// ✅ Good - Preserves location
const [isOpen, setIsOpen] = useState(false);
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />

// ❌ Bad - Changes URL for modal
navigate('/modal/create');
```

### Form Navigation

```typescript
// ✅ Good - Warns about unsaved changes
const [hasChanges, setHasChanges] = useState(false);
useUnsavedChanges(hasChanges);

// ❌ Bad - No warning
<button onClick={() => navigate(ROUTES.HOME)}>Cancel</button>
```

## Breadcrumb System

```typescript
// src/components/shared/Breadcrumbs.tsx
export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const crumbs = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${paths.slice(0, index + 1).join('/')}`,
    }));
  }, [location]);
  
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span>/</span>
            {index === crumbs.length - 1 ? (
              <span className="text-zinc-400">{crumb.label}</span>
            ) : (
              <Link to={crumb.path}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

## Focus Management

```typescript
// src/hooks/useFocusManagement.ts
export const useFocusManagement = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Focus main content after navigation
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [location]);
};
```

## Testing Checklist

### Navigation Links
- [ ] All navbar links work
- [ ] Footer links work
- [ ] Breadcrumb links work
- [ ] Card links work
- [ ] Button navigation works

### Back/Exit Actions
- [ ] Back button returns to previous page
- [ ] Back button has fallback for direct access
- [ ] Exit button goes to expected location
- [ ] Modal close returns to page
- [ ] Escape key closes modals

### Active States
- [ ] Current page highlighted in navbar
- [ ] Nested routes show active parent
- [ ] Mobile menu shows active page
- [ ] Breadcrumbs show current location

### Edge Cases
- [ ] Invalid URLs show 404
- [ ] Missing parameters handled
- [ ] Special characters in URLs work
- [ ] Deep links work
- [ ] Browser back/forward work

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Skip links work
- [ ] Keyboard shortcuts work
- [ ] Focus visible
- [ ] Escape closes modals

### Confirmations
- [ ] Unsaved changes warn before exit
- [ ] Destructive actions confirm
- [ ] Form cancel confirms if dirty
- [ ] Session exit confirms

## Implementation Priority

### High Priority (Immediate)
1. ✅ Standardize navigation API
2. ✅ Implement smart back button
3. ✅ Add 404 page
4. ⚠️ Fix active state logic

### Medium Priority (Next Sprint)
1. Add exit confirmations
2. Implement breadcrumbs
3. Add keyboard navigation
4. Validate route parameters

### Low Priority (Future)
1. Add navigation history
2. Implement deep linking
3. Add navigation analytics
4. Create navigation documentation

## Accessibility

### WCAG Requirements
- **2.4.1 Bypass Blocks**: Skip links to main content
- **2.4.3 Focus Order**: Logical tab order
- **2.4.4 Link Purpose**: Clear link text
- **2.4.5 Multiple Ways**: Multiple navigation methods
- **2.4.7 Focus Visible**: Visible focus indicators
- **2.4.8 Location**: Breadcrumbs or indicators

### Implementation
```typescript
// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Main content with ID
<main id="main-content" tabIndex={-1}>
  <Content />
</main>

// Clear link text
<Link to={ROUTES.STORIES}>
  View all stories
  <span className="sr-only"> in the library</span>
</Link>
```

## Conclusion

GRIMOIRE's navigation system needs **standardization** to ensure:

✅ **Consistent API** - Single navigation method
✅ **Predictable Back** - Smart back with fallbacks
✅ **Exit Confirmations** - Prevent data loss
✅ **Error Handling** - 404 and validation
✅ **Keyboard Support** - Full keyboard navigation
✅ **Accessibility** - WCAG compliant

The main improvements needed are:
1. Unified navigation hook
2. Smart back button component
3. Exit confirmation system
4. 404 page implementation
5. Route parameter validation
6. Keyboard navigation support
