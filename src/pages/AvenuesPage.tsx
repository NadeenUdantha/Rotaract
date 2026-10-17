import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AVENUE_DETAILS } from '../lib/impactData';

export function AvenuesPage() {
  return (
    <main className="grainy-cream-bg min-h-screen text-[#0A0606] transition-colors duration-300">
      {/* ── HERO SECTION WITH INKBLEED ARTWORK ────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-black/10 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 font-cormorant text-xs uppercase tracking-[0.25em] text-[#C5A047]">
                <Sparkles className="h-4 w-4" />
                <span>Rotaract Club of UCSC</span>
              </div>
              <h1 className="mt-4 font-cormorant text-5xl font-light uppercase leading-[1.05] tracking-[0.06em] text-[#0A0606] sm:text-7xl lg:text-[5.5rem]">
                Avenues of <br />
                <span className="font-normal text-[#C5A047]">Service</span>
              </h1>
              <p className="mt-6 max-w-xl font-cormorant text-xl italic tracking-wide text-[#0A0606]/80 sm:text-2xl">
                Nine distinct journeys of fellowship, purpose, and community impact.
              </p>
              <p className="mt-4 max-w-xl font-body text-sm font-light leading-relaxed text-[#0A0606]/70 sm:text-base">
                Each avenue represents a dedicated focus area within the club, led by specialists turning collective youth energy into measurable change. Select an avenue below to enter its dedicated story.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#avenues-directory"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A0606] px-6 py-3 font-cormorant text-xs uppercase tracking-[0.2em] text-white hover:bg-[#C5A047] hover:text-black transition-all"
                >
                  <span>Explore The 9 Avenues</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Hero Inkbleed Image */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="group relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-black/15 bg-white shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/assets/avenues/international_relations.png"
                    alt="Rotaract UCSC Avenues Inkbleed Art"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#C5A047]">
                      09 Distinct Avenues
                    </p>
                    <p className="font-cormorant text-2xl uppercase tracking-wide">
                      Infinite Avenues of Impact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9 AVENUES DIRECTORY CARDS ──────────────────────────────────────── */}
      <section id="avenues-directory" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#C5A047]">
              Directory
            </span>
            <h2 className="mt-2 font-cormorant text-4xl font-light uppercase tracking-[0.06em] text-[#0A0606] sm:text-5xl">
              Select An Avenue
            </h2>
            <p className="mt-3 font-body text-xs font-light text-[#0A0606]/65 sm:text-sm">
              Click any avenue below to visit its separate dedicated page with projects, mandates, and leadership details.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AVENUE_DETAILS.map((avenue) => {
              const Icon = avenue.icon;
              return (
                <Link
                  key={avenue.slug}
                  to={`/avenues/${avenue.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#C5A047]/60 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-[#C5A047]">
                        {avenue.number} / 09
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#0A0606] transition-colors group-hover:bg-[#C5A047] group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="mt-6 font-cormorant text-3xl font-normal uppercase leading-tight text-[#0A0606] transition-colors group-hover:text-[#C5A047]">
                      {avenue.title}
                    </h3>
                    <p className="mt-2 font-cormorant text-base italic text-[#0A0606]/70">
                      “{avenue.tagline}”
                    </p>
                    <p className="mt-4 line-clamp-3 font-body text-xs font-light leading-relaxed text-[#0A0606]/65">
                      {avenue.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 text-xs">
                    <span className="font-mono text-[11px] text-black/50">
                      {avenue.completedProjects} Projects
                    </span>
                    <span className="inline-flex items-center gap-1 font-cormorant text-xs font-semibold uppercase tracking-wider text-[#C5A047] transition-transform group-hover:translate-x-1">
                      <span>View Separate Page</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
export default AvenuesPage;