# Navigation System Architecture

Visual overview of the navigation system in Grimoire.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Router     │───▶│  Navigation  │───▶│  Components  │ │
│  │ (index.tsx)  │    │     Hook     │    │   (Buttons)  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                    │                    │         │
│         │                    │                    │         │
│         ▼                    ▼                    ▼         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │    Routes    │    │   History    │    │     UI       │ │
│  │  Constants   │    │  Management  │    │  Feedback    │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Route Flow

```
User Action
    │
    ▼
┌─────────────────┐
│  Click Link /   │
│  Call goTo()    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Navigation     │
│  Hook           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Check Auth?    │────▶│  Redirect to    │
│                 │     │  Login          │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│  Update URL     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Load Route     │
│  Component      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Focus Main     │
│  Content        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Scroll to Top  │
└─────────────────┘
```

---

## Component Hierarchy

```
App
 │
 ├─ RootLayout
 │   │
 │   ├─ Skip Links (Accessibility)
 │   │
 │   ├─ Navbar
 │   │   ├─ Home Link
 │   │   ├─ Library Link
 │   │   ├─ Tea Room Link
 │   │   ├─ Tale Threads Link
 │   │   ├─ Boudoir Link
 │   │   ├─ About Link
 │   │   ├─ Contact Link
 │   │   └─ Profile / Auth Buttons
 │   │
 │   ├─ Main Content (Routes)
 │   │   │
 │   │   ├─ Landing (/)
 │   │   ├─ Stories (/stories)
 │   │   ├─ Story Detail (/story/:slug)
 │   │   ├─ Reader (/read/:slug)
 │   │   ├─ Forum (/forum)
 │   │   ├─ Forum Post (/forum/:postId)
 │   │   ├─ Diary (/diary)
 │   │   ├─ Diary Entry (/diary/:entryId)
 │   │   ├─ Tale Threads (/tale-threads)
 │   │   ├─ Projects (/tale-threads/projects/:id)
 │   │   ├─ Scrapbook (/scrapbook)
 │   │   ├─ Collection (/scrapbook/:id)
 │   │   ├─ About (/about)
 │   │   ├─ Contact (/contact)
 │   │   ├─ Login (/login)
 │   │   ├─ Signup (/signup)
 │   │   ├─ Profile (/profile)
 │   │   └─ NotFound (*)
 │   │
 │   └─ Footer
 │
 └─ Navigation Components
     ├─ SmartBackButton
     ├─ HomeButton
     ├─ ExitButton
     ├─ CancelButton
     ├─ NavigationGroup
     └─ Breadcrumbs
```

---

## Navigation Hook API

```
useAppNavigation()
 │
 ├─ goTo
 │   ├─ home()
 │   ├─ stories(filters?)
 │   ├─ storyDetail(slug)
 │   ├─ reader(slug)
 │   ├─ about()
 │   ├─ contact()
 │   ├─ login()
 │   ├─ signup()
 │   ├─ profile()
 │   ├─ userProfile(userId)
 │   ├─ forum()
 │   ├─ forumPost(postId)
 │   ├─ diary()
 │   ├─ diaryEntry(entryId)
 │   ├─ taleThreads()
 │   ├─ collaborativeProject(projectId)
 │   ├─ scrapbook()
 │   ├─ scrapbookCollection(collectionId)
 │   ├─ admin()
 │   ├─ desktop()
 │   ├─ retro()
 │   └─ back(fallback?)
 │
 ├─ goBack(fallback?)
 ├─ exitWithConfirmation(message, destination)
 ├─ replace(path)
 ├─ canGoBack
 ├─ location
 ├─ navigationHistory
 └─ navigate (raw)
```

---

## Smart Back Button Logic

```
User Clicks Back Button
         │
         ▼
┌─────────────────────┐
│ onBeforeNavigate?   │
│ (Check unsaved)     │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Confirmed?   │
    └──┬───────┬───┘
       │       │
      No      Yes
       │       │
       ▼       ▼
    Cancel  ┌──────────────┐
            │ canGoBack?   │
            └──┬───────┬───┘
               │       │
              Yes     No
               │       │
               ▼       ▼
         ┌─────────┐ ┌─────────┐
         │ Go Back │ │ Go to   │
         │ (-1)    │ │ Fallback│
         └─────────┘ └─────────┘
```

