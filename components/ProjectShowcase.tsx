
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

interface ProjectShowcaseProps {
  onBack: () => void;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onBack }) => {
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
          Close Showcase
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <motion.header 
          className="mb-32 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6">Archive of Essence</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tighter leading-none mb-8">
            삶의 기초를 세우는<br/>기록들
          </h1>
          <div className="w-12 h-[1px] bg-[#3C3833]/20 mx-auto" />
        </motion.header>

        <div className="space-y-40 md:space-y-64">
          {PROJECTS.map((project, index) => (
            <motion.section 
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="w-full md:w-[60%] overflow-hidden rounded-[32px] md:rounded-[48px] aspect-[4/5] md:aspect-[16/10] bg-white shadow-2xl">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              <div className="w-full md:w-[40%] px-4">
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-40 mb-4">{project.subTitle}</p>
                <h2 className="font-serif text-4xl md:text-6xl tracking-tighter mb-8 leading-tight">{project.title}</h2>
                <p className="text-[#3C3833]/70 leading-relaxed md:text-lg mb-12 font-light">
                  {project.description}
                </p>
                
                <div className="space-y-4 border-t border-[#3C3833]/10 pt-8">
                  {project.details.map((detail, dIdx) => (
                    <p key={dIdx} className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-60">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <footer className="mt-64 text-center pb-32">
          <p className="font-serif text-3xl md:text-5xl opacity-40 italic mb-12">Building more foundations...</p>
          <button 
            onClick={onBack}
            className="px-12 py-5 bg-[#3C3833] text-[#F5F2EE] rounded-full uppercase tracking-[0.3em] text-[10px] font-bold"
          >
            Back to Home
          </button>
        </footer>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
