# 📋 Hackathon Submission Checklist

Complete this checklist before submitting to ensure you meet all requirements.

## ✅ Repository Requirements

### Must Have (Will Disqualify if Missing)

- [ ] **`.kiro` directory at root** - Contains specs, hooks, or steering
  - Location: `.kiro/specs/` ✅ (You have this!)
  - NOT in .gitignore ✅
  
- [ ] **Open source license file** - MIT License
  - Location: `LICENSE` ✅ (Just created!)
  - Visible in GitHub "About" section
  
- [ ] **Public repository** - Not private
  - Make sure repo is public on GitHub
  - Check visibility settings

- [ ] **All source code** - Complete and functional
  - All `.tsx`, `.ts`, `.css` files
  - `package.json` with dependencies
  - Build configuration files

### Should Have (Improves Score)

- [ ] **README.md** - Comprehensive documentation
  - Project description ✅
  - Features list ✅
  - Tech stack ✅
  - Setup instructions ✅
  - Screenshots (add these!)
  - Demo links (add after deployment)

- [ ] **KIRO_USAGE_WRITEUP.md** - How you used Kiro
  - Vibe coding examples ✅
  - Spec-driven development ✅
  - Steering documents ✅
  - Concrete examples ✅
  - Time savings metrics ✅

- [ ] **Setup instructions** - Clear and complete
  - Prerequisites listed ✅
  - Installation steps ✅
  - Environment variables ✅
  - Firebase setup guide ✅

---

## 🎬 Demo Video Requirements

### Must Have

- [ ] **Under 3 minutes** - Judges won't watch more
  - Aim for 2:30 to be safe
  - Practice and time it

- [ ] **Shows app functioning** - On actual device
  - Screen recording of your app
  - Show it actually working
  - Navigate through features

- [ ] **Uploaded to approved platform**
  - YouTube (recommended)
  - Vimeo
  - Facebook Video
  - Youku

- [ ] **Public and accessible** - Not private/unlisted
  - Set to "Public" not "Unlisted"
  - Test link in incognito mode

- [ ] **Link in submission** - Working URL
  - Copy exact URL
  - Test it opens correctly

### Should Include

- [ ] **Hook/intro** (0-20s) - Grab attention
  - "Grimr is where horror fans read, write, and connect"
  - Show landing page

- [ ] **Problem/solution** (20-60s) - Why it matters
  - "Horror writers need a dedicated space"
  - Show how Grimr solves it

- [ ] **Feature showcase** (60-120s) - Main features
  - Library: Browse and read
  - Forum: Discuss and reply
  - Diary: Private journaling
  - Show actual functionality

- [ ] **Technical highlights** (120-150s) - Impress judges
  - Firebase backend
  - Real-time updates
  - Authentication
  - Show code briefly

- [ ] **Kiro mention** (150-180s) - Required!
  - "Built entirely with Kiro AI"
  - Show `.kiro/specs/` folder
  - Mention time savings

- [ ] **Call to action** (180s) - End strong
  - GitHub link
  - "Try it yourself" link

---

## 🌐 Deployment Requirements

### Must Have

- [ ] **Working demo URL** - Accessible to judges
  - Deploy to Vercel/Netlify/Firebase Hosting
  - Test URL works
  - Not localhost!

- [ ] **Test credentials** - If login required
  - Provide in README
  - Provide in submission form
  - Test they work

- [ ] **Demo data** - App not empty
  - 3-5 forum posts
  - 2-3 stories in library
  - Sample diary entries
  - Makes app feel alive

### Should Have

- [ ] **Custom domain** (optional) - More professional
  - grimr.vercel.app
  - Or custom domain

- [ ] **SSL/HTTPS** - Security
  - Vercel/Netlify provide this automatically

- [ ] **Fast loading** - Good first impression
  - Optimize images
  - Check Lighthouse score

---

## 📝 Devpost Submission Form

### Required Fields