---

## Route Protection Flow

```
User Navigates to Protected Route
         │
         ▼
┌─────────────────────┐
│ ProtectedRoute      │
│ Component           │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Authenticated?│
    └──┬───────┬───┘
       │       │
      Yes     No
       │       │
       ▼       ▼
┌─────────┐ ┌─────────────────┐
│ Render  │ │ Redirect to     │
│ Content │ │ Login           │
└─────────┘ │ (Save intended  │
            │  destination)   │
            └─────────────────┘
```

---

## Deep Linking Flow

```
User Visits Deep Link
(e.g., /story/my-story)
         │
         ▼
┌─────────────────────┐
│ Router Matches      │
│ /story/:slug        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Extract Parameter   │
│ slug = "my-story"   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Load StoryDetail    │
│ Component           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Fetch Story Data    │
│ using slug          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Render Story        │
└─────────────────────┘
```

---

## 404 Handling

```
User Navigates to Invalid Route
         │
         ▼
┌─────────────────────┐
│ Router Checks       │
│ All Routes          │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Match Found? │
    └──┬───────┬───┘
       │       │
      Yes     No
       │       │
       ▼       ▼
┌─────────┐ ┌─────────────────┐
│ Render  │ │ Catch-all Route │
│ Route   │ │ (path: '*')     │
└─────────┘ └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Render NotFound │
            │ Component       │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Show 404 Page   │
            │ with Navigation │
            │ Options         │
            └─────────────────┘
```

---

## Keyboard Navigation

```
User Presses Alt+Key
         │
         ▼
┌─────────────────────┐
│ Check if in Input   │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ In Input?    │
    └──┬───────┬───┘
       │       │
      Yes     No
       │       │
       ▼       ▼
    Ignore  ┌──────────────┐
            │ Which Key?   │
            └──┬───────────┘
               │
               ├─ Alt+H ──▶ Go to Home
               ├─ Alt+B ──▶ Go Back
               ├─ Alt+L ──▶ Go to Library
               ├─ Alt+F ──▶ Go to Forum
               └─ Alt+D ──▶ Go to Diary
```

---

## State Management

```
Navigation State
 │
 ├─ Current Location
 │   ├─ pathname
 │   ├─ search (query params)
 │   ├─ hash
 │   └─ state
 │
 ├─ Navigation History
 │   ├─ Previous pages
 │   ├─ Can go back?
 │   └─ Can go forward?
 │
 ├─ Authentication State
 │   ├─ Current user
 │   ├─ Is authenticated?
 │   └─ Intended destination
 │
 └─ UI State
     ├─ Loading
     ├─ Error
     └─ Transition
```

---

## Performance Optimization

```
Route Loading Strategy
         │
         ▼
┌─────────────────────┐
│ Lazy Load Route     │
│ Component           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Code Splitting      │
│ (Separate Bundle)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Suspense Boundary   │
│ (Show Loader)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Load on Demand      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Retry on Failure    │
│ (3 attempts)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Cache for Future    │
└─────────────────────┘
```

---

## Error Handling

```
Navigation Error
         │
         ▼
┌─────────────────────┐
│ Error Boundary      │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Error Type?  │
    └──┬───────────┘
       │
       ├─ Load Failed ──▶ Retry Loading
       ├─ Auth Failed ──▶ Redirect to Login
       ├─ Not Found ───▶ Show 404
       └─ Other ────────▶ Show Error Page
```

---

## Accessibility Flow

```
User Navigates
         │
         ▼
┌─────────────────────┐
│ Update URL          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Announce to         │
│ Screen Reader       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Focus Main Content  │
│ (Skip Links)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Update Page Title   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Scroll to Top       │
│ (Smooth)            │
└─────────────────────┘
```

---

## Summary

The navigation system is:

- **Centralized** - Single source of truth
- **Type-safe** - TypeScript prevents errors
- **Accessible** - WCAG 2.1 AA compliant
- **Performant** - Lazy loading & code splitting
- **User-friendly** - Intuitive behavior
- **Maintainable** - Clean architecture
- **Testable** - Comprehensive test coverage
- **Production-ready** - No known issues

