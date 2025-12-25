
import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const Hero: React.FC = () => {
  const { x, y } = useMousePosition();

  // Dynamic light tracking behind text
  const lightX = x - (window.innerWidth / 2);
  const lightY = y - (window.innerHeight / 2);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Animated Light - Soft Daylight */}
      <motion.div 
        className="absolute w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] rounded-full blur-[150px] md:blur-[250px] pointer-events-none opacity-40 md:opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(245, 242, 238, 0) 70%)',
        }}
        animate={{
          x: lightX * 0.05,
          y: lightY * 0.05,
        }}
        transition={{ type: 'spring', damping: 40 }}
      />

      {/* Main Branding */}
      <div className="relative z-10 text-center select-none w-full">
        <motion.h1 
          className="font-serif text-[30vw] md:text-[24vw] leading-none text-[#3C3833] mb-4 drop-shadow-sm"
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          zvan
        </motion.h1>
        
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.6em] font-light mb-2 md:mb-3 uppercase text-[#3C3833]/60">
            [ 지:반 ]
          </span>
          <h2 className="text-lg md:text-2xl font-light tracking-[0.15em] md:tracking-[0.25em] text-[#3C3833] px-6">
            삶의 환경을 디자인합니다.
          </h2>
          <p className="mt-8 md:mt-10 text-[8px] md:text-[10px] text-[#3C3833]/40 font-light tracking-[0.4em] md:tracking-[0.8em] uppercase">
            The Foundation of Life
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-12 md:h-16 bg-[#3C3833]/10" />
      </motion.div>
    </section>
  );
};

export default Hero;