- [ ] **Project title** - "Grimr - Gothic Horror Fiction Platform"

- [ ] **Tagline** - One sentence
  - "Where horror fans read, write, and connect in a hauntingly beautiful space"

- [ ] **Description** - Full description
  - Copy from README
  - Include features
  - Mention Kiro usage

- [ ] **Category** - Select appropriate category
  - Choose your category
  - Choose bonus category if applicable

- [ ] **Demo URL** - Working link
  - Your Vercel/Netlify URL
  - Test it works

- [ ] **Video URL** - YouTube link
  - Public video
  - Under 3 minutes

- [ ] **GitHub URL** - Public repository
  - https://github.com/YOUR_USERNAME/grimr
  - Make sure it's public

- [ ] **Kiro usage write-up** - Required!
  - Link to KIRO_USAGE_WRITEUP.md
  - Or paste content in form
  - This is 33% of your score!

### Optional But Recommended

- [ ] **Screenshots** - 3-5 images
  - Landing page
  - Library view
  - Forum/Parlour
  - Diary/Dollhouse
  - Admin dashboard

- [ ] **Technologies used** - Tag all
  - React
  - TypeScript
  - Firebase
  - Tailwind CSS
  - Framer Motion
  - Kiro AI

- [ ] **Team members** - Add collaborators
  - Your name
  - LinkedIn profile
  - Role

---

## 🔥 Firebase Setup

### Must Configure

- [ ] **Firebase project created**
  - Go to console.firebase.google.com
  - Create new project

- [ ] **Authentication enabled**
  - Enable Email/Password
  - Test sign up works

- [ ] **Firestore database created**
  - Start in test mode
  - Add security rules later

- [ ] **Environment variables set**
  - `.env` file locally
  - Vercel/Netlify environment variables
  - All 6 Firebase config values

### Should Configure

- [ ] **Security rules** - Protect data
  - See DEPLOY_FIRESTORE_RULES.md
  - Test rules work

- [ ] **Firestore indexes** - Performance
  - Firebase will prompt you
  - Click the links to create

---

## 🎯 Pre-Submission Testing

### Test Everything Works

- [ ] **Sign up flow** - Create new account
  - Go to /signup
  - Create account
  - Verify it works

- [ ] **Login flow** - Sign in
  - Log out
  - Log back in
  - Verify it works

- [ ] **Create content** - Test CRUD
  - Create forum post
  - Reply to post
  - Like content
  - Delete own content

- [ ] **Mobile responsive** - Test on phone
  - Open on actual phone
  - Or use Chrome DevTools
  - Check all pages

- [ ] **No console errors** - Clean DevTools
  - Open DevTools (F12)
  - Check Console tab
  - Fix any errors

- [ ] **All links work** - No 404s
  - Click every link
  - Test navigation
  - Fix broken links

---

## 📊 Final Quality Checks

### Code Quality

- [ ] **No TypeScript errors**
  ```bash
  npm run build
  ```

- [ ] **No ESLint errors**
  ```bash
  npm run lint
  ```

- [ ] **Tests pass** (if you have tests)
  ```bash
  npm test
  ```

### Documentation Quality

- [ ] **README is complete** - All sections filled
- [ ] **Kiro write-up is compelling** - Tells your story
- [ ] **Setup instructions work** - Test on fresh clone
- [ ] **Links are updated** - No placeholder URLs

### Demo Quality

- [ ] **Video is polished** - Good audio/video
- [ ] **Demo has data** - Not empty
- [ ] **Features work** - No broken functionality
- [ ] **Loading is fast** - Good performance

---

## 🚀 Submission Steps (In Order)

### 1. Prepare Repository (30 min)

```bash
# 1. Make sure everything is committed
git status

# 2. Add all files
git add .

# 3. Commit with good message
git commit -m "feat: Complete hackathon submission with Kiro AI"

# 4. Push to GitHub
git push origin main

# 5. Verify .kiro directory is visible on GitHub
# Go to your repo and check!
```

