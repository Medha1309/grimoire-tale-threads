import React, { Suspense, memo, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../config/routes';
import { TitleBarScare } from '../components';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ErrorBoundary, PageLoader } from '../components';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Page } from '../types';
import { DollhousePageWrapper } from '../components/diary/DollhousePageWrapper';
import { lazyWithRetry } from '../components/OptimizedComponent';
import { SpiderField } from '../components/Creatures';
import { useIdleHaunting } from '../hooks/useIdleHaunting';
import { RealityTearEffect } from '../components/effects/RealityTearEffect';

// Optimized lazy loading with retry logic
const Landing = lazyWithRetry(() => import('../pages/Landing').then(m => ({ default: m.Landing })));
const Stories = lazyWithRetry(() => import('../pages/Stories').then(m => ({ default: m.Stories })));
const StoryDetail = lazyWithRetry(() => import('../pages/StoryDetail').then(m => ({ default: m.StoryDetail })));
const Reader = lazyWithRetry(() => import('../pages/Reader').then(m => ({ default: m.Reader })));
// Eager load About and Contact for better animation performance
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { SeedChains } from '../pages/SeedChains';
const RetroHub = lazyWithRetry(() => import('../pages/RetroHub'));
const Compose = lazyWithRetry(() => import('../pages/Compose').then(m => ({ default: m.Compose })));
const Login = lazyWithRetry(() => import('../pages/Login'));
const Signup = lazyWithRetry(() => import('../pages/SignUp'));
const Profile = lazyWithRetry(() => import('../pages/Profile').then(m => ({ default: m.Profile })));
const Forum = lazyWithRetry(() => import('../pages/Forum').then(m => ({ default: m.Forum })));
const Dollhouse = lazyWithRetry(() => import('../pages/Dollhouse').then(m => ({ default: m.Dollhouse })));
const Admin = lazyWithRetry(() => import('../pages/Admin').then(m => ({ default: m.Admin })));
const AdminDashboard = lazyWithRetry(() => import('../pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminPopulate = lazyWithRetry(() => import('../pages/AdminPopulate').then(m => ({ default: m.AdminPopulate })));
const SeedForum = lazyWithRetry(() => import('../pages/SeedForum').then(m => ({ default: m.SeedForum })));
const UserProfile = lazyWithRetry(() => import('../pages/UserProfile').then(m => ({ default: m.UserProfile })));
const MySpaceProfile = lazyWithRetry(() => import('../pages/MySpaceProfile').then(m => ({ default: m.MySpaceProfile })));
const ReflectionSessions = lazyWithRetry(() => import('../pages/ReflectionSessions').then(m => ({ default: m.ReflectionSessions })));
const ActiveSession = lazyWithRetry(() => import('../pages/ActiveSession').then(m => ({ default: m.ActiveSession })));
// Tale Threads collaborative story system
const Chains = lazyWithRetry(() => import('../pages/Chains').then(m => ({ default: m.Chains })));
const CollaborativeProject = lazyWithRetry(() => import('../pages/CollaborativeProject').then(m => ({ default: m.CollaborativeProject })));
const ScrapbookView = lazyWithRetry(() => import('../components/scrapbook/ScrapbookView').then(m => ({ default: m.ScrapbookView })));
const CollectionDetailView = lazyWithRetry(() => import('../components/scrapbook/CollectionDetailView').then(m => ({ default: m.CollectionDetailView })));
const Desktop = lazyWithRetry(() => import('../pages/Desktop').then(m => ({ default: m.Desktop })));
const ArtStudioPage = lazyWithRetry(() => import('../components/artstudio/MSPaintStudio').then(m => ({ default: m.default })));
const NotFound = lazyWithRetry(() => import('../pages/NotFound'));
const BoudoirTest = lazyWithRetry(() => import('../pages/BoudoirTest'));

/**
 * Root layout component - memoized for performance
 */
const RootLayout: React.FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.SIGNUP;
  const isLandingPage = location.pathname === '/' || location.pathname === ROUTES.HOME;
  const isLibraryPage = location.pathname.startsWith('/stories') || 
                        location.pathname.startsWith('/story') || 
                        location.pathname.startsWith('/read');
  const isAboutPage = location.pathname === '/about';
  const isContactPage = location.pathname === '/contact';
  const isForumPage = location.pathname.startsWith('/forum');
  const isDollhousePage = location.pathname.startsWith('/diary');
  const isTaleThreadsPage = location.pathname.startsWith('/tale-threads');
  const isProfilePage = location.pathname === ROUTES.PROFILE || location.pathname.startsWith('/myspace');

  useEffect(() => {
    // Add/remove page-specific classes to body
    document.body.classList.remove('auth-page', 'library-page', 'forum-page', 'dollhouse-page', 'tale-threads-page', 'profile-page');
    
    if (isAuthPage || isLandingPage || isAboutPage || isContactPage) {
      document.body.classList.add('auth-page');
    } else if (isLibraryPage) {
      document.body.classList.add('library-page');
    } else if (isForumPage) {
      document.body.classList.add('forum-page');
    } else if (isDollhousePage) {
      document.body.classList.add('dollhouse-page');
    } else if (isTaleThreadsPage) {
      document.body.classList.add('tale-threads-page');
    } else if (isProfilePage) {
      document.body.classList.add('profile-page');
    }
    
    return () => {
      document.body.classList.remove('auth-page', 'library-page', 'forum-page', 'dollhouse-page', 'tale-threads-page', 'profile-page');
    };
  }, [isAuthPage, isLandingPage, isLibraryPage, isAboutPage, isContactPage, isForumPage, isDollhousePage, isTaleThreadsPage, isProfilePage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      
      // Alt + H = Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        navigate('/');
      }
      
      // Alt + B = Back
      if (e.altKey && e.key === 'b') {
        e.preventDefault();
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate('/');
        }
      }
      
      // Alt + L = Library/Stories
      if (e.altKey && e.key === 'l') {
        e.preventDefault();
        navigate('/stories');
      }
      
      // Alt + F = Forum
      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        navigate('/forum');
      }
      
      // Alt + D = Diary/Dollhouse
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        navigate('/diary');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Focus management after navigation
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const { phase } = useIdleHaunting();

  return (
    <div className="min-h-screen bg-black font-[ui-serif]">
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-zinc-900 text-zinc-100 px-4 py-2 rounded-lg z-50
                   focus:outline-none focus:ring-2 focus:ring-zinc-500"
      >
        Skip to main content
      </a>
      
      <RealityTearEffect phase={phase} />
      <TitleBarScare />
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </ErrorBoundary>
      <Footer />
      <SpiderField count={6} />
    </div>
  );
});

