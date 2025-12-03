# Desktop Troubleshooting Guide

## Issue: "Nothing is working"

Let me help you debug step by step.

### Step 1: Check if the route exists
Navigate to: **http://localhost:5173/desktop**

### Step 2: What do you see?

#### If you see a blank page:
1. Open browser console (F12)
2. Check for errors
3. Look for "Failed to fetch dynamically imported module" errors

#### If you see "Page not found" or redirected to login:
1. Make sure you're logged in
2. The desktop route requires authentication (ProtectedRoute)
3. Try logging in first at http://localhost:5173/login

#### If you see errors in console:
Common errors and fixes:

**Error: "Cannot find module"**
- The Desktop.tsx file might not be exported correctly
- Check that `src/pages/Desktop.tsx` exists
- Check that it exports `Desktop` component

**Error: "react-draggable not found"**
- Run: `npm install react-draggable --legacy-peer-deps`

**Error: "retroTokens is undefined"**
- Check that `src/design-system/retro-tokens.ts` exists
- Check imports in components

### Step 3: Manual verification

#### Check files exist:
```
src/pages/Desktop.tsx
src/components/retro/DesktopShell.tsx
src/components/retro/Windows98Window.tsx
src/components/retro/DesktopIcon.tsx
src/components/retro/Taskbar.tsx
src/components/retro/StartMenu.tsx
src/design-system/retro-tokens.ts
```

#### Check route is added:
In `src/router/index.tsx`, look for:
```typescript
{
  path: ROUTES.DESKTOP,
  element: <ProtectedRoute><Desktop /></ProtectedRoute>,
}
```

#### Check ROUTES config:
In `src/config/routes.ts`, look for:
```typescript
DESKTOP: '/desktop',
```

### Step 4: Alternative access methods

#### Add a temporary link to Landing page:
Edit `src/pages/Landing.tsx` and add:
```tsx
<a href="/desktop">Go to Desktop</a>
```

#### Or navigate from browser console:
```javascript
window.location.href = '/desktop'
```

### Step 5: Check authentication

The desktop requires you to be logged in. If you're not logged in:

1. Go to http://localhost:5173/login
2. Log in with your credentials
3. Then navigate to http://localhost:5173/desktop

### Step 6: Check dev server

Make sure the dev server is running:
```bash
npm run dev
```

Look for:
```
VITE v... ready in ...ms
Local: http://localhost:5173/
```

### Common Issues

#### Issue: "Blank teal screen"
- This might actually be working! The desktop has a teal background
- Look for desktop icons in the top-left
- Look for taskbar at the bottom
- Try clicking around

#### Issue: "Icons not clickable"
- Check browser console for JavaScript errors
- Make sure onClick handlers are working
- Try double-clicking instead of single-clicking

#### Issue: "Start menu doesn't open"
- Click the Start button in the bottom-left
- Check console for errors
- Make sure StartMenu component is rendering

### Debug Mode

Add console.logs to verify components are rendering:

In `src/components/retro/DesktopShell.tsx`, add at the top of the component:
```typescript
console.log('DesktopShell rendering');
```

In `src/components/retro/DesktopIcon.tsx`, add:
```typescript
console.log('DesktopIcon rendering:', label);
```

### Still not working?

Please provide:
1. What URL you're navigating to
2. What you see on screen (screenshot if possible)
3. Any errors in browser console (F12)
4. Whether you're logged in or not

