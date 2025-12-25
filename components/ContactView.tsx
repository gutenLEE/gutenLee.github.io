
import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../constants';

interface ContactViewProps {
  onBack: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#F5F2EE] overflow-y-auto"
    >
      <nav className="sticky top-0 left-0 w-full p-6 md:p-12 z-[70] flex justify-between items-center bg-[#F5F2EE]/80 backdrop-blur-md">
        <span className="font-serif text-2xl md:text-3xl tracking-tighter text-[#3C3833]">zvan</span>
        <button
          onClick={onBack}
          className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          <span className="w-10 h-[1px] bg-[#3C3833] origin-right transition-transform group-hover:scale-x-150" />
          Close Contact
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.header
          className="mb-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6">Visit our Space</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tighter leading-none mb-8">
            Contact Us
          </h1>
          <div className="w-12 h-[1px] bg-[#3C3833]/20 mx-auto" />
        </motion.header>

        {/* Map Section */}
        <motion.div
          className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-white mb-20"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <iframe
            src={CONTACT_INFO.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, opacity: 0.8 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Directions & Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-10 opacity-40 font-bold">Directions</h3>
            <div className="space-y-12">
              {CONTACT_INFO.directions.map((dir, idx) => (
                <div key={idx} className="group">
                  <p className="font-serif text-xl md:text-2xl mb-4 group-hover:italic transition-all">
                    {dir.label}
                  </p>
                  <p className="text-[#3C3833]/70 font-light leading-relaxed text-sm md:text-base">
                    {dir.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col justify-start"
          >
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-10 opacity-40 font-bold">Information</h3>
            <div className="space-y-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-50">Address</p>
                <p className="font-serif text-2xl md:text-3xl leading-snug">{CONTACT_INFO.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-50">Contact</p>
                <p className="text-xl md:text-2xl font-light">{CONTACT_INFO.phone}</p>
                <p className="text-xl md:text-2xl font-light">{CONTACT_INFO.email}</p>
              </div>
              <div className="pt-10">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-6 opacity-50">Studio Hours</p>
                <p className="text-sm tracking-[0.1em] opacity-80">MON — FRI: 10:00 - 18:00</p>
                <p className="text-sm tracking-[0.1em] opacity-80">SAT — SUN: BY APPOINTMENT</p>
              </div>
            </div>
          </motion.div>
        </div>

        <footer className="mt-40 text-center pb-20 border-t border-[#3C3833]/5 pt-20">
          <p className="font-serif text-xl md:text-2xl opacity-40 italic mb-8">We look forward to meeting you.</p>
          <button
            onClick={onBack}
            className="px-10 py-4 bg-[#3C3833] text-[#F5F2EE] rounded-full uppercase tracking-[0.3em] text-[10px] font-bold transition-transform hover:scale-105"
          >
            Back to Home
          </button>
        </footer>
      </div>
    </motion.div>
  );
};

export default ContactView;
