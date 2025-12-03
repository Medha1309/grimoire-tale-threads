import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../config/routes";
import { NotificationBell } from "./social/NotificationBell";
import { buttons } from "../utils/themeClasses";

const NavbarComponent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser, userProfile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;
    const threshold = 0.01; // Only update if change is significant
    
    const handleScroll = () => {
      if (rafId) return; // Skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const depth = Math.min(scrolled / documentHeight, 1);
        
        // Only update if change is significant
        if (Math.abs(depth - lastScrollY) > threshold) {
          setScrollDepth(depth);
          lastScrollY = depth;
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = React.useMemo(() => [
    { name: "Home", path: ROUTES.HOME },
    { name: "Library", path: ROUTES.STORIES },
    { name: "Tea Room", path: ROUTES.FORUM },
    { name: "Tale Threads", path: "/tale-threads" },
    { name: "Boudoir", path: ROUTES.DIARY },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Contact", path: ROUTES.CONTACT },
  ], []);

  const isActive = React.useCallback((path: string) => {
    if (path === ROUTES.HOME) return currentPath === path;
    return currentPath.startsWith(path);
  }, [currentPath]);

  const toggleMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav 
      className="sticky top-0 z-50 border-b border-gothic-fog/20 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: `rgba(10, 10, 10, ${0.9 + scrollDepth * 0.1})`,
        borderBottomColor: `rgba(113, 113, 122, ${0.2 - scrollDepth * 0.1})`
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="group flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative font-serif text-2xl tracking-[0.3em] text-[#8B0000] transition-all duration-300 group-hover:text-[#a00000]"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(139, 0, 0, 0.5), 0 0 60px rgba(139, 0, 0, 0.3)'
              }}
            >
              GRIMOIRE
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative pb-1 text-sm font-serif tracking-wide transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-[#d4c4a8]"
                    : "text-[#d4c4a8]/60 hover:text-[#d4c4a8]/90"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent shadow-[0_2px_8px_rgba(139,0,0,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {currentUser ? (
              <React.Fragment>
                <NotificationBell />
                <motion.div whileHover="hover" initial="initial">
                  <Link 
                    to={ROUTES.PROFILE}
                    className="group relative flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-black/80 px-4 py-2 text-sm transition-all duration-300 hover:border-zinc-700/50 overflow-hidden"
                  >
                    {/* Subtle shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/10 to-transparent pointer-events-none"
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "200%" }
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    
                    {/* Flies that appear on hover */}
                    {[...Array(4)].map((_, i) => {
                      const flyPath = [
                        { x: 10, y: 15 },
                        { x: 30, y: 25 },
                        { x: 50, y: 10 },
                        { x: 70, y: 30 }
                      ][i];
                      
                      const randomX = [
                        [0, 5, 12, 3],
                        [0, -8, 15, -5],
                        [0, 9, -10, 7],
                        [0, -6, 8, -2]
                      ][i];
                      
                      const randomY = [
                        [0, 4, 10, 2],
                        [0, -5, 8, -3],
                        [0, 7, -9, 5],
                        [0, -4, 6, -1]
                      ][i];
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-zinc-500 rounded-full pointer-events-none"
                          style={{
                            left: `${flyPath.x}%`,
                            top: `${flyPath.y}%`,
                          }}
                          variants={{
                            initial: { scale: 0, opacity: 0 },
                            hover: { 
                              scale: [0, 1, 1.2, 1],
                              opacity: [0, 0.6, 0.8, 0.6],
                              x: randomX,
                              y: randomY,
                            }
                          }}
                          transition={{ 
                            duration: 2 + i * 0.3,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      );
                    })}

                    {/* Simple text-only profile */}
                    <span className="relative text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">
                      {userProfile?.displayName || "Profile"}
                      
                      {/* Subtle underline */}
                      <motion.span
                        className="absolute -bottom-0.5 left-0 h-px bg-zinc-600 pointer-events-none"
                        variants={{
                          initial: { width: "0%" },
                          hover: { width: "100%" }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link 
                  to={ROUTES.LOGIN}
                  className={buttons.secondary}
                >
                  Sign In
                </Link>
                <Link 
                  to={ROUTES.SIGNUP}
                  className={buttons.primary}
                >
                  Sign Up
                </Link>
              </React.Fragment>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-900/60 bg-black/95 md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full rounded px-3 py-2 text-left text-base transition-colors ${
                    isActive(link.path)
                      ? "bg-zinc-900 text-zinc-100"
                      : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-zinc-900 pt-4 space-y-2">
                {currentUser ? (
                  <Link 
                    to={ROUTES.PROFILE}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group relative flex items-center justify-center gap-2 w-full rounded-lg border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-black/80 px-3 py-3 text-sm transition-all hover:border-zinc-700/50 overflow-hidden"
                  >
                    {/* Mobile shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    
                    {/* Persistent flies on mobile */}
                    {[...Array(3)].map((_, i) => {
                      const mobileX = [
                        [0, 5, 8, 0],
                        [0, -6, 9, 0],
                        [0, 7, -8, 0]
                      ][i];
                      
                      const mobileY = [
                        [0, 3, 6, 0],
                        [0, -4, 7, 0],
                        [0, 5, -6, 0]
                      ][i];
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-zinc-500 rounded-full"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + (i % 2) * 20}%`,
                          }}
                          animate={{
                            x: mobileX,
                            y: mobileY,
                            opacity: [0.4, 0.7, 0.5, 0.4],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      );
                    })}
                    
                    <span className="relative text-zinc-400 font-medium z-10">
                      {userProfile?.displayName || "Profile"}
                    </span>
                  </Link>
                ) : (
                  <React.Fragment>
                    <Link 
                      to={ROUTES.LOGIN}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${buttons.secondary} block w-full text-center`}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to={ROUTES.SIGNUP}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${buttons.primary} block w-full text-center`}
                    >
                      Sign Up
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Navbar = React.memo(NavbarComponent);
Navbar.displayName = 'Navbar';