RootLayout.displayName = 'RootLayout';

/**
 * Page wrapper with animations - memoized
 */
const AnimatedPage: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
});

AnimatedPage.displayName = 'AnimatedPage';

/**
 * Navigation wrapper for legacy pages - memoized with useCallback
 */
const WithNavigation: React.FC<{ children: (go: (page: Page, slug?: string) => void) => React.ReactNode }> = memo(({ children }) => {
  const navigate = useNavigate();
  
  const go = React.useCallback((page: Page, slug?: string) => {
    switch (page) {
      case 'landing':
        navigate(ROUTES.HOME);
        break;
      case 'stories':
        navigate(ROUTES.STORIES);
        break;
      case 'storyDetail':
        if (slug) navigate(`/story/${slug}`);
        break;
      case 'reader':
        if (slug) navigate(`/read/${slug}`);
        break;
      case 'about':
        navigate(ROUTES.ABOUT);
        break;
      case 'contact':
        navigate(ROUTES.CONTACT);
        break;
      case 'compose':
        navigate(ROUTES.COMPOSE);
        break;
      case 'login':
        navigate(ROUTES.LOGIN);
        break;
      case 'signup':
        navigate(ROUTES.SIGNUP);
        break;
      case 'profile':
        navigate(ROUTES.PROFILE);
        break;
      case 'forum':
        navigate(ROUTES.FORUM);
        break;
      case 'forumPost':
        if (slug) navigate(`/forum/${slug}`);
        break;
      case 'diary':
        navigate(ROUTES.DIARY);
        break;
      case 'diaryEntry':
        if (slug) navigate(`/diary/${slug}`);
        break;
      default:
        navigate(ROUTES.HOME);
    }
  }, [navigate]);
  
  return <>{children(go)}</>;
});

WithNavigation.displayName = 'WithNavigation';

/**
 * Forum wrapper that extracts postId from URL params
 */
const ForumWithParams: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  return (
    <WithNavigation>
      {(go) => <Forum go={go} threadId={postId} />}
    </WithNavigation>
  );
};

