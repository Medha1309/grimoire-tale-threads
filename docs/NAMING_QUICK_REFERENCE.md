# Naming Quick Reference

**Last Updated:** December 2, 2025

## At a Glance

### User-Facing Names (Always Use These)

| Feature | Official Name |
|---------|--------------|
| Main Feature | **Tale Threads** |
| Tab 1 | **Reflection Sessions** |
| Tab 2 | **Collaborative Stories** |
| Forum | **Tea Room** |
| Diary | **The Boudoir** |
| Library | **The Library** |

### Navigation

```
Home → Library → Tea Room → Tale Threads → Boudoir → About → Contact
```

### URLs

```
/chains                    → Tale Threads main page
/chains?tab=sessions       → Reflection Sessions tab
/chains?tab=projects       → Collaborative Stories tab
/chains/projects/:id       → Individual project
/tale-threads              → Redirects to /chains
```

### When to Use What

**Use "Tale Threads":**
- Navigation links
- Page titles
- User-facing documentation
- Marketing materials
- Help text
- Error messages

**Use "Chains" (technical):**
- URL routes
- File names
- Function names
- Database collections
- CSS classes
- Code comments (internal)

**Use "Reflection Sessions":**
- Tab label in Tale Threads
- Feature descriptions
- When referring to real-time collaborative writing

**Use "Collaborative Stories":**
- Tab label in Tale Threads
- Feature descriptions
- When referring to async proposal-based writing

## Examples

### ✅ Correct

```tsx
// Navigation
<Link to="/chains">Tale Threads</Link>

// Page title
<h1>Tale Threads</h1>

// Tab labels
<Tab>Reflection Sessions</Tab>
<Tab>Collaborative Stories</Tab>

// Error message
"Sign in to access Tale Threads"

// Loading state
"Loading Tale Threads..."
```

### ❌ Incorrect

```tsx
// Don't use these in user-facing text
<Link to="/chains">Chains</Link>
<Link to="/chains">Chain Lab</Link>
<h1>Chains</h1>
<h1>Chain Lab</h1>
"Sign in to access the Chain Lab"
```

## Room Names

| Feature | Official Name | Alternative |
|---------|--------------|-------------|
| Diary System | **The Boudoir** | Dollhouse (technical) |
| Forum | **Tea Room** | Gilded Parlour (legacy) |
| Library | **The Library** | Stories |
| About | **About** | - |
| Contact | **Contact** | - |

## Icon Reference

- Tale Threads: ✦ (in header)
- Reflection Sessions: ⚡
- Collaborative Stories: 📖
- Tea Room: 🫖 (optional)
- The Boudoir: 🏠 (optional)
- The Library: 📚 (optional)

## Color Schemes

- **Tale Threads**: Purple/Lime (`#8B5CF6`, `#84cc16`)
- **Tea Room**: Gold/Sepia (`#d4a574`, `#8b7355`)
- **The Boudoir**: Pink/Black (`#ff006e`, `#000`)
- **The Library**: Torch-lit (amber/shadow)

## Quick Checklist

When adding new features or text:

- [ ] Use "Tale Threads" not "Chains" or "Chain Lab"
- [ ] Use "Reflection Sessions" for real-time tab
- [ ] Use "Collaborative Stories" for async tab
- [ ] Use "Tea Room" not "Forum" or "Parlour"
- [ ] Use "The Boudoir" not "Diary" or "Dollhouse"
- [ ] Use "The Library" not just "Stories"
- [ ] Check navigation consistency
- [ ] Verify tab labels match
- [ ] Ensure error messages use correct names
