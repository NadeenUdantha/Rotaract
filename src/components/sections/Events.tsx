import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, CalendarDays } from 'lucide-react';
import { EVENTS, type EventItem } from '../../lib/data';

/* ─────────────────────────────────────────────────────────────────────────
   Live countdown
───────────────────────────────────────────────────────────────────────── */
function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, +new Date(target) - Date.now())
  );
  useEffect(() => {
    const id = setInterval(
      () => setRemaining(Math.max(0, +new Date(target) - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [target]);
  return {
    days:    Math.floor(remaining / 86400000),
    hours:   Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000)  / 60000),
    seconds: Math.floor((remaining % 60000)    / 1000),
  };
}

/* ── Countdown cell ───────────────────────────────────────────────────── */
function CountdownCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center border border-white/10 px-3 py-2 sm:px-4 sm:py-3">
      <span
        className="font-cormorant text-2xl font-light tabular-nums leading-none sm:text-3xl"
        style={{ color: 'rgb(197,160,71)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Single timeline item
   isLeft  → card on left,  slides in from left
   !isLeft → card on right, slides in from right
───────────────────────────────────────────────────────────────────────── */
function TimelineItem({
  event,
  index,
}: {
  event: EventItem;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  const cardVariants = {
    hidden:  { opacity: 0, x: isLeft ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileCardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const nodeEl = (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative z-10 flex h-9 w-9 items-center justify-center shrink-0"
    >
      {inView && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: '1.5px solid rgb(197,160,71)' }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span
        className="h-3.5 w-3.5 rounded-full ring-2 ring-[rgb(197,160,71)] ring-offset-2 ring-offset-[#0c0c0c]"
        style={{
          backgroundColor: 'rgb(197,160,71)',
          boxShadow: inView
            ? '0 0 0 2px #0c0c0c, 0 0 0 4px rgb(197,160,71), 0 0 16px 4px rgba(197,160,71,0.4)'
            : '0 0 0 2px #0c0c0c, 0 0 0 4px rgba(197,160,71,0.4)',
        }}
      />
    </motion.div>
  );

  return (
    <div ref={ref} className="relative">
      {/* ── Mobile layout (<md): Left axis with full-width cards ── */}
      <div className="flex items-start gap-3 sm:gap-6 md:hidden">
        <div className="flex flex-col items-center pt-6">
          {nodeEl}
        </div>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={mobileCardVariants}
          className="w-full flex-1 min-w-0"
        >
          <EventCard event={event} index={index} />
        </motion.div>
      </div>

      {/* ── Desktop layout (md+): Centered alternating timeline ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-start">
        {/* Left slot */}
        <div className={isLeft ? 'pr-6 sm:pr-10 flex justify-end' : ''}>
          {isLeft && (
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="w-full max-w-md"
            >
              <EventCard event={event} index={index} />
            </motion.div>
          )}
        </div>

        {/* Centre axis node */}
        <div className="flex flex-col items-center pt-6">
          {nodeEl}
        </div>

        {/* Right slot */}
        <div className={!isLeft ? 'pl-6 sm:pl-10 flex justify-start' : ''}>
          {!isLeft && (
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="w-full max-w-md"
            >
              <EventCard event={event} index={index} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Event card interior (shared by both sides) ───────────────────────── */
function EventCard({ event, index }: { event: EventItem; index: number }) {
  const { days, hours, minutes, seconds } = useCountdown(event.targetDate);
  return (
    <article className="group overflow-hidden rounded-2xl border border-gold/20 bg-black/70 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-500 hover:border-gold/45 hover:shadow-[0_16px_50px_rgba(197,160,71,0.18)]">
      {/* Poster Image (unobstructed full artwork) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      {/* Details & Live Countdown below poster */}
      <div className="p-5 sm:p-6">
        {/* Header row: Event index & Avenue pill */}
        <div className="mb-3.5 flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
            Event {String(index + 1).padStart(2, '0')}
          </span>
          {event.avenue && (
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              {event.avenue}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-cormorant text-2xl font-light uppercase leading-[1.1] tracking-[0.05em] text-white sm:text-3xl">
          {event.title}
        </h3>

        {/* Subtitle */}
        {event.subtitle && (
          <p className="mt-1 font-body text-xs font-light tracking-wide text-white/70">
            {event.subtitle}
          </p>
        )}

        {/* Date & Location */}
        <div className="my-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-y border-white/10 py-3">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/85">
            <CalendarDays className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'rgb(197,160,71)' }} />
            {event.date}
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'rgb(197,160,71)' }} />
            {event.location}
          </span>
        </div>

        {/* Live Countdown */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          <CountdownCell value={days}    label="Days" />
          <CountdownCell value={hours}   label="Hrs"  />
          <CountdownCell value={minutes} label="Min"  />
          <CountdownCell value={seconds} label="Sec"  />
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────────────────── */
export function Events() {
  /* Scroll-driven progress line */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden scroll-mt-24"
      style={{ backgroundColor: '#0c0c0c' }}
    >
      <div className="pointer-events-none absolute -right-40 top-24 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gold/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-36">

        {/* ── Section header ── */}
        <div className="mb-14 sm:mb-20 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[rgb(197,160,71)]">
            ◆ &nbsp;What's Next
          </span>
          <h2 className="mt-4 font-cormorant text-4xl font-light uppercase leading-[1.06] tracking-[0.07em] text-white sm:text-5xl md:text-6xl">
            Upcoming{' '}
            <span style={{ color: 'rgb(197,160,71)' }}>Events</span>
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Axis track (background) */}
          <div
            className="absolute left-[18px] sm:left-[22px] md:left-1/2 top-0 -translate-x-1/2 w-px h-full"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />

          {/* Axis progress fill */}
          <motion.div
            className="absolute left-[18px] sm:left-[22px] md:left-1/2 top-0 -translate-x-1/2 w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, rgb(197,160,71), rgba(197,160,71,0.15))',
              scaleY: lineScaleY,
              height: '100%',
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
            {EVENTS.map((event, i) => (
              <TimelineItem key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* Bottom cap dot */}
          <div
            className="absolute bottom-0 left-[18px] sm:left-[22px] md:left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
            style={{ backgroundColor: 'rgb(197,160,71)', opacity: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
}