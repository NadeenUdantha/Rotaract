import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from './CountUp';

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done &&
      <motion.div
        role="status"
        aria-label="Loading Rotaract Club of UCSC"
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black px-6 text-white"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>

          <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex w-full max-w-xs flex-col items-center text-center">

            <img src="/Logo-White-1.png" alt="Rotaract Club of UCSC" className="h-16 w-auto object-contain opacity-90" />
            <h1 aria-label="Create Lasting Impact" className="mt-4 flex flex-row font-cormorant text-2xl font-semibold uppercase italic leading-[0.9] tracking-[0.06em] text-white sm:text-3xl gap-2">
              {['Create', 'Lasting', 'Impact'].map((word, index) =>
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.48, ease: 'easeOut' }}>
                {word}
              </motion.span>)}
            </h1>

          </motion.div>

          {/* Bottom-right loading counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-8 right-8 flex items-baseline gap-0.5 sm:bottom-10 sm:right-10"
          >
            <CountUp
              from={0}
              to={100}
              duration={1.4}
              delay={0}
              suffix="%"
              className="font-cormorant text-4xl font-light tracking-wide text-gold sm:text-5xl"
            />
          </motion.div>

        </motion.div>
      }
    </AnimatePresence>);

}