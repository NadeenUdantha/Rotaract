










import React from 'react';
import { SPONSORS } from '../../lib/data';
import { Reveal } from '../ui/Reveal';

export function Sponsors() {
  const list = [...SPONSORS, ...SPONSORS];
  const repeated = [...list, ...list];

  return (
    <section className="grainy-cream-bg w-full py-20 text-ink md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-navy-500">
            Better Together
          </p>
          <h2 className="mt-3 font-cormorant text-4xl font-light uppercase tracking-[0.07em] text-ink md:text-5xl">
            Collaborators
          </h2>
        </Reveal>
      </div>

      <div className="marquee-pause relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#ECECE8] to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#ECECE8] to-transparent sm:w-36" />

        <div className="flex w-max animate-marquee gap-5 sm:gap-6">
          {repeated.map((sponsor, i) => (
            <div
              key={i}
              className="group relative flex h-28 w-60 sm:h-32 sm:w-64 flex-shrink-0 items-center justify-center overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1"
              title={sponsor.name}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading="lazy"
                className="max-h-20 sm:max-h-24 w-auto max-w-[95%] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}