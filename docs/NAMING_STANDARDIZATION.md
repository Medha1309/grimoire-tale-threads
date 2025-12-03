# Platform Naming Standardization

**Date:** December 2, 2025  
**Status:** Implementation Guide

## Overview

This document establishes consistent naming conventions across the entire GRIMOIRE platform to improve user experience and brand cohesion.

---

## Standardized Names

### Primary Features

| Feature | Official Name | Usage Context |
|---------|--------------|---------------|
| Collaborative Writing System | **Tale Threads** | All UI, documentation, code comments |
| Real-time Sessions | **Reflection Sessions** | Tab label, feature description |
| Async Collaboration | **Collaborative Stories** | Tab label, feature description |
| Forum | **Tea Room** | Navigation, UI |
| Diary System | **The Boudoir** | Navigation, UI |
| Story Library | **The Library** | Navigation, UI |
| About Page | **About** | Navigation |
| Contact Page | **Contact** | Navigation |

### URL Routes

| Feature | Route | Redirect From |
|---------|-------|---------------|
| Tale Threads | `/chains` | `/tale-threads` |
| Collaborative Project | `/chains/projects/:id` | `/tale-threads/projects/:id` |
| Reflection Sessions | `/chains?tab=sessions` | - |
| Collaborative Stories | `/chains?tab=projects` | - |

### Code References

| Context | Use |
|---------|-----|
| File names | `taleThreads.ts`, `chainSession.ts` |
| Component names | `CollaborativeStoriesView`, `ReflectionSessions` |
| CSS classes | `tale-threads-page`, `chains-scroll` |
| Comments | "Tale Threads" (user-facing), "chains" (technical) |

---

## Navigation Labels

### Main Navigation (Navbar)
- Home
- Library
- Tea Room
- **Tale Threads** ← STANDARDIZED
- Boudoir
- About
- Contact

### Tale Threads Tabs
- **Reflection Sessions** (with ⚡ icon)
- **Collaborative Stories** (with 📖 icon)

---

## Implementation Checklist

### High Priority (User-Facing)
- [x] Navbar link text
- [x] About page polaroid
- [x] Page titles and headers
- [x] Tab labels in Tale Threads
- [x] Documentation

### Medium Priority (Technical)
- [x] Route redirects
- [x] CSS class names
- [x] Code comments
- [x] Type definitions

### Low Priority (Internal)
- [ ] Variable names (gradual refactor)
- [ ] Function names (gradual refactor)

---

## Rationale

**"Tale Threads"** was chosen as the primary name because:
1. More evocative and thematic than "Chains"
2. Better conveys the collaborative storytelling concept
3. Aligns with the gothic/literary aesthetic
4. "Threads" suggests both story threads and discussion threads

**"Chains"** is retained in:
- URLs (for brevity and SEO)
- Technical code (to avoid massive refactoring)
- Internal references

---

## Migration Notes

- Old `/tale-threads` routes redirect to `/chains`
- Both route patterns work during transition period
- CSS classes use `tale-threads-page` for specificity
- Backend collections remain unchanged (`chainSessions`, etc.)

---

## Future Considerations

- Consider renaming backend collections in major version update
- Evaluate user feedback on "Tale Threads" branding
- Monitor analytics for route usage patterns
