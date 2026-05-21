"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.25, 1, 0.5, 1] as const,
        duration: 0.8,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B] pt-24">
      {/* Dynamic Floating Ambient Glow Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[10%] w-[380px] h-[380px] rounded-full bg-cyan-500/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[15%] right-[10%] w-[480px] h-[480px] rounded-full bg-violet-600/10 blur-[130px]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Subtle Tagline */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-[#121214]/50 backdrop-blur-md text-xs font-semibold tracking-wider text-[#00F2FE] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            Marketing Digital & Audiovisual
          </motion.div>

          {/* Epic Main Headline with Text Reveal */}
          <motion.h1
            variants={itemVariants}
            className="font-title font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl"
          >
            B8: Transformamos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#8B5CF6] animate-gradient-shift">
              Atenção
            </span>{" "}
            em Faturamento Absoluto
          </motion.h1>

          {/* Subheadline description */}
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed mt-2"
          >
            Unimos tráfego pago de alta performance, produções cinematográficas inovadoras e posicionamento estratégico de luxo para escalar marcas no mercado digital de elite.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
          >
            {/* Shimmer Shilling button */}
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.25, 1, 0.5, 1] as const, duration: 0.3 }}
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 overflow-hidden rounded-full font-bold uppercase tracking-wider text-xs text-[#0A0A0B] bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] transition-colors focus:outline-none shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25"
            >
              {/* Sliding Shimmer effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animationDuration: "1.5s" }} />
              Conhecer Soluções
            </motion.a>

            {/* Glassmorphic border CTA */}
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.25, 1, 0.5, 1] as const, duration: 0.3 }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full border border-zinc-800 bg-[#121214]/40 hover:bg-[#121214]/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-zinc-700"
            >
              Ver Cases de Sucesso
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          Scroll
        </span>
        <div className="w-[18px] h-[30px] rounded-full border border-zinc-700 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-zinc-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
