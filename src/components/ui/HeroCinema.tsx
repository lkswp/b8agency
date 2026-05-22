"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, Variants, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface HeroCinemaProps {
  onEnterUniverse: () => void;
}

export default function HeroCinema({ onEnterUniverse }: HeroCinemaProps) {
  const shouldReduceMotion = useReducedMotion();

  // Motion values to track mouse coordinate positions for smooth physics glow
  const mouseX = useMotionValue(-200); // Start outside viewport
  const mouseY = useMotionValue(-200);

  // High-response spring configuration for maximum performance (no lag)
  const springConfig = { damping: 45, stiffness: 220, mass: 0.4 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    // Align center of the 600px light sphere to the mouse cursor
    mouseX.set(clientX - 300);
    mouseY.set(clientY - 300);
  }, [shouldReduceMotion, mouseX, mouseY]);

  const titleText = "CRIAMOS O AUDIOVISUAL QUE DOMINA O FEED.";

  // Orchestrated staggered entrance variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Time between children reveals
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 1, 0.5, 1],
        duration: 0.8,
      },
    },
  };

  const wordVariants: Variants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02, // Fast cascade letter by letter
      },
    },
  };

  const letterVariants: Variants = shouldReduceMotion ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 1, 0.5, 1] as const,
        duration: 0.6,
      },
    },
  };

  const subheadlineVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 1, 0.5, 1],
        duration: 0.8,
      },
    },
  };

  const buttonAreaVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 1, 0.5, 1],
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      className="relative h-screen w-screen bg-black flex flex-col justify-between items-center p-8 overflow-hidden select-none"
    >
      {/* Organic Light Source Layer */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_40%,transparent_75%)] pointer-events-none z-0 transform-gpu will-change-transform"
        />
      )}

      {/* Top Header Row */}
      <motion.div 
        variants={headerVariants}
        className="w-full flex justify-between items-center relative z-10 transform-gpu"
      >
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="B8 Logo"
            className="w-12 h-12 object-contain invert brightness-[1.8] contrast-[1.2] hover:scale-110 hover:rotate-[360deg] transition-all duration-700 ease-out transform-gpu"
          />
          <span className="font-title font-black text-xl text-white leading-none tracking-tight">// SOCIAL VIDEO STUDIO</span>
        </a>

        <div className="font-mono text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          [ REC ]
        </div>
      </motion.div>

      {/* Center Cinematic Headline */}
      <div className="max-w-5xl my-auto py-12 flex flex-col justify-center items-center gap-6 relative z-10 transform-gpu">
        <motion.h1
          variants={wordVariants}
          className="font-title font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.95] text-center select-none transform-gpu"
        >
          {shouldReduceMotion ? (
            titleText
          ) : (
            titleText.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
                {word.split("").map((letter, letterIdx) => (
                  <motion.span
                    key={letterIdx}
                    variants={letterVariants}
                    className="inline-block transform-gpu"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))
          )}
        </motion.h1>

        {/* Sub-headline/Descrição */}
        <motion.p
          variants={subheadlineVariants}
          className="text-zinc-400 text-sm sm:text-base md:text-lg font-medium max-w-2xl text-center leading-relaxed mt-2 select-none transform-gpu"
        >
          Direção de arte, edição cinética e retention extrema para redes sociais. Desenvolvemos Reels, TikToks, Stories e Vídeos Promocionais de alto impacto que transformam visualizações em faturamento.
        </motion.p>
      </div>

      {/* Bottom Button Row */}
      <motion.div 
        variants={buttonAreaVariants}
        className="relative z-10 flex flex-col items-center gap-4 transform-gpu w-full"
      >
        <div className="flex flex-col items-center gap-2">
          <MagneticButton onClick={onEnterUniverse}>
            DAR PLAY NO BRIEFING / FALAR COM O VIDEOMAKER
          </MagneticButton>
          <span className="font-mono text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em] mt-2 animate-pulse">
            Click to play
          </span>
        </div>

        {/* Subtle Footer inside Hero */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[9px] text-zinc-600 font-mono tracking-[0.2em] mt-10 border-t border-zinc-900/30 pt-4 gap-2 sm:gap-0">
          <span>&copy; {new Date().getFullYear()} B8 STUDIO // ALL RIGHTS RESERVED</span>
          <a
            href="https://instagram.com/b8agencia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 flex items-center gap-1.5 font-bold"
          >
            INSTAGRAM @B8AGENCIA <span className="text-[7px]">↗</span>
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
