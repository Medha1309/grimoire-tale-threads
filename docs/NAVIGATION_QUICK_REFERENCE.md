# Navigation Quick Reference

Quick guide for using the navigation system in Grimoire.

---

## Using Navigation in Components

### Import the Hook

```typescript
import { useAppNavigation } from '../hooks/useAppNavigation';

const MyComponent = () => {
  const { goTo, goBack, canGoBack } = useAppNavigation();
  
  // Use navigation methods...
};
```

---

## Navigation Methods

### Go to Specific Pages

```typescript
// Core pages
goTo.home();
goTo.stories();
goTo.about();
goTo.contact();

// Auth pages
goTo.login();
goTo.signup();
goTo.profile();

// Content pages
goTo.forum();
goTo.diary();
goTo.compose();

// With parameters
goTo.storyDetail('story-slug');
goTo.reader('story-slug');
goTo.forumPost('post-id');
goTo.diaryEntry('entry-id');
goTo.userProfile('user-id');

// With filters
goTo.stories({ genre: 'horror', sort: 'popular' });
```

### Smart Back Navigation

```typescript
// Go back or to fallback
goBack(); // Goes back or to home
goBack('/stories'); // Goes back or to stories

// Check if can go back
if (canGoBack) {
  // Show back button
}
```

### Exit with Confirmation

```typescript
exitWithConfirmation(
  'You have unsaved changes. Leave anyway?',
  '/stories'
);
```

---

## Navigation Components

### SmartBackButton

```typescript
import { SmartBackButton } from '../components/shared/SmartNavigationButtons';

// Basic usage
<SmartBackButton />

// With custom fallback
<SmartBackButton fallback="/stories" />

// With custom label
<SmartBackButton label="Return" />

// With confirmation
<SmartBackButton 
  onBeforeNavigate={() => {
    if (hasUnsavedChanges) {
      return window.confirm('Leave without saving?');
    }
    return true;
  }}
/>

// Different variants
<SmartBackButton variant="default" />
<SmartBackButton variant="ghost" />
<SmartBackButton variant="prominent" />
```

### HomeButton

```typescript
import { HomeButton } from '../components/shared/SmartNavigationButtons';

<HomeButton />
<HomeButton label="Back to Home" />
<HomeButton variant="prominent" />
```

### ExitButton

```typescript
import { ExitButton } from '../components/shared/SmartNavigationButtons';

<ExitButton destination="/stories" />
<ExitButton 
  destination="/stories"
  confirmMessage="Are you sure?"
/>
```

### Navigation Group

```typescript
import { NavigationGroup } from '../components/shared/SmartNavigationButtons';

<NavigationGroup position="between">
  <SmartBackButton />
  <HomeButton />
</NavigationGroup>

// Positions: 'left' | 'center' | 'right' | 'between'
```

### Breadcrumbs

```typescript
import { Breadcrumbs } from '../components/shared/SmartNavigationButtons';

<Breadcrumbs />
```

---

## Protecting Against Unsaved Changes

```typescript
import { useUnsavedChanges } from '../hooks/useAppNavigation';

const MyEditor = () => {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);
  
  const { checkBeforeNavigate } = useUnsavedChanges(
    !saved,
    'You have unsaved changes. Leave anyway?'
  );
  
  return (
    <div>
      <SmartBackButton onBeforeNavigate={checkBeforeNavigate} />
      {/* Editor content */}
    </div>
  );
};
```

---

## Keyboard Shortcuts

Users can navigate using keyboard shortcuts:

- **Alt+H** - Go to Home
- **Alt+B** - Go Back
- **Alt+L** - Go to Library
- **Alt+F** - Go to Forum
- **Alt+D** - Go to Diary

Enable/disable in your component:

```typescript
import { useKeyboardNavigation } from '../hooks/useAppNavigation';

const MyComponent = () => {
  useKeyboardNavigation(true); // Enable
  // or
  useKeyboardNavigation(false); // Disable
};
```

---

## Route Constants

Always use route constants instead of hardcoded strings:

```typescript
import { ROUTES } from '../config/routes';

// ✅ Good
<Link to={ROUTES.STORIES}>Library</Link>
navigate(ROUTES.STORIES);

// ❌ Bad
<Link to="/stories">Library</Link>
navigate('/stories');
```

### Available Constants

