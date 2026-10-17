import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AVENUE_DETAILS } from '../../lib/impactData';

interface AvenueCardProps {
  avenue: typeof AVENUE_DETAILS[number];
  index: number;
  totalAvenues: number;
  scrollYProgress: any;
}

interface ThreePhotoFrameProps {
  photos: {
    main: string;
    top: string;
    bottom: string;
  };
  title: string;
  scrollYProgress: any;
  start: number;
  end: number;
  isEven: boolean;
}

function AvenueThreePhotoFrame({ photos, title, scrollYProgress, start, end }: ThreePhotoFrameProps) {
  // Parallax transforms based on scroll
  const topY = useTransform(scrollYProgress, [start, end], [20, -25]);
  const topRotate = useTransform(scrollYProgress, [start, end], [-1.5, 2]);

  const bottomY = useTransform(scrollYProgress, [start, end], [-20, 25]);
  const bottomRotate = useTransform(scrollYProgress, [start, end], [1.5, -2]);

  const mainY = useTransform(scrollYProgress, [start, end], [8, -8]);
  const mainScale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.97, 1, 1.02]);

  return (
    <div className="relative flex w-full max-w-[560px] items-center justify-center py-6 sm:py-8">
      {/* 3-Photo Layered Collage Frame */}
      <div className="relative w-full max-w-[500px] aspect-[1.25/1] flex items-center justify-center">
        {/* Center / Main Photo (Group with Banner) */}
        <motion.div
          style={{ y: mainY, scale: mainScale }}
          className="relative z-10 w-[82%] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <img
              src={photos.main}
              alt={`${title} main`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-15 transition-opacity duration-500" />
          </motion.div>
        </motion.div>

        {/* Top-Right Floating Photo (Scroll Parallax + Ambient Motion) */}
        <motion.div
          style={{ y: topY, rotate: topRotate }}
          className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 z-20 w-[52%] aspect-[2.25/1] rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-white/25 hover:ring-gold/70 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] hover:shadow-[0_25px_50px_rgba(197,160,71,0.3)] transition-all duration-300 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            className="h-full w-full"
          >
            <img
              src={photos.top}
              alt={`${title} highlight top`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500" />
          </motion.div>
        </motion.div>

        {/* Bottom-Left Floating Photo (Scroll Parallax + Ambient Motion) */}
        <motion.div
          style={{ y: bottomY, rotate: bottomRotate }}
          className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-4 z-20 w-[50%] aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-white/25 hover:ring-gold/70 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] hover:shadow-[0_25px_50px_rgba(197,160,71,0.3)] transition-all duration-300 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut', delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="h-full w-full"
          >
            <img
              src={photos.bottom}
              alt={`${title} highlight bottom`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function AvenueCard({ avenue, index, totalAvenues, scrollYProgress }: AvenueCardProps) {
  const isEven = index % 2 === 1;
  const avenueNumber = String(index + 1).padStart(2, '0');
  const [firstWord, ...restWords] = avenue.title.split(' ');
  const secondLine = restWords.join(' ');

  // Each avenue occupies an equal slice of the scroll container
  const step = 1 / totalAvenues;
  const start = index * step;
  const end = (index + 1) * step;

  // Calculate fade in and fade out windows with smooth overlap
  const fadeInStart = index === 0 ? 0 : start;
  const fadeInEnd = index === 0 ? 0.05 : start + step * 0.28;
  const fadeOutStart = index === totalAvenues - 1 ? 0.98 : end - step * 0.28;
  const fadeOutEnd = index === totalAvenues - 1 ? 1 : end;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [index === 0 ? 1 : 0, 1, 1, index === totalAvenues - 1 ? 1 : 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [index === 0 ? 1 : 0.95, 1, 1, index === totalAvenues - 1 ? 1 : 1.05]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [index === 0 ? 0 : 20, 0, 0, index === totalAvenues - 1 ? 0 : -20]
  );

  const pointerEvents = useTransform(opacity, (val: number) => (val > 0.2 ? 'auto' : 'none'));

  const renderImage = () => {
    if (avenue.photoFrame) {
      return (
        <AvenueThreePhotoFrame
          photos={avenue.photoFrame}
          title={avenue.title}
          scrollYProgress={scrollYProgress}
          start={start}
          end={end}
          isEven={isEven}
        />
      );
    }

    return (
      <div className="relative aspect-[16/10] w-full max-w-[560px] overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        <img
          src={avenue.image}
          alt={avenue.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    );
  };

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        pointerEvents,
      }}
      className="absolute inset-0 flex h-full w-full items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 will-change-[opacity,transform]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
        {!isEven ? (
          <>
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <h3
                style={{ color: 'rgb(197, 160, 71)' }}
                className="font-cormorant text-2xl font-light uppercase leading-[1.08] tracking-[0.06em] sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {firstWord}
                {secondLine && (
                  <>
                    <br />
                    <span>{secondLine}</span>
                  </>
                )}
              </h3>

              <p className="mt-3 font-cormorant text-base italic tracking-wide text-white/75 sm:text-lg">
                {avenue.tagline}
              </p>

              <p className="mt-5 max-w-md font-body text-xs font-light leading-relaxed text-white/65 sm:text-sm md:text-base">
                {avenue.description}
              </p>

              <div className="mt-6 flex items-baseline font-cormorant text-5xl font-light sm:text-6xl md:text-7xl">
                <span style={{ color: 'rgb(197, 160, 71)' }}>{avenueNumber}</span>
                <span className="ml-3 font-mono text-xs font-normal tracking-widest text-white/40 sm:text-sm">
                  / 0{totalAvenues}
                </span>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex items-center justify-center lg:col-span-6 lg:justify-end">
              {renderImage()}
            </div>
          </>
        ) : (
          <>
            {/* Left: Image */}
            <div className="order-2 flex items-center justify-center lg:order-1 lg:col-span-6 lg:justify-start">
              {renderImage()}
            </div>

            {/* Right: Text Content */}
            <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-6 lg:pl-6">
              <h3
                style={{ color: 'rgb(197, 160, 71)' }}
                className="font-cormorant text-2xl font-light uppercase leading-[1.08] tracking-[0.06em] sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {firstWord}
                {secondLine && (
                  <>
                    <br />
                    <span>{secondLine}</span>
                  </>
                )}
              </h3>

              <p className="mt-3 font-cormorant text-base italic tracking-wide text-white/75 sm:text-lg">
                {avenue.tagline}
              </p>

              <p className="mt-5 max-w-md font-body text-xs font-light leading-relaxed text-white/65 sm:text-sm md:text-base">
                {avenue.description}
              </p>

              <div className="mt-6 flex items-baseline font-cormorant text-5xl font-light sm:text-6xl md:text-7xl">
                <span style={{ color: 'rgb(197, 160, 71)' }}>{avenueNumber}</span>
                <span className="ml-3 font-mono text-xs font-normal tracking-widest text-white/40 sm:text-sm">
                  / 0{totalAvenues}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function Avenues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalAvenues = AVENUE_DETAILS.length; // 8

  // Scroll track for pinned fading sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      id="avenues"
      className="grainy-cream-bg relative z-20 h-[500vh] w-full"
    >
      {/* Sticky Fullscreen Stage */}
      <section
        aria-label="Eight Avenues of Service"
        className="sticky top-0 flex h-[100dvh] w-full flex-col justify-center overflow-hidden bg-black text-white select-none"
      >
        {/* ── BACKGROUND VIDEO LAYER ─── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover filter blur-[2px] brightness-[42%] contrast-[110%]"
          />
          {/* Subtle vignette and dark scrim overlay to ensure clean contrast */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
        </div>

        {/* ── STACKED FADING AVENUES ─────────────── */}
        <div className="relative z-20 h-[80vh] w-full">
          {AVENUE_DETAILS.map((avenue, index) => (
            <AvenueCard
              key={avenue.slug}
              avenue={avenue}
              index={index}
              totalAvenues={totalAvenues}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Avenues;

