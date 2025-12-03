# Page Migration Script

## Completed Pages ✅
- [x] Landing.tsx
- [x] About.tsx
- [x] Contact.tsx
- [x] Stories.tsx

## Remaining Pages

### StoryDetail.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface StoryDetailProps extends NavigationProps {}
3. Replace: export const StoryDetail: React.FC<StoryDetailProps> = ({ go, slug }) => {
   With: export const StoryDetail: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add: import { useParams } from "react-router-dom";
6. Add at start of component: const { goTo } = useNavigation();
7. Add at start of component: const { slug } = useParams<{ slug: string }>();
8. Replace all: go("landing") → goTo.home()
9. Replace all: go("stories") → goTo.stories()
10. Replace all: go("reader", slug) → goTo.reader(slug!)
```

### Reader.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface ReaderProps extends NavigationProps { slug?: string; }
3. Replace: export const Reader: React.FC<ReaderProps> = ({ go, slug }) => {
   With: export const Reader: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add: import { useParams } from "react-router-dom";
6. Add at start of component: const { goTo } = useNavigation();
7. Add at start of component: const { slug } = useParams<{ slug: string }>();
8. Replace all: go("stories") → goTo.stories()
9. Replace all: go("landing") → goTo.home()
```

### Compose.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface ComposeProps extends NavigationProps {}
3. Replace: export const Compose: React.FC<ComposeProps> = ({ go }) => {
   With: export const Compose: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add at start of component: const { goTo } = useNavigation();
6. Replace all: go("landing") → goTo.home()
7. Replace all: go("stories") → goTo.stories()
8. Replace all: go("profile") → goTo.profile()
```

### Login.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface LoginProps extends NavigationProps {}
3. Replace: export const Login: React.FC<LoginProps> = ({ go }) => {
   With: export const Login: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add at start of component: const { goTo } = useNavigation();
6. Replace all: go("landing") → goTo.home()
7. Replace all: go("signup") → goTo.signup()
8. Replace all: go("profile") → goTo.profile()
```

### Signup.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface SignupProps extends NavigationProps {}
3. Replace: export const Signup: React.FC<SignupProps> = ({ go }) => {
   With: export const Signup: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add at start of component: const { goTo } = useNavigation();
6. Replace all: go("landing") → goTo.home()
7. Replace all: go("login") → goTo.login()
8. Replace all: go("profile") → goTo.profile()
```

### Profile.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface ProfileProps extends NavigationProps {}
3. Replace: export const Profile: React.FC<ProfileProps> = ({ go }) => {
   With: export const Profile: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add at start of component: const { goTo } = useNavigation();
6. Replace all: go("landing") → goTo.home()
7. Replace all: go("stories") → goTo.stories()
8. Replace all: go("compose") → goTo.compose()
9. Replace all: go("login") → goTo.login()
```

### GildedParlour.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface GildedParlourProps extends NavigationProps { postId?: string; }
3. Replace: export const GildedParlour: React.FC<GildedParlourProps> = ({ go, postId }) => {
   With: export const GildedParlour: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add: import { useParams } from "react-router-dom";
6. Add at start of component: const { goTo } = useNavigation();
7. Add at start of component: const { postId } = useParams<{ postId?: string }>();
8. Replace all: go("landing") → goTo.home()
9. Replace all: go("forum") → goTo.forum()
10. Replace all: go("forumPost", id) → goTo.forumPost(id)
11. Replace all: go("profile") → goTo.profile()
```

### Dollhouse.tsx
```typescript
// Find and replace:
1. Remove: import { NavigationProps } from "../types";
2. Remove: interface DollhouseProps extends NavigationProps { entryId?: string; }
3. Replace: export const Dollhouse: React.FC<NavigationProps> = ({ go, entryId }) => {
   With: export const Dollhouse: React.FC = () => {
4. Add: import { useNavigation } from "../hooks/useNavigation";
5. Add: import { useParams } from "react-router-dom";
6. Add at start of component: const { goTo } = useNavigation();
7. Add at start of component: const { entryId } = useParams<{ entryId?: string }>();
8. Replace all: go("landing") → goTo.home()
9. Replace all: go("diary") → goTo.diary()
10. Replace all: go("diaryEntry", id) → goTo.diaryEntry(id)
```

## Automated Find & Replace Patterns

### Pattern 1: Remove NavigationProps import
```
Find: import { NavigationProps } from "../types";\n
Replace: (empty)
```

### Pattern 2: Remove interface extending NavigationProps
```
Find: interface \w+Props extends NavigationProps \{\}?\n
Replace: (empty)
```

### Pattern 3: Update component signature (simple)
```
Find: export const (\w+): React\.FC<\w+Props> = \(\{ go \}\) =>
Replace: export const $1: React.FC = () =>
```

### Pattern 4: Update component signature (with params)
```
Find: export const (\w+): React\.FC<\w+Props> = \(\{ go, (\w+) \}\) =>
Replace: export const $1: React.FC = () =>
```

### Pattern 5: Add navigation hook
```
Add after component declaration:
  const { goTo } = useNavigation();
```

### Pattern 6: Add params hook (if needed)
```
Add after navigation hook:
  const { slug, postId, entryId } = useParams<{ slug?: string; postId?: string; entryId?: string }>();
```

### Pattern 7: Replace navigation calls
```
Find: go\("landing"\)
Replace: goTo.home()

Find: go\("stories"\)
Replace: goTo.stories()

Find: go\("about"\)
Replace: goTo.about()

Find: go\("contact"\)
Replace: goTo.contact()

Find: go\("compose"\)
Replace: goTo.compose()

Find: go\("login"\)
Replace: goTo.login()

Find: go\("signup"\)
Replace: goTo.signup()

Find: go\("profile"\)
Replace: goTo.profile()

Find: go\("forum"\)
Replace: goTo.forum()

Find: go\("diary"\)
Replace: goTo.diary()

Find: go\("storyDetail", (\w+)\)
Replace: goTo.storyDetail($1)

Find: go\("reader", (\w+)\)
Replace: goTo.reader($1)

Find: go\("forumPost", (\w+)\)
Replace: goTo.forumPost($1)

Find: go\("diaryEntry", (\w+)\)
Replace: goTo.diaryEntry($1)
```

## Testing Checklist

After migration, test each page:
- [ ] Page loads without errors
- [ ] All navigation buttons work
- [ ] URL updates correctly
- [ ] Browser back/forward works
- [ ] Deep linking works (direct URL access)
- [ ] Parameters are passed correctly (slug, postId, entryId)

## Common Issues & Solutions

### Issue: "Cannot find module useNavigation"
**Solution:** Add import: `import { useNavigation } from "../hooks/useNavigation";`

### Issue: "slug is undefined"
**Solution:** Add useParams: `const { slug } = useParams<{ slug: string }>();`

### Issue: "Property 'go' does not exist"
**Solution:** Replace `go(...)` with `goTo.method()`

### Issue: "Type 'string | undefined' is not assignable"
**Solution:** Add non-null assertion: `goTo.reader(slug!)`

## Verification Commands

```bash
# Check for remaining NavigationProps usage
grep -r "NavigationProps" src/pages/

# Check for remaining go prop usage
grep -r "{ go }" src/pages/

# Check for old navigation calls
grep -r 'go("' src/pages/

# Run TypeScript compiler
npm run build
```