### 2. Deploy Application (20 min)

**Option A: Vercel (Recommended)**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add environment variables in Vercel dashboard
# 4. Deploy to production
vercel --prod
```

**Option B: Netlify**
```bash
# 1. Build
npm run build

# 2. Deploy
netlify deploy --prod --dir=dist

# 3. Add environment variables in Netlify dashboard
```

### 3. Add Demo Data (15 min)

1. Sign up with test account
2. Create 3 forum posts (copy from SEED_POSTS_SIMPLE.md)
3. Add 2-3 stories to library
4. Create 1-2 diary entries
5. Test everything works

### 4. Record Video (60 min)

1. Write script (use template below)
2. Practice run-through
3. Record with OBS/QuickTime/Loom
4. Edit if needed
5. Upload to YouTube (Public)
6. Copy URL

### 5. Take Screenshots (10 min)

1. Landing page
2. Library view
3. Forum/Parlour
4. Diary/Dollhouse
5. Save as PNG/JPG

### 6. Submit on Devpost (15 min)

1. Go to hackathon page
2. Click "Submit Project"
3. Fill all required fields
4. Add screenshots
5. Add video URL
6. Add GitHub URL
7. Add demo URL
8. Paste Kiro write-up
9. Review everything
10. Submit!

---

## 🎬 Video Script Template

```
[0:00-0:20] HOOK
"Grimr is where horror fans read, write, and connect."
[Show landing page with dramatic music]
[Quick montage of features]

[0:20-1:00] PROBLEM & SOLUTION
"Horror writers need a dedicated space to share their work."
[Show Library]
"Readers want curated dark fiction."
[Show browsing stories]
"Communities need moderation tools."
[Show forum and admin]

[1:00-2:00] FEATURE SHOWCASE
"The Library - discover and read horror fiction"
[Show browsing, bookmarking, reading]

"The Parlour - discuss stories and theories"
[Show creating post, replying, liking]

"The Dollhouse - private journaling with encryption"
[Show diary entry, mood tracking]

[2:00-2:40] TECHNICAL HIGHLIGHTS
"Built with React, TypeScript, and Firebase"
[Show code briefly]
"Real-time updates, authentication, moderation"
[Show features working]

[2:40-3:00] KIRO & CTA
"Built entirely with Kiro AI in just 6 days"
[Show .kiro/specs/ folder]
"Try it yourself at [URL]"
[Show GitHub link]
```

---

## ✅ Final Checklist

Before clicking "Submit":

- [ ] Repository is public
- [ ] LICENSE file exists and is visible
- [ ] .kiro directory is NOT in .gitignore
- [ ] README is complete with all links updated
- [ ] KIRO_USAGE_WRITEUP.md is compelling
- [ ] Demo is deployed and working
- [ ] Demo has sample data (not empty)
- [ ] Test credentials work
- [ ] Video is under 3 minutes
- [ ] Video is public on YouTube
- [ ] Video shows app functioning
- [ ] Screenshots are added
- [ ] All form fields are filled
- [ ] GitHub URL is correct
- [ ] Demo URL is correct
- [ ] Video URL is correct
- [ ] Kiro write-up is included
- [ ] Category is selected
- [ ] Everything has been tested

---

## 🆘 Common Issues

**"Can't see .kiro directory on GitHub"**
- Check it's not in .gitignore
- Run: `git add .kiro -f`
- Commit and push again

**"Demo URL doesn't work"**
- Check environment variables are set
- Check Firebase config is correct
- Check deployment logs for errors

**"Video is too long"**
- Edit to 2:30
- Speed up some sections
- Cut less important parts

**"Can't submit on Devpost"**
- Try different browser
- Clear cache
- Check all required fields
- Contact Devpost support

---

## 🎉 After Submission

- [ ] Share on social media (#hookedonkiro)
- [ ] Post on dev.to (bonus prize!)
- [ ] Relax - you did it!

---

**Good luck! 🍀**
