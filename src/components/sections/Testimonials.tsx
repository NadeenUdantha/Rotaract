import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../../lib/data';
import { Reveal } from '../ui/Reveal';
import { Blob } from '../ui/Decor';

const TESTIMONIAL_NOISE =
  "data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.42'/%3E%3C/svg%3E";

export function Testimonials() {
  const [selectedRole, setSelectedRole] = useState<'all' | 'President' | 'IPP' | 'Secretary'>('all');

  const filtered =
    selectedRole === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.role === selectedRole);

  return (
    <section
      id="voices"
      className="relative w-full overflow-hidden bg-[#ECECE8] py-20 text-ink transition-colors duration-300 dark:bg-[#0c0f17] dark:text-white md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply dark:opacity-10"
        style={{ backgroundImage: `url("${TESTIMONIAL_NOISE}")`, backgroundSize: '180px 180px' }}
      />
      <Blob className="-left-10 top-10 h-80 w-80 bg-gold/15 dark:bg-gold/10" />
      <Blob className="-right-10 bottom-10 h-80 w-80 bg-navy-500/10 dark:bg-navy-400/15" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-navy-800 shadow-sm dark:text-gold">
            <Quote className="h-3.5 w-3.5 text-gold" />
            Voices of Rotaract
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink dark:text-white md:text-5xl">
            Words from Our Leadership
          </h2>
          <p className="mt-3 font-body text-base text-ink/70 dark:text-white/65 md:text-lg">
            Guiding the Rotaract Club of UCSC with shared vision, purpose, and dedicated service.
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setSelectedRole('all')}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedRole === 'all'
                  ? 'bg-ink text-white shadow dark:bg-gold dark:text-ink'
                  : 'text-ink/65 hover:text-ink dark:text-white/65 dark:hover:text-white'
              }`}
            >
              All Voices
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('President')}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedRole === 'President'
                  ? 'bg-ink text-white shadow dark:bg-gold dark:text-ink'
                  : 'text-ink/65 hover:text-ink dark:text-white/65 dark:hover:text-white'
              }`}
            >
              President
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('IPP')}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedRole === 'IPP'
                  ? 'bg-ink text-white shadow dark:bg-gold dark:text-ink'
                  : 'text-ink/65 hover:text-ink dark:text-white/65 dark:hover:text-white'
              }`}
            >
              IPP
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('Secretary')}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedRole === 'Secretary'
                  ? 'bg-ink text-white shadow dark:bg-gold dark:text-ink'
                  : 'text-ink/65 hover:text-ink dark:text-white/65 dark:hover:text-white'
              }`}
            >
              Secretary
            </button>
          </div>
        </Reveal>

        {/* Leadership Cards Showcase */}
        <div
          className={`mt-12 grid gap-8 ${
            filtered.length === 1
              ? 'mx-auto max-w-2xl grid-cols-1'
              : filtered.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((member) => {
              const isPresident = member.role === 'President';
              const isIPP = member.role === 'IPP';

              return (
                <motion.div
                  key={member.role}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white/75 p-8 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] md:p-10"
                >
                  {/* Subtle decorative glow */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500 opacity-25 group-hover:opacity-45 ${
                      isPresident
                        ? 'bg-gold'
                        : isIPP
                        ? 'bg-amber-500'
                        : 'bg-rose-400'
                    }`}
                  />

                  <div>
                    {/* Header: Quote icon & Role badge */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110">
                        <Quote className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-navy-800 shadow-xs dark:text-gold">
                        <Sparkles className="h-3 w-3 text-gold" />
                        {member.role}
                      </span>
                    </div>

                    {/* Quote text */}
                    <blockquote className="mt-7 font-cormorant text-xl font-medium leading-relaxed text-ink dark:text-white/95 md:text-2xl italic">
                      “{member.quote}”
                    </blockquote>
                  </div>

                  {/* Leader details footer */}
                  <div className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6 dark:border-white/10">
                    <div className="relative shrink-0">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-gold/40 shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow ${
                          isPresident
                            ? 'bg-navy-600 text-white dark:bg-gold dark:text-ink'
                            : isIPP
                            ? 'bg-amber-600 text-white dark:bg-amber-400 dark:text-ink'
                            : 'bg-rose-600 text-white dark:bg-rose-400 dark:text-ink'
                        }`}
                      >
                        {isPresident ? 'P' : isIPP ? 'IPP' : 'S'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                        {member.name}
                      </h3>
                      <p className="font-body text-sm font-medium text-ink/65 dark:text-white/60">
                        {member.subtitle ?? `${member.role} 2025/26 • Rotaract Club of UCSC`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}