
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  
  const smoothY = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 40,
    mass: 1.5,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Use ResizeObserver for more robust height detection
    // This fixes the issue where the footer "disappears" because height isn't updated after images/content load
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === scrollRef.current) {
          setContentHeight(entry.target.scrollHeight);
        }
      }
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const y = useTransform(smoothY, [0, 1], [0, -(contentHeight - window.innerHeight)]);

  // On mobile, we use native scrolling to avoid width and jitter issues
  if (isMobile) {
    return (
      <div className="w-full relative overflow-x-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-x-hidden">
      <div style={{ height: contentHeight }} className="pointer-events-none" />
      <motion.div
        ref={scrollRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SmoothScroll;
