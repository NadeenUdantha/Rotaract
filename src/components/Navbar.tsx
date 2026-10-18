import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../lib/data';
import { AVENUE_DETAILS } from '../lib/impactData';
import { StaggeredMenu } from './StaggeredMenu';

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [avenuesOpen, setAvenuesOpen] = useState(false);
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
  const mobileMenuItems = heroNavLinks.map((link) => ({
    label: link.label,
    ariaLabel: `Go to ${link.label}`,
    link: link.label === 'Avenues' ? '/avenues/club-service' : link.href,
  }));

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex w-full items-center justify-between px-6 py-4 pointer-events-auto sm:px-12 sm:py-5">
        {/* Subtle top gradient matching home page hero section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent"
        />
        {/* Top-Left: Rotaract White Logo */}
        <Link
          to="/"
          className="hidden items-center gap-3 transition-transform duration-300 hover:scale-105 md:flex"
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
                    <button
                      type="button"
                      onClick={() => setAvenuesOpen((open) => !open)}
                      aria-expanded={avenuesOpen}
                      className="inline-flex items-center gap-1.5 font-cormorant text-base uppercase tracking-[0.2em] text-white/90 transition-colors duration-200"
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
                    </button>

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

      </header>
      <StaggeredMenu
        className="md:hidden"
        items={mobileMenuItems}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/rac_ucsc/' },
          { label: 'Facebook', link: 'https://www.facebook.com/RotaractUCSC/' },
          { label: 'LinkedIn', link: 'https://lk.linkedin.com/company/rotaractucsc' },
        ]}
      />
    </>
  );
}