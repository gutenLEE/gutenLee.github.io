
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingCard from './components/FloatingCard';
import SmoothScroll from './components/SmoothScroll';
import LightTracker from './components/LightTracker';
import ProjectShowcase from './components/ProjectShowcase';
import ContactView from './components/ContactView';
import { CardType } from './types';
import { IMAGES, COLORS, CONTACT_INFO } from './constants';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock scroll when overlay is open
  useEffect(() => {
    if (showShowcase || showContact || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showShowcase, showContact, isMenuOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
      }
    })
  };

  const handleNavClick = (item: string) => {
    if (item === 'Spaces') {
      setShowShowcase(true);
      setShowContact(false);
      setIsMenuOpen(false);
    } else if (item === 'Contact') {
      setShowContact(true);
      setShowShowcase(false);
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
      setShowContact(false);
      setShowShowcase(false);
    }
  };

  return (
    <div className="bg-[#F5F2EE] min-h-screen text-[#3C3833] selection:bg-[#3C3833] selection:text-[#F5F2EE] overflow-x-hidden">
      {/* Global Interactive Elements */}
      <LightTracker />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[100] bg-[#F5F2EE] flex flex-col justify-center items-center px-10"
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 p-4 focus:outline-none"
            >
              <div className="relative w-8 h-8">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#3C3833] rotate-45" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#3C3833] -rotate-45" />
              </div>
            </button>

            <nav className="flex flex-col gap-12 text-center">
              {['Philosophy', 'Spaces', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  custom={i}
                  variants={linkVariants}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className="font-serif text-5xl md:text-7xl tracking-tighter hover:italic transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-16 text-[10px] tracking-[0.4em] uppercase"
            >
              zvan — the foundation of life
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShowcase && (
          <ProjectShowcase onBack={() => setShowShowcase(false)} />
        )}
        {showContact && (
          <ContactView onBack={() => setShowContact(false)} />
        )}
      </AnimatePresence>

      {/* Main Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-40 flex justify-between items-center bg-[#F5F2EE]/10 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent">
        <button
          onClick={() => { setShowContact(false); setShowShowcase(false); }}
          className="font-serif text-2xl md:text-3xl tracking-tighter text-[#3C3833] focus:outline-none"
        >
          zvan
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-medium text-[#3C3833]/80">
          <a href="#" className="hover:text-[#3C3833] transition-colors">Philosophy</a>
          <button
            onClick={() => setShowShowcase(true)}
            className="hover:text-[#3C3833] transition-colors uppercase"
          >
            Spaces
          </button>
          <button
            onClick={() => setShowContact(true)}
            className="hover:text-[#3C3833] transition-colors uppercase"
          >
            Contact
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col items-end gap-1.5 p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-[#3C3833]"
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-4 h-[1px] bg-[#3C3833]"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
            className="h-[1px] bg-[#3C3833]"
          />
        </button>
      </nav>

      <SmoothScroll>
        <div className="w-full relative flex flex-col items-center">
          <Hero />

          {/* Interactive Grid Section */}
          <section className="relative w-full px-5 md:px-20 py-20 md:py-40 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-12 gap-8 md:gap-10 relative">

              {/* Main Masterpiece */}
              <FloatingCard
                type={CardType.MASTERPIECE}
                parallaxOffset={-40}
                className="col-span-12 lg:col-span-8 h-[35vh] md:h-[75vh] z-20 shadow-lg md:shadow-none"
              />

              {/* Texture Card */}
              <FloatingCard
                type={CardType.TEXTURE}
                parallaxOffset={80}
                image={IMAGES.TEXTURE}
                className="col-span-12 md:col-span-4 h-[30vh] md:h-[45vh] md:-mt-24 z-10"
              />

              {/* Mood Card */}
              <FloatingCard
                type={CardType.MOOD}
                parallaxOffset={-120}
                image={IMAGES.MOOD}
                className="col-span-12 md:col-span-5 h-[30vh] md:h-[55vh] md:ml-16 z-30"
              />

              <div className="hidden md:block col-span-12 md:col-span-2" />

              {/* Philosophy Card */}
              <FloatingCard
                type={CardType.PHILOSOPHY}
                parallaxOffset={60}
                text="지반: 삶의 환경을 디자인합니다"
                className="col-span-12 md:col-span-4 h-[35vh] md:h-[65vh] z-10 md:-mt-48"
              />

              {/* Decorative background text */}
              <div className="absolute top-[10%] right-[-5%] opacity-[0.03] md:opacity-[0.05] select-none pointer-events-none overflow-hidden">
                <span className="font-serif text-[30vw] md:text-[18vw] leading-none italic text-[#3C3833]">tranquility</span>
              </div>
            </div>
          </section>

          <div className="w-full py-40 md:py-80 flex flex-col items-center text-center px-6">
            <motion.p
              className="font-serif text-4xl md:text-7xl leading-tight md:leading-[1.2] mb-12 md:mb-16 font-light text-[#3C3833] max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              우리는 가장 단단한 기초 위에서<br className="hidden md:block" />
              당신의 감각을 채우는 <span className="italic font-normal">공간</span>을 짓습니다.
            </motion.p>

            <motion.button
              onClick={() => setShowShowcase(true)}
              className="px-10 py-5 border border-[#3C3833]/20 rounded-full hover:bg-[#3C3833] hover:text-[#F5F2EE] transition-all duration-700 uppercase tracking-[0.3em] text-[10px] font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore the Essence
            </motion.button>
          </div>

          {/* Footer */}
          <footer className="w-full px-6 md:px-20 py-20 md:py-32 border-t border-[#3C3833]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-16 bg-[#EFEDE9]">
            <div className="text-left">
              <span className="font-serif text-5xl md:text-6xl mb-4 md:mb-6 block tracking-tighter text-[#3C3833]">zvan</span>
              <p className="text-[9px] md:text-[10px] opacity-40 tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#3C3833]">The Foundation of Life &copy; 2024</p>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-10 md:gap-20 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] opacity-60">
              <div>
                <p className="font-bold mb-4 md:mb-6 opacity-100 text-[#3C3833]">CONNECTION</p>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a
                      href={CONTACT_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3C3833] transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-4 md:mb-6 opacity-100 text-[#3C3833]">STUDIO</p>
                <button onClick={() => setShowContact(true)} className="text-left hover:underline">
                  <p className="leading-loose text-[#3C3833]">
                    {CONTACT_INFO.address.split(',')[0]}<br />
                    {CONTACT_INFO.address.split(',')[1]}<br />
                    {CONTACT_INFO.email}
                  </p>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </div>
  );
};

export default App;
