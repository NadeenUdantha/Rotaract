import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../lib/data';

const projectRoutes: Record<string, string> = {
  p1: 'book-of-hope',
  p2: 'life-drops',
  p3: 'books-beyond',
};

const wrapIndex = (index: number) => (index + PROJECTS.length) % PROJECTS.length;

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  const nextProject = useCallback(() => {
    setActiveIndex((index) => wrapIndex(index + 1));
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(nextProject, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, nextProject]);

  const relativePosition = (index: number) => {
    const difference = index - activeIndex;
    if (difference > PROJECTS.length / 2) return difference - PROJECTS.length;
    if (difference < -PROJECTS.length / 2) return difference + PROJECTS.length;
    return difference;
  };

  return (
    <section
      id="projects"
      className="relative h-[100dvh] min-h-[620px] w-full overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative z-20 flex h-full flex-col justify-center px-8 py-20 sm:px-14 lg:px-16 lg:py-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold sm:text-xs">
            Latest projects
          </span>
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">
              {activeProject.status} / {activeProject.category}
            </p>
            <h2 className="mt-5 font-cormorant text-5xl font-light uppercase leading-[0.96] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
              {activeProject.name}
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/65 sm:text-base">
              {activeProject.description}
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Link
                to={`/projects/${projectRoutes[activeProject.id]}`}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-white"
              >
                Explore project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <span className="font-mono text-xs tracking-widest text-white/35">{activeProject.date}</span>
            </div>
          </motion.div>
        </div>

        <div className="relative flex h-full min-h-[420px] items-center justify-center px-8 pb-20 pt-4 sm:px-16 lg:pb-0 lg:pt-0">
          <div className="relative h-[58vh] max-h-[600px] min-h-[350px] w-full max-w-[500px]">
            {PROJECTS.map((project, index) => {
              const position = relativePosition(index);
              const isActive = position === 0;
              const isBehind = Math.abs(position) > 1;

              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    x: position === 0 ? 0 : position < 0 ? -68 : 68,
                    y: position === 0 ? 0 : Math.abs(position) > 1 ? 14 : 8,
                    scale: position === 0 ? 1 : isBehind ? 0.82 : 0.92,
                    rotate: position === 0 ? 0 : position < 0 ? -3 : 3,
                    opacity: isBehind ? 0.38 : position === 0 ? 1 : 0.72,
                    zIndex: isActive ? 30 : position < 0 ? 20 : 10,
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.8 }}
                  className="absolute inset-0 h-full w-full overflow-hidden bg-ink shadow-2xl"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className={`block h-full w-full object-cover ${isActive ? '' : 'brightness-50 grayscale-[35%]'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 lg:bottom-16">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Show ${project.name}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-9 bg-gold' : 'w-2 bg-white/35 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
