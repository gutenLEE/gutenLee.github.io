
import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const LightTracker: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-overlay"
      animate={{
        // A brighter, wider glow that adds a subtle "sheen" to the white surfaces
        background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.5), transparent 80%)`
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
    />
  );
};

export default LightTracker;
