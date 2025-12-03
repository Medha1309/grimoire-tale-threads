import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../config/routes";
import { typography } from "../utils/themeClasses";

const FooterComponent: React.FC = () => {
  const [lanternHover, setLanternHover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number = 0;
    let lastProgress = 0;
    const threshold = 0.02;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = Math.min(scrolled / documentHeight, 1);
        
        if (Math.abs(progress - lastProgress) > threshold) {
          setScrollProgress(progress);
          lastProgress = progress;
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseEnter = React.useCallback(() => setLanternHover(true), []);
  const handleMouseLeave = React.useCallback(() => setLanternHover(false), []);

  return (
    <footer 
      className="relative border-t border-zinc-900/60 bg-black/90 text-zinc-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flickering lanterns at bottom sides */}
      {[0, 1].map((side) => (
        <motion.div
          key={side}
          className="absolute bottom-20 pointer-events-none"
          style={{ [side === 0 ? 'left' : 'right']: '2rem' }}
          animate={{
            opacity: lanternHover ? [0.7, 0.9, 0.7] : [Math.max(0.2, scrollProgress * 0.7), Math.max(0.3, scrollProgress * 0.9), Math.max(0.2, scrollProgress * 0.7)],
            scale: lanternHover ? 1.1 : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, delay: side * 0.5 }}
        >
          <svg width="50" height="70" viewBox="0 0 50 70" className="drop-shadow-2xl">
            <defs>
              <radialGradient id={`lanternGlow${side}`} cx="50%" cy="70%">
                <stop offset="0%" stopColor="#fffacd" stopOpacity={lanternHover ? 0.9 : Math.max(0.2, scrollProgress * 0.9)} />
                <stop offset="50%" stopColor="#ffa500" stopOpacity={lanternHover ? 0.7 : Math.max(0.15, scrollProgress * 0.7)} />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Lantern body */}
            <rect x="10" y="15" width="30" height="40" rx="3" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />
            <rect x="12" y="17" width="26" height="36" rx="2" fill="#2a2a2a" opacity="0.5" />
            <ellipse cx="25" cy="35" rx="15" ry="13" fill={`url(#lanternGlow${side})`} />
            {/* Handle */}
            <rect x="22" y="8" width="6" height="7" fill="#1a1a1a" />
            <path d="M25 8 Q18 2 25 2 Q32 2 25 8" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" />
            {/* Bottom */}
            <rect x="10" y="55" width="30" height="3" rx="1" fill="#0a0a0a" />
          </svg>
        </motion.div>
      ))}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <div className={`${typography.brand} text-2xl tracking-[0.3em]`}>
              GRIMOIRE
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              Immersive horror stories that haunt your imagination.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-zinc-600 transition hover:text-zinc-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-600 transition hover:text-zinc-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-600 transition hover:text-zinc-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={ROUTES.STORIES} className="transition hover:text-zinc-300">
                  Browse Stories
                </Link>
              </li>
              <li>
                <Link to={ROUTES.STORIES} className="transition hover:text-zinc-300">
                  Trending
                </Link>
              </li>
              <li>
                <Link to={ROUTES.STORIES} className="transition hover:text-zinc-300">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to={ROUTES.STORIES} className="transition hover:text-zinc-300">
                  Featured Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={ROUTES.ABOUT} className="transition hover:text-zinc-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="transition hover:text-zinc-300">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-zinc-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-zinc-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-zinc-600">
              Get the latest horror stories delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="rounded border border-zinc-800 bg-black/60 px-3 py-2 text-sm text-zinc-300 outline-none transition placeholder:text-zinc-700 focus:border-zinc-700"
              />
              <button
                type="submit"
                className="rounded bg-red-900 px-3 py-2 text-sm text-zinc-100 transition hover:bg-red-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-900 pt-8 text-center text-sm">
          <p className="text-zinc-600">
            © {new Date().getFullYear()} <span className="text-gothic-blood">GRIMOIRE</span>. All rights reserved. Where nightmares are written.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);
Footer.displayName = 'Footer';
