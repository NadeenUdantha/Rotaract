import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, HeartHandshake, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../lib/data';

const storyRoutes: Record<string, string> = {
  b1: 'leadership-journey',
  b2: 'youth-community',
  b3: 'life-drops',
};

const storyIcons = [BookOpen, HeartHandshake, Lightbulb];
const wrapIndex = (index: number) => (index + BLOG_POSTS.length) % BLOG_POSTS.length;

export function Blog() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStory = BLOG_POSTS[activeIndex];

  const nextStory = useCallback(() => {
    setActiveIndex((index) => wrapIndex(index + 1));
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(nextStory, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, nextStory]);

  const getPosition = (index: number) => {
    const difference = index - activeIndex;
    return difference > BLOG_POSTS.length / 2
      ? difference - BLOG_POSTS.length
      : difference < -BLOG_POSTS.length / 2
        ? difference + BLOG_POSTS.length
        : difference;
  };

  return (
    <section id="blog" className="grainy-cream-bg relative w-full overflow-hidden px-4 py-10 text-ink sm:px-6 md:py-16">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-48 bottom-0 h-[24rem] w-[24rem] rounded-full bg-gold/5 blur-3xl" />
      <div
        className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl flex-col overflow-hidden rounded-[2.5rem] border border-gold/20 bg-ink/90 backdrop-blur-xl lg:h-[680px] lg:flex-row lg:rounded-[4rem]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative z-20 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-ink px-6 py-8 sm:min-h-[450px] sm:px-10 md:px-16 lg:h-full lg:w-[40%] lg:px-16 lg:py-0">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
          <div className="relative flex h-full w-full items-center justify-center lg:justify-start">
            {BLOG_POSTS.map((post, index) => {
              const Icon = storyIcons[index % storyIcons.length];
              const position = getPosition(index);
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={post.id}
                  type="button"
                  animate={{ y: position * 65, opacity: 1 - Math.min(Math.abs(position), 2) * 0.25 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute flex max-w-full items-center gap-3 rounded-full border px-5 py-3.5 text-left transition-colors sm:gap-4 sm:px-8 sm:py-4 ${isActive ? 'z-10 border-cream bg-cream text-ink' : 'border-white/20 text-white/65 hover:border-white/45 hover:text-white'}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-navy-500' : 'text-white/45'}`} />
                  <span className="truncate text-[11px] font-medium uppercase tracking-[0.1em] sm:text-xs">{post.category}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-white/10 bg-cream/5 px-6 py-12 sm:min-h-[600px] sm:px-10 md:px-12 lg:h-full lg:min-h-0 lg:border-l lg:border-t-0 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/25" />
          <div className="relative flex h-[360px] w-full max-w-[280px] items-center justify-center sm:h-[420px] sm:max-w-[330px]">
          <motion.article
            key={activeStory.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="relative z-20 h-full w-full overflow-hidden rounded-[2rem] border-4 border-cream bg-ink shadow-2xl sm:rounded-[2.8rem] sm:border-8"
          >
            <img src={activeStory.image} alt={activeStory.title} className="block h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8">
              <span className="mb-2 inline-flex max-w-full rounded-full border border-white/30 bg-cream px-3 py-1 text-[9px] font-medium uppercase tracking-[0.13em] text-ink sm:mb-3 sm:text-[10px]">{activeStory.category} · {activeStory.readingTime}</span>
              <h2 className="font-cormorant text-2xl font-light uppercase leading-tight tracking-[0.05em] text-white sm:text-4xl">{activeStory.title}</h2>
              <p className="mt-2 max-w-xl text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">{activeStory.excerpt}</p>
              <Link to={`/blog/${storyRoutes[activeStory.id]}`} className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-white sm:mt-4 sm:text-xs">Read story <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
