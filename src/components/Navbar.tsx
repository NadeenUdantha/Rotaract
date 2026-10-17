import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../lib/data';
import { AVENUE_DETAILS } from '../lib/impactData';

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avenuesOpen, setAvenuesOpen] = useState(false);
  const [mobileAvenuesOpen, setMobileAvenuesOpen] = useState(false);
  const avenuesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAvenuesMouseEnter = () => {
    if (avenuesTimeoutRef.current) clearTimeout(avenuesTimeoutRef.current);
    setAvenuesOpen(true);
  };

  const handleAvenuesMouseLeave = () => {
    avenuesTimeoutRef.current = setTimeout(() => {
      setAvenuesOpen(false);
    }, 180);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Filter out Blog from navigation to match home page
  const heroNavLinks = NAV_LINKS.filter(
    (link) => link.href !== '/blog' && link.label.toLowerCase() !== 'blog'
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex w-full items-center justify-between px-6 py-4 sm:px-12 sm:py-5 pointer-events-auto">
        {/* Subtle top gradient matching home page hero section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent"
        />
        {/* Top-Left: Rotaract White Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/Logo-White-1.png"
            alt="Rotaract Club of UCSC Logo"
            className="h-12 w-auto object-contain sm:h-14 md:h-16 drop-shadow-md brightness-0 invert"
          />
        </Link>

        {/* Top-Right: Editorial Nav Bar matching Home Page */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 font-cormorant text-base tracking-[0.2em] uppercase text-white/90">
            {heroNavLinks.map((link) => {
              const isAvenues = link.label.toLowerCase() === 'avenues';

              if (isAvenues) {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleAvenuesMouseEnter}
                    onMouseLeave={handleAvenuesMouseLeave}
                  >
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-1.5 transition-colors duration-200"
                      style={{ transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(197, 160, 71)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          avenuesOpen ? 'rotate-180 text-[#C5A047]' : ''
                        }`}
                      />
                    </Link>

                    {/* 9 Avenues Dropdown Menu on Hover */}
                    <AnimatePresence>
                      {avenuesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute left-1/2 top-full z-50 mt-2.5 w-60 -translate-x-1/2 overflow-hidden rounded-xl border border-[#C5A047]/30 bg-black/95 p-1.5 shadow-2xl backdrop-blur-2xl"
                        >
                          <div className="grid gap-0.5">
                            {AVENUE_DETAILS.map((avenue) => {
                              const isCurrentAvenue =
                                pathname === `/avenues/${avenue.slug}` ||
                                (avenue.slug === 'club-service' &&
                                  pathname === '/avenues/club-service');
                              return (
                                <Link
                                  key={avenue.slug}
                                  to={`/avenues/${avenue.slug}`}
                                  onClick={() => setAvenuesOpen(false)}
                                  className={`group flex items-center rounded-lg px-3 py-1.5 font-cormorant text-sm tracking-wider uppercase transition-colors ${
                                    isCurrentAvenue
                                      ? 'bg-white/15 text-[#C5A047]'
                                      : 'text-white/85 hover:bg-white/10 hover:text-[#C5A047]'
                                  }`}
                                >
                                  <span className="truncate">{avenue.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="transition-colors duration-200"
                    style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(197, 160, 71)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="flex h-10 w-10 items-center justify-center md:hidden text-white"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center overflow-y-auto bg-black/95 px-8 py-12 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Menu"
            className="absolute right-6 top-6 text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <ul className="flex flex-col gap-5 font-cormorant text-2xl uppercase tracking-[0.2em]">
            {heroNavLinks.map((link) => {
              if (link.label.toLowerCase() === 'avenues') {
                return (
                  <li key={link.href} className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setMobileAvenuesOpen(!mobileAvenuesOpen)}
                      className="flex items-center justify-between text-left transition-colors duration-200 text-white"
                    >
                      <span>Avenues</span>
                      <ChevronDown
                        className={`h-6 w-6 transition-transform duration-200 ${
                          mobileAvenuesOpen ? 'rotate-180 text-[#C5A047]' : ''
                        }`}
                      />
                    </button>
                    {mobileAvenuesOpen && (
                      <div className="flex flex-col gap-3 pl-4 pt-2 font-cormorant text-base tracking-widest text-white/80">
                        {AVENUE_DETAILS.map((avenue) => (
                          <Link
                            key={avenue.slug}
                            to={`/avenues/${avenue.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block hover:text-[#C5A047] transition-colors"
                          >
                            <span>{avenue.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="transition-colors duration-200"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(197, 160, 71)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}