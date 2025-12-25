
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { COLORS, HOTSPOTS, IMAGES } from '../constants';
import { CardType } from '../types';

interface FloatingCardProps {
  type: CardType;
  className?: string;
  image?: string;
  video?: string;
  text?: string;
  parallaxOffset?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  type, 
  className = "", 
  image, 
  text,
  parallaxOffset = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSpot, setActiveSpot] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const responsiveOffset = isMobile ? 0 : parallaxOffset;
  const yParallax = useTransform(scrollY, [0, 2000], [0, responsiveOffset]);

  const getShadowStyle = () => {
    if (!cardRef.current || isMobile) return {};
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = centerX - mouse.x;
    const dy = centerY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const shadowX = (dx / dist) * 8 || 0;
    const shadowY = (dy / dist) * 8 || 0;
    const shadowBlur = 40 + dist / 20;
    const opacity = Math.max(0.02, 0.08 - dist / 5000);

    return {
      boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(60, 56, 51, ${opacity})`,
      borderColor: dist < 400 ? 'rgba(60, 56, 51, 0.08)' : 'rgba(60, 56, 51, 0.04)'
    };
  };

  const renderContent = () => {
    switch (type) {
      case CardType.MASTERPIECE:
        return (
          <div className="relative w-full h-full overflow-hidden group bg-white">
            <motion.img
              src={IMAGES.MASTERPIECE}
              className="w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-105"
              alt="Masterpiece Interior"
            />
            {HOTSPOTS.map((h) => (
              <motion.div
                key={h.id}
                className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center cursor-pointer md:cursor-help group/spot z-10"
                style={{ top: `${h.y}%`, left: `${h.x}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMobile) {
                    setActiveSpot(activeSpot === h.id ? null : h.id);
                  }
                }}
              >
                <motion.div 
                   className="absolute inset-0 rounded-full border border-white/60"
                   animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                   transition={{ duration: 2.5, repeat: Infinity }}
                />
                <div className="w-3 h-3 rounded-full bg-white shadow-md shadow-black/20" />
                <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#3C3833] text-[#F5F2EE] p-4 rounded-xl text-[11px] transition-all transform whitespace-nowrap shadow-xl z-20 
                  ${(activeSpot === h.id || (!isMobile)) ? 'opacity-100 translate-y-[-5px]' : 'opacity-0 pointer-events-none' } 
                  ${!isMobile ? 'lg:group-hover/spot:opacity-100 lg:opacity-0' : ''}`}>
                  <p className="font-bold mb-1 text-[12px]">{h.label}</p>
                  <p className="opacity-70 font-light">{h.description}</p>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3C3833] rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>
        );
      case CardType.TEXTURE:
        return (
          <div className="relative w-full h-full overflow-hidden bg-white">
            <motion.img 
              src={image || IMAGES.TEXTURE} 
              className="w-full h-full object-cover lg:hover:scale-110 transition-transform duration-1000"
              alt="Texture Detail"
              onError={(e) => {
                (e.target as HTMLImageElement).src = IMAGES.TEXTURE;
              }}
            />
          </div>
        );
      case CardType.MOOD:
        return (
          <div className="relative w-full h-full bg-white overflow-hidden group">
            <motion.img 
              src={image || IMAGES.MOOD} 
              className="w-full h-full object-cover opacity-80 mix-blend-multiply lg:group-hover:opacity-100 lg:group-hover:mix-blend-normal transition-all duration-1000"
              alt="Mood Inspiration"
              onError={(e) => {
                (e.target as HTMLImageElement).src = IMAGES.MOOD;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EE]/40 to-transparent" />
          </div>
        );
      case CardType.PHILOSOPHY:
        return (
          <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-12 text-center bg-white">
            <div className="w-8 md:w-12 h-[1px] bg-[#3C3833]/10 mb-6 md:mb-8" />
            <p className="font-serif text-2xl md:text-3xl leading-snug text-[#3C3833] opacity-90 tracking-tight max-w-full md:max-w-[240px]">
              {text}
            </p>
            <div className="w-8 md:w-12 h-[1px] bg-[#3C3833]/10 mt-6 md:mt-8" />
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        y: yParallax,
        backgroundColor: COLORS.SURFACE,
        ...getShadowStyle()
      }}
      className={`w-full rounded-[24px] md:rounded-[32px] border transition-all duration-700 overflow-hidden shadow-sm ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => isMobile && setActiveSpot(null)}
    >
      {renderContent()}
    </motion.div>
  );
};

export default FloatingCard;
