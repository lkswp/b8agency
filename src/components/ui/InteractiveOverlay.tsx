"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import BriefingOverlayForm from "./BriefingOverlayForm";
import InstagramFeed from "./InstagramFeed";

interface InteractiveOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const cases = [
  {
    num: "01",
    title: "VISTA ALTA",
    type: "MARKETING IMOBILIÁRIO DE LUXO",
    views: "ROI 8.5x",
  },
  {
    num: "02",
    title: "VELO FINTECH",
    type: "REBRANDING & DIRETRIZES 3D",
    views: "+5M Views",
  },
  {
    num: "03",
    title: "AUDIOVISUAL REEL",
    type: "DIREÇÃO DE ARTE & RETENÇÃO",
    views: "+15M Views",
  },
];

export default function InteractiveOverlay({ isOpen, onClose }: InteractiveOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  const overlayVariants: Variants = {
    hidden: { 
      y: shouldReduceMotion ? 0 : "100%", 
      opacity: shouldReduceMotion ? 0 : 1 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1] as const, // Custom ultra-smooth easeOutExpo
        duration: shouldReduceMotion ? 0.35 : 0.85,
        staggerChildren: shouldReduceMotion ? 0.04 : 0.08,
        delayChildren: shouldReduceMotion ? 0.05 : 0.15,
      },
    },
    exit: {
      y: shouldReduceMotion ? 0 : "100%",
      opacity: shouldReduceMotion ? 0 : 1,
      transition: {
        ease: [0.7, 0, 0.84, 0] as const, // easeInExpo for snappy exit
        duration: shouldReduceMotion ? 0.25 : 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      y: shouldReduceMotion ? 0 : 40, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1] as const,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="exit"
      className="fixed inset-0 h-screen w-screen bg-[#050506] z-50 overflow-y-auto px-6 py-8 md:p-12 lg:p-16 flex flex-col justify-between transform-gpu will-change-transform"
    >
      {/* Top Bar inside Overlay */}
      <div className="flex justify-between items-center w-full transform-gpu">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="B8 Logo"
            className="w-10 h-10 object-contain invert brightness-[1.8] contrast-[1.2]"
          />
          <span className="font-title font-black text-xl text-white">// STUDIO</span>
        </div>
        
        {/* Discret close button */}
        <motion.button
          onClick={onClose}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="flex items-center gap-2 text-zinc-400 hover:text-white cursor-pointer transition-colors p-2 rounded-full border border-zinc-900 hover:border-zinc-800 transform-gpu"
          aria-label="Fechar painel"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Fechar</span>
          <X size={16} />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 my-auto py-12 items-center transform-gpu">
        {/* Showreel & Cases (Left Column) */}
        <div className="lg:col-span-5 flex flex-col gap-8 transform-gpu">
          <motion.div variants={itemVariants} className="flex flex-col gap-2 transform-gpu">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FE]">
              Portfólio Selecionado
            </span>
            <h2 className="font-title font-black text-2xl md:text-3xl text-white tracking-tight">
              VAMOS ELEVAR O NÍVEL DO SEU CONTEÚDO.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-5 transform-gpu">
            {cases.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group flex justify-between items-center py-4 border-b border-zinc-900 hover:border-[#00F2FE]/50 transition-colors duration-300 cursor-pointer transform-gpu"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-600 font-bold font-mono">{project.num}</span>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-white tracking-wider group-hover:text-[#00F2FE] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-medium">
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 px-2 py-0.5 rounded border border-zinc-900 bg-zinc-950">
                    {project.views}
                  </span>
                  <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-[#00F2FE] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Links (Right Column) */}
        <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8 transform-gpu">
          <motion.div variants={itemVariants} className="w-full flex flex-col gap-4 transform-gpu">
            <BriefingOverlayForm />
            <div className="text-center mt-2">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mr-2">E-mail Corporativo:</span>
              <a href="mailto:contato@b8audiovisual.com.br" className="text-xs font-bold text-zinc-400 hover:text-[#00F2FE] transition-colors tracking-wide">
                contato@b8audiovisual.com.br
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Instagram Feed Integration */}
      <motion.div variants={itemVariants} className="w-full transform-gpu">
        <InstagramFeed />
      </motion.div>

      {/* Footer Info inside Overlay */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-medium font-mono w-full border-t border-zinc-950 pt-6 transform-gpu">
        <p>&copy; {new Date().getFullYear()} B8 STUDIO SP // TODOS OS DIREITOS RESERVADOS.</p>
        <p>CONSTRUINDO POSICIONAMENTOS DE ELITE DESDE 2020.</p>
      </div>
    </motion.div>
  );
}