```typescript
ROUTES.HOME          // '/'
ROUTES.STORIES       // '/stories'
ROUTES.STORY_DETAIL  // '/story/:slug'
ROUTES.READER        // '/read/:slug'
ROUTES.ABOUT         // '/about'
ROUTES.CONTACT       // '/contact'
ROUTES.LOGIN         // '/login'
ROUTES.SIGNUP        // '/signup'
ROUTES.PROFILE       // '/profile'
ROUTES.FORUM         // '/forum'
ROUTES.FORUM_POST    // '/forum/:postId'
ROUTES.DIARY         // '/diary'
ROUTES.DIARY_ENTRY   // '/diary/:entryId'
ROUTES.ADMIN         // '/admin'
```

### Building Routes with Parameters

```typescript
import { buildRoute } from '../config/routes';

const storyUrl = buildRoute.storyDetail('my-story');
// Result: '/story/my-story'

const readerUrl = buildRoute.reader('my-story');
// Result: '/read/my-story'

const forumUrl = buildRoute.forumPost('post-123');
// Result: '/forum/post-123'
```

---

## Common Patterns

### Page with Back and Home

```typescript
const MyPage = () => {
  return (
    <div>
      <NavigationGroup position="between">
        <SmartBackButton fallback="/stories" />
        <HomeButton />
      </NavigationGroup>
      
      {/* Page content */}
    </div>
  );
};
```

### Modal with Cancel

```typescript
const MyModal = ({ onClose }) => {
  return (
    <Modal>
      <CancelButton onCancel={onClose} />
      {/* Modal content */}
    </Modal>
  );
};
```

### Editor with Unsaved Changes

```typescript
const MyEditor = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const { checkBeforeNavigate } = useUnsavedChanges(
    hasChanges,
    'Discard unsaved changes?'
  );
  
  return (
    <div>
      <SmartBackButton onBeforeNavigate={checkBeforeNavigate} />
      <ExitButton 
        destination="/stories"
        onBeforeNavigate={checkBeforeNavigate}
      />
      {/* Editor */}
    </div>
  );
};
```

### Programmatic Navigation

```typescript
const MyComponent = () => {
  const { goTo } = useAppNavigation();
  
  const handleSubmit = async () => {
    await saveData();
    goTo.stories(); // Navigate after save
  };
  
  const handleCancel = () => {
    if (window.confirm('Cancel?')) {
      goTo.back('/stories');
    }
  };
};
```

---

## Testing Navigation

```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('navigation works', async () => {
  const user = userEvent.setup();
  
  render(
    <MemoryRouter initialEntries={['/']}>
      <MyComponent />
    </MemoryRouter>
  );
  
  await user.click(screen.getByText('Go to Stories'));
  expect(screen.getByText('Stories Page')).toBeInTheDocument();
});
```

---

## Accessibility

All navigation components are accessible:

- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ ARIA labels
- ✅ Skip links available

```typescript
// Skip link is automatically added in RootLayout
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## Performance

Navigation is optimized:

- ✅ Lazy loading for routes
- ✅ Code splitting
- ✅ Memoized components
- ✅ Retry logic for failed loads

---

## Troubleshooting

### Back button not working?

```typescript
// Check if history exists
const { canGoBack } = useAppNavigation();

if (canGoBack) {
  // Show back button
} else {
  // Show home button instead
}
```

### Need to prevent navigation?

```typescript
const { checkBeforeNavigate } = useUnsavedChanges(hasChanges);

<SmartBackButton onBeforeNavigate={checkBeforeNavigate} />
```

### Route not found?

1. Check route is defined in `src/config/routes.ts`
2. Check route is implemented in `src/router/index.tsx`
3. Check for typos in path

### Deep link not working?

Make sure route has parameters defined:

```typescript
// In routes.ts
STORY_DETAIL: '/story/:slug'

// In router
<Route path={ROUTES.STORY_DETAIL} element={<StoryDetail />} />
```

---

## Best Practices

1. **Always use route constants** - Never hardcode paths
2. **Use navigation hook** - Don't use `useNavigate` directly
3. **Provide fallbacks** - Always have a fallback for back button
4. **Protect unsaved changes** - Use `useUnsavedChanges` hook
5. **Test navigation** - Write tests for navigation flows
6. **Use navigation components** - Don't create custom buttons
7. **Consider accessibility** - Use semantic HTML and ARIA labels

---

## Examples

See these files for examples:

- `src/pages/NotFound.tsx` - 404 page with navigation
- `src/components/shared/SmartNavigationButtons.tsx` - All navigation components
- `src/hooks/useAppNavigation.ts` - Navigation hook
- `src/__tests__/navigation/NavigationRouting.test.tsx` - Navigation tests