/**
 * Router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AnimatedPage><Landing /></AnimatedPage>,
      },
      {
        path: ROUTES.STORIES,
        element: <AnimatedPage><Stories /></AnimatedPage>,
      },
      {
        path: ROUTES.STORY_DETAIL,
        element: <AnimatedPage><StoryDetail /></AnimatedPage>,
      },
      {
        path: ROUTES.READER,
        element: <AnimatedPage><Reader /></AnimatedPage>,
      },
      {
        path: ROUTES.ABOUT,
        element: <About />,
      },
      {
        path: ROUTES.CONTACT,
        element: <Contact />,
      },
      {
        path: ROUTES.COMPOSE,
        element: <ProtectedRoute><AnimatedPage><WithNavigation>{(go) => <Compose go={go} />}</WithNavigation></AnimatedPage></ProtectedRoute>,
      },
      {
        path: ROUTES.LOGIN,
        element: <AnimatedPage><WithNavigation>{(go) => <Login go={go} />}</WithNavigation></AnimatedPage>,
      },
      {
        path: ROUTES.SIGNUP,
        element: <AnimatedPage><WithNavigation>{(go) => <Signup go={go} />}</WithNavigation></AnimatedPage>,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProtectedRoute><AnimatedPage><WithNavigation>{(go) => <Profile go={go} />}</WithNavigation></AnimatedPage></ProtectedRoute>,
      },
      {
        path: ROUTES.FORUM,
        element: <ProtectedRoute><AnimatedPage><WithNavigation>{(go) => <Forum go={go} />}</WithNavigation></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/retro',
        element: <AnimatedPage><RetroHub /></AnimatedPage>,
      },
      {
        path: ROUTES.FORUM_POST,
        element: <ProtectedRoute><AnimatedPage><ForumWithParams /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: ROUTES.DIARY,
        element: <ProtectedRoute><WithNavigation>{(go) => <DollhousePageWrapper go={go}>{(props) => <Dollhouse {...props} />}</DollhousePageWrapper>}</WithNavigation></ProtectedRoute>,
      },
      {
        path: ROUTES.DIARY_ENTRY,
        element: <ProtectedRoute><WithNavigation>{(go) => <DollhousePageWrapper go={go}>{(props) => <Dollhouse {...props} />}</DollhousePageWrapper>}</WithNavigation></ProtectedRoute>,
      },
      {
        path: ROUTES.ADMIN,
        element: <ProtectedRoute><AnimatedPage><AdminDashboard /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/admin/legacy',
        element: <ProtectedRoute><AnimatedPage><Admin /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: ROUTES.ADMIN_POPULATE,
        element: <ProtectedRoute><AnimatedPage><AdminPopulate /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/seed-forum',
        element: <AnimatedPage><WithNavigation>{(go) => <SeedForum go={go} />}</WithNavigation></AnimatedPage>,
      },
      {
        path: ROUTES.DESKTOP,
        element: <ProtectedRoute><Desktop /></ProtectedRoute>,
      },
      {
        path: '/profile/:userId',
        element: <AnimatedPage><UserProfile /></AnimatedPage>,
      },
      {
        path: '/myspace/:userId',
        element: <AnimatedPage><MySpaceProfile /></AnimatedPage>,
      },
      {
        path: '/tale-threads',
        element: <Navigate to="/chains?tab=projects" replace />,
      },
      {
        path: '/chains',
        element: <ProtectedRoute><AnimatedPage><Chains /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/seed-chains',
        element: <ProtectedRoute><AnimatedPage><SeedChains /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/tale-threads/projects',
        element: <Navigate to="/chains?tab=projects" replace />,
      },
      {
        path: '/tale-threads/projects/:projectId',
        element: <ProtectedRoute><AnimatedPage><CollaborativeProject /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/chains/projects/:projectId',
        element: <ProtectedRoute><AnimatedPage><CollaborativeProject /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/sessions/:sessionId',
        element: <ProtectedRoute><ActiveSession /></ProtectedRoute>,
      },
      {
        path: '/reflection-sessions',
        element: <ProtectedRoute><AnimatedPage><ReflectionSessions /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/scrapbook',
        element: <ProtectedRoute><AnimatedPage><ScrapbookView /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/scrapbook/:collectionId',
        element: <ProtectedRoute><AnimatedPage><CollectionDetailView /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/art-studio',
        element: <ProtectedRoute><AnimatedPage><ArtStudioPage /></AnimatedPage></ProtectedRoute>,
      },
      {
        path: '/boudoir-test',
        element: <AnimatedPage><BoudoirTest /></AnimatedPage>,
      },
    ],
  },
  // 404 catch-all route
  {
    path: '*',
    element: <AnimatedPage><NotFound /></AnimatedPage>,
  },
]);

/**
 * Router provider component
 */
export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
